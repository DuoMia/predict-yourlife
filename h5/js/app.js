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
  var toastTimer = null;
  var savedHeight = 0;
  var homeObserver = null;

  function setViewportHeight(force) {
    var height = window.innerHeight;
    if (window.visualViewport && window.visualViewport.height) {
      height = window.visualViewport.height;
    }
    if (height < 100) return;
    if (savedHeight > 0 && !force) {
      if (height < savedHeight - 100) return;
    }
    savedHeight = height;
    document.documentElement.style.height = height + 'px';
    document.body.style.height = height + 'px';
  }

  function showToast(msg) {
    var toastEl = document.getElementById('app-toast');
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.id = 'app-toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 2000);
  }

  function createHomeButton() {
    var btn = document.createElement('div');
    btn.className = 'app-home-btn';
    btn.innerHTML = '首页';
    btn.addEventListener('click', function () {
      var activePage = document.querySelector('.page.active');
      if (activePage && activePage.classList.contains('predicting')) {
        App.toast('预测进行中，请稍候...');
        return;
      }
      App.navigate('/');
    });
    document.body.appendChild(btn);
  }

  function updateHomeButton() {
    var btn = document.querySelector('.app-home-btn');
    if (!btn) return;
    if (currentPage === 'index') {
      btn.style.display = 'none';
    } else {
      btn.style.display = 'block';
      var activePage = document.querySelector('.page.active');
      if (activePage && activePage.classList.contains('predicting')) {
        btn.classList.add('disabled');
      } else {
        btn.classList.remove('disabled');
      }
    }
  }

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

  function getPageEl(name) {
    return document.getElementById('page-' + name);
  }

  function switchPage(name, params) {
    if (homeObserver) {
      homeObserver.disconnect();
      homeObserver = null;
    }

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

    homeObserver = new MutationObserver(function () {
      updateHomeButton();
    });
    homeObserver.observe(el, { attributes: true, attributeFilter: ['class'] });

    if (typeof page.show === 'function') {
      page.show(params);
    }

    currentPage = name;
    window.scrollTo(0, 0);
    updateHomeButton();
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

    toast: showToast,

    init: function () {
      Storage.init();

      setViewportHeight(true);
      window.addEventListener('resize', function () { setViewportHeight(false); }, false);
      window.addEventListener('orientationchange', function () {
        savedHeight = 0;
        setTimeout(function () { setViewportHeight(true); }, 300);
      }, false);
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', function () { setViewportHeight(false); }, false);
      }
      window.addEventListener('load', function () {
        setTimeout(function () { setViewportHeight(true); }, 100);
      });
      setTimeout(function () { setViewportHeight(true); }, 300);

      createHomeButton();

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
