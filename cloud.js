/* WorkBuddy Cloud Service 客户端封装（静态站点，CDN 方式）
 * 配置值全部来自 workbuddy_cloud_service 返回的 publicConfig（2026-11-20 重新开通后取得）。
 *
 * ⚠️ 这四个值不要手改、不要从别的应用复制：
 *    之前这文件里的 endpoint 指向的是**另一个应用**的域名（wbapp-8q9z…），
 *    所以点登录必然 Failed to fetch —— 那扇门从来不是这个应用的。
 *    endpoint 必须等于本应用自己的 share 域名，否则服务端 Origin 校验直接拒绝。
 *
 *    resourceId        wbcs_hUWuc3jV8RtqeFAUUsbYgj
 *    endpoint          https://jp-reading.app.workbuddy.host   ← 与本应用域名一致
 *    oauthRelayBaseUrl https://www.workbuddy.cn/v2/as/genie-baas/oauth
 *    publishableKey    wbpk_KSU673kUbtUC1nbefLTgSq_…（仅标识应用，本身无权限）
 *
 * 重新发布时必须复用同一个 applicationId（wbapp_KSU673kUbtUC1nbefLTgSq），
 * 换新应用会换域名 → Origin 不匹配 → 登录失效，而且是静默失败。
 */
window.JPCloudConfig = {
  endpoint: 'https://jp-reading.app.workbuddy.host',
  oauthRelayBaseUrl: 'https://www.workbuddy.cn/v2/as/genie-baas/oauth',
  publishableKey: 'wbpk_KSU673kUbtUC1nbefLTgSq_87pJZ999YID1rqTFB14OvTjbiNZe9PUt'
};
(function () {
  var listeners = [];
  var state = { ready: false, client: null, session: null, user: null, error: null };

  function notify() {
    listeners.forEach(function (fn) {
      try { fn(state); } catch (e) {}
    });
  }

  window.JPCloud = {
    get state() { return state; },
    onChange: function (fn) { listeners.push(fn); fn(state); },
    requirePage: function () { return location.pathname.split('/').pop() || 'index.html'; }
  };

  // 等 CDN SDK 就绪（脚本可能比本文件加载慢）
  var tries = 0;
  function boot() {
    if (!window.WorkBuddyCloud || typeof window.WorkBuddyCloud.createWorkBuddyCloud !== 'function') {
      if (tries++ > 60) {
        state.error = '云服务脚本未加载：vendor/workbuddy-cloud-sdk.js 或备用 CDN 都没取到，请检查网络后刷新。';
        notify();
        return;
      }
      return setTimeout(boot, 150);
    }
    try {
      state.client = window.WorkBuddyCloud.createWorkBuddyCloud({
        endpoint: window.JPCloudConfig.endpoint,
        oauthRelayBaseUrl: window.JPCloudConfig.oauthRelayBaseUrl,
        publishableKey: window.JPCloudConfig.publishableKey
      });
    } catch (e) {
      state.error = '云服务初始化失败：' + (e && e.message ? e.message : e);
      notify();
      return;
    }
    restore();
  }

  function clearAuthParams() {
    var url = new URL(location.href);
    if (!url.searchParams.has('code') && !url.searchParams.has('error') && !url.searchParams.has('provider')) return;
    ['code', 'state', 'provider', 'error', 'error_description'].forEach(function (k) {
      url.searchParams.delete(k);
    });
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  }

  async function restore() {
    var url = new URL(location.href);
    var hasCallback = url.searchParams.has('code') || url.searchParams.has('error');
    if (hasCallback) {
      var provider = url.searchParams.get('provider');
      var chain = [];
      if (provider === 'wechat') chain.push('handleWechatWebCallback');
      if (provider === 'workbuddy') chain.push('handleWorkBuddyCallback');
      chain.push('handleOAuthCallback', 'handleWechatWebCallback');
      var lastErr = null, ok = false;
      for (var ci = 0; ci < chain.length; ci++) {
        var fn = state.client.auth[chain[ci]];
        if (typeof fn !== 'function') continue;
        try {
          var res = await fn.call(state.client.auth);
          if (res && res.error) { lastErr = res.error; continue; }
          if (res && res.data) { state.session = res.data; state.user = res.data.user || null; }
          ok = true;
          break;
        } catch (e) { lastErr = e; }
      }
      if (!ok && lastErr) state.error = '登录回调处理失败：' + (lastErr.message || lastErr);
      clearAuthParams();
    }

    try {
      var got = await state.client.auth.getSession();
      if (got && got.data) { state.session = got.data; state.user = got.data.user || null; }
      else if (!state.session) { state.session = null; state.user = null; }
    } catch (e) { /* 未登录属于正常情况 */ }

    // 订阅登录状态变化（扫码回调、token 刷新、退出）
    try{
      if(typeof state.client.auth.onAuthStateChange === 'function'){
        state.client.auth.onAuthStateChange(function (evt) {
          var sess = evt && (evt.session || (evt.data && evt.data.session));
          var usr = evt && (evt.user || (evt.data && evt.data.user));
          if(sess){ state.session = sess; state.user = usr || sess.user || null; }
          else if(evt && /SIGNED_OUT/i.test(evt.event || evt.type || '')){ state.session = null; state.user = null; }
          notify();
        });
      }
    }catch(e){}

    state.ready = true;
    notify();

    // 从首页完成登录回调后，回到复习页
    if (state.session) {
      var back = sessionStorage.getItem('jp_login_return');
      if (back) {
        sessionStorage.removeItem('jp_login_return');
        if (!/review\.html/.test(location.pathname)) location.replace(back);
      }
    }
  }

  boot();
})();
