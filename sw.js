/* Service Worker —— 离线可读 + 发版更新
 *
 * ⚠️ 发版流程（必读）：改完任何 html / css / js / 图标之后，必须把下面的 VERSION 加一
 * （v1 → v2 → …）。浏览器判定"有没有新版"看的是 sw.js 的字节，install 只会跑一次；
 * VERSION 不变 → 缓存名不变 → 老用户永远拿到旧文件。加一之后：install 重新预缓存，
 * activate 删掉旧缓存名的整份缓存。
 * **PRECACHE 里增删了任何文件也要一起 bump VERSION** —— 否则老客户端不会重新下载新增项。
 *
 * 缓存策略（对应 §4 离线边界）：
 *   HTML（导航 / *.html）        stale-while-revalidate：先给缓存秒开，后台 fetch 更新，
 *                                所以发版后用户"第二次打开"就是新版，同时断网也能读。
 *   静态资源 css / js / png …    cache-first：命中即返回，未命中才走网络并写回缓存。
 *   /.cloud/**                   network-only：云端登录与同步的数据一律不进缓存。
 *   跨域（jsDelivr CDN 等）        network-only：同上，且不能污染同源缓存。
 *   其它（manifest.webmanifest 等）不拦截，走浏览器默认 —— 保证清单永远是最新的。
 */

const VERSION = 'v29';
const CACHE = 'jp-read-' + VERSION;

/* 预缓存：13 个 HTML + 7 个 css/js + vendor 云 SDK + 3 个图标 = 24 项。
   vendor/workbuddy-cloud-sdk.js 一并预缓存：避免离线时 cloud.js 轮询 9 秒（60×150ms）
   才落到云端错误态，那 9 秒会让用户以为页面卡死。
   article-extras.js（注音三档 / 理解检测 / 动词活用表）必须在列 —— 漏了会 nav 成功但功能全空。 */
const PRECACHE = [
  './index.html',
  './article.html',
  './reading.html',
  './review.html',
  './tokens.css',
  './common.css',
  './layout.css',
  './content.js',
  './voice.js',
  './article.js',
  './article-extras.js',
  './cloud.js',
  './vendor/workbuddy-cloud-sdk.js',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
];

const ORIGIN = self.location.origin;
const INDEX_URL = new URL('./index.html', self.location.href).href;

/* ---------- 安装：一次性把 PRECACHE 全部写进缓存 ---------- */
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // addAll 是原子的：任何一项 404 / 网络失败都会让 install 失败（刻意不捕获，
    // 免得"装上了但缺文件"这种只在断网时才暴露的问题）
    await cache.addAll(PRECACHE);
    await self.skipWaiting();
  })());
});

/* ---------- 激活：删掉非当前版本的缓存，并立刻接管已打开的页面 ---------- */
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

/* ---------- 路由判定 ---------- */
function isBypass(url) {
  if (url.origin !== ORIGIN) return true;                        // 跨域：CDN / 云端 endpoint
  if (url.pathname.indexOf('/.cloud') === 0) return true;         // 云端 API：network-only
  return false;
}

const STATIC_RE = /\.(?:css|js|png|jpe?g|gif|svg|webp|woff2?)$/i;

/* 缓存键：HTML 一律去掉 query / hash，这样 review.html?set=a1 也能命中预缓存的 review.html
   （页面自己在运行时读 location.search，参数不需要进缓存键） */
function keyFor(request, isHtml) {
  const url = new URL(request.url);
  if (url.pathname === '/' || url.pathname.endsWith('/')) return INDEX_URL;
  if (isHtml) { url.search = ''; url.hash = ''; }
  return url.href;
}

/* ---------- HTML：stale-while-revalidate ---------- */
async function staleWhileRevalidate(event, key) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(key);

  const revalidate = fetch(event.request).then((res) => {
    if (res && res.ok) cache.put(key, res.clone());
    return res;
  }).catch(() => null);

  if (cached) {
    // 有缓存：立刻返回，同时把后台更新挂到 waitUntil 上，避免 SW 被提前终止
    event.waitUntil(revalidate);
    return cached;
  }

  const fresh = await revalidate;
  if (fresh) return fresh;

  // 断网且没有缓存（例如深链到未预缓存的页面）：退回首页，至少给用户入口
  const fallback = await cache.match(INDEX_URL);
  return fallback || Response.error();
}

/* ---------- 静态资源：cache-first ---------- */
async function cacheFirst(request, key) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(key);
  if (cached) return cached;
  try {
    const res = await fetch(request);
    if (res && res.ok) cache.put(key, res.clone());
    return res;
  } catch (e) {
    return Response.error();
  }
}

/* ---------- fetch ---------- */
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;                 // POST/PUT 等直接放行，不拦不缓存

  let url;
  try { url = new URL(request.url); } catch (e) { return; }
  if (isBypass(url)) return;                            // 云端与跨域：network-only

  const isHtml = request.mode === 'navigate' ||
                 (request.headers.get('accept') || '').indexOf('text/html') >= 0 ||
                 /\.html?$/i.test(url.pathname);

  if (isHtml) {
    event.respondWith(staleWhileRevalidate(event, keyFor(request, true)));
    return;
  }
  if (STATIC_RE.test(url.pathname)) {
    event.respondWith(cacheFirst(request, keyFor(request, false)));
  }
  // 其它（manifest.webmanifest 等）不 respondWith：交给浏览器默认的网络请求
});
