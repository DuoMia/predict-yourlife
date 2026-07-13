(function () {
  var routes = {
    '': 'index',
    '/': 'index',
    '/info': 'info',
    '/mine': 'mine',
    '/tool': 'tool',
    '/lottery': 'lottery',
    '/lottery-answer': 'lottery-answer',
    '/datetime': 'datetime',
    '/random': 'random',
    '/calculator': 'calculator'
  };

  var pages = {};
  var currentPage = null;

  function parseHash() {
    var hash = window.location.hash.replace('#', '');
    var parts = hash.split('?');
    var path = parts[0] || '';
    var params = {};
    if (parts[1]) {
      var pairs = parts[1].split('&');
      for (var i = 0; i < pairs.length; i++) {
        var kv = pairs[i].split('=');
        if (kv.length === 2) {
          params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
        }
      }
    }
    return { path: path, params: params };
  }

  function hideLoading() {
    var el = document.getElementById('loading-screen');
    if (el) {
      el.style.display = 'none';
    }
  }

  // 使用 visualViewport 获取真正的可见区域高度（不含地址栏/工具栏）
  function setViewportHeight() {
    var h = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
    document.documentElement.style.setProperty('--vh', (h * 0.01) + 'px');
  }

  function getPageEl(name) {
    return document.getElementById('page-' + name);
  }

  function switchPage(name, params) {
    if (currentPage && pages[currentPage]) {
      var oldPage = pages[currentPage];
      if (typeof oldPage.hide === 'function') {
        oldPage.hide();
      }
      var oldEl = getPageEl(currentPage);
      if (oldEl) {
        oldEl.classList.remove('active');
      }
    }

    var page = pages[name];
    if (!page) {
      console.warn('Page not found: ' + name);
      return;
    }

    var el = getPageEl(name);
    if (!el) {
      console.warn('Page element not found: page-' + name);
      return;
    }

    if (typeof page.init === 'function') {
      page.init(params);
    }

    el.classList.add('active');

    if (typeof page.show === 'function') {
      page.show(params);
    }

    currentPage = name;
  }

  function onHashChange() {
    var parsed = parseHash();
    var name = routes[parsed.path];
    if (!name) {
      name = 'index';
    }
    switchPage(name, parsed.params);
  }

  var App = {
    registerPage: function (name, pageModule) {
      pages[name] = pageModule;
    },

    navigate: function (route, params) {
      var hash = '#' + route;
      if (params) {
        var pairs = [];
        for (var key in params) {
          if (params.hasOwnProperty(key)) {
            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
          }
        }
        if (pairs.length > 0) {
          hash += '?' + pairs.join('&');
        }
      }
      window.location.hash = hash;
    },

    getParams: function () {
      return parseHash().params;
    },

    init: function () {
      Storage.init();
      setViewportHeight();
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', setViewportHeight);
      }
      window.addEventListener('resize', setViewportHeight);
      window.addEventListener('orientationchange', function () {
        setTimeout(setViewportHeight, 300);
      });
      window.addEventListener('hashchange', onHashChange, false);
      onHashChange();
      hideLoading();
    }
  };

  window.App = App;

  document.addEventListener('DOMContentLoaded', function () {
    App.init();
  });
})();
