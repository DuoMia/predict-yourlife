(function () {
  var _inited = false;
  var loadingTimer = null;

  var state = {
    current: 0,
    imgload: true,
    imgnoload: false,
    indexhidden: true
  };

  var el = null;

  function updateVisibility() {
    var showEls = el.querySelectorAll('[data-show]');
    for (var i = 0; i < showEls.length; i++) {
      var elem = showEls[i];
      var key = elem.getAttribute('data-show');
      elem.style.display = state[key] ? 'none' : '';
    }
  }

  function load() {
    var dots = el.querySelectorAll('.tool-load-dots .dot');
    if (!dots.length) return;
    var current = 0;
    var n = 1;
    dots[0].style.background = '#09bb07';
    loadingTimer = setInterval(function () {
      if (n >= 10) {
        clearInterval(loadingTimer);
        loadingTimer = null;
        return;
      }
      for (var j = 0; j < dots.length; j++) {
        dots[j].style.background = '#ccc';
      }
      current++;
      if (current > 3) current = 0;
      dots[current].style.background = '#09bb07';
      n++;
    }, 400);
  }

  function imgload() {
    state.imgload = false;
    state.imgnoload = true;
    updateVisibility();
  }

  var page = {
    init: function () {
      if (_inited) return;
      _inited = true;

      el = document.getElementById('page-tool');

      state.indexhidden = false;
      updateVisibility();

      load();

      var bgImg = el.querySelector('.main-bg');
      bgImg.addEventListener('load', function () {
        imgload();
      });

      if (bgImg.complete && bgImg.naturalWidth > 0) {
        imgload();
      }

      el.querySelector('[data-action="goto1"]').addEventListener('click', function () {
        App.navigate('/datetime');
      });
      el.querySelector('[data-action="goto2"]').addEventListener('click', function () {
        App.navigate('/random');
      });
    },

    show: function () {},

    hide: function () {
      if (loadingTimer) {
        clearInterval(loadingTimer);
        loadingTimer = null;
      }
    }
  };

  App.registerPage('tool', page);
})();
