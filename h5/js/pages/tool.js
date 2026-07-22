(function () {
  var _inited = false;
  var loadingTimer = null;
  var fallbackTimer = null;

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

  function resetDots() {
    var dots = el.querySelectorAll('.tool-load-dots .dot');
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.remove('sct');
    }
  }

  function load() {
    stopLoading();
    var dots = el.querySelectorAll('.tool-load-dots .dot');
    if (!dots.length) return;
    resetDots();
    var current = 0;
    dots[0].classList.add('sct');
    loadingTimer = setInterval(function () {
      for (var j = 0; j < dots.length; j++) {
        dots[j].classList.remove('sct');
      }
      current++;
      if (current > 3) current = 0;
      dots[current].classList.add('sct');
    }, 400);
  }

  function stopLoading() {
    if (loadingTimer) {
      clearInterval(loadingTimer);
      loadingTimer = null;
    }
    if (fallbackTimer) {
      clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }
  }

  function imgload() {
    state.imgload = false;
    state.imgnoload = true;
    stopLoading();
    updateVisibility();
  }

  function checkAndStartLoading() {
    var bgImg = el.querySelector('.main-bg');
    if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
      imgload();
      return;
    }
    state.imgload = true;
    state.imgnoload = false;
    updateVisibility();
    load();
    if (bgImg && !bgImg.complete) {
      fallbackTimer = setTimeout(imgload, 3000);
    }
  }

  var page = {
    init: function () {
      if (_inited) return;
      _inited = true;

      el = document.getElementById('page-tool');

      state.indexhidden = false;

      var bgImg = el.querySelector('.main-bg');
      bgImg.addEventListener('load', function () {
        imgload();
      });

      checkAndStartLoading();

      el.querySelector('[data-action="goto1"]').addEventListener('click', function () {
        App.navigate('/datetime');
      });
      el.querySelector('[data-action="goto2"]').addEventListener('click', function () {
        App.navigate('/random');
      });
    },

    show: function () {
      state.indexhidden = false;
      if (state.imgnoload) {
        updateVisibility();
        return;
      }
      checkAndStartLoading();
    },

    hide: function () {
      stopLoading();
    }
  };

  App.registerPage('tool', page);
})();
