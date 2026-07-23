(function () {
  var pageEl = null;
  var signImage = null;
  var scrollEl = null;
  var loadingEl = null;
  var loadTimer = null;

  function showImage() {
    if (loadTimer) {
      clearTimeout(loadTimer);
      loadTimer = null;
    }
    if (loadingEl && loadingEl.parentNode) {
      loadingEl.parentNode.removeChild(loadingEl);
      loadingEl = null;
    }
    if (signImage) {
      signImage.style.display = 'block';
    }
  }

  var module = {
    init: function () {
      pageEl = document.getElementById('page-lottery-answer');
      if (!pageEl) return;
      scrollEl = pageEl.querySelector('.answer-scroll');
      signImage = pageEl.querySelector('[data-role="sign-image"]');
    },
    show: function (params) {
      if (!pageEl || !signImage) {
        if (typeof this.init === 'function') this.init();
      }
      if (!pageEl || !signImage) return;

      var sign = params.sign;
      if (!sign) return;

      if (scrollEl) {
        scrollEl.scrollTop = 0;
      }

      if (loadingEl && loadingEl.parentNode) {
        loadingEl.parentNode.removeChild(loadingEl);
      }
      loadingEl = document.createElement('div');
      loadingEl.className = 'answer-loading';
      loadingEl.innerHTML = '<div class="loading-spinner"></div>';
      pageEl.appendChild(loadingEl);

      signImage.onload = null;
      signImage.onerror = null;
      signImage.style.display = 'none';
      signImage.style.width = '100%';
      signImage.style.height = 'auto';

      signImage.onload = showImage;
      signImage.onerror = showImage;
      signImage.src = 'images/签文/签' + sign + '.webp?t=' + Date.now();

      if (signImage.complete && signImage.naturalWidth > 0) {
        showImage();
      } else {
        loadTimer = setTimeout(showImage, 10000);
      }
    },
    hide: function () {
      if (loadTimer) {
        clearTimeout(loadTimer);
        loadTimer = null;
      }
      if (scrollEl) {
        scrollEl.scrollTop = 0;
      }
      if (loadingEl && loadingEl.parentNode) {
        loadingEl.parentNode.removeChild(loadingEl);
        loadingEl = null;
      }
      if (signImage) {
        signImage.style.display = 'none';
        signImage.onload = null;
        signImage.onerror = null;
        signImage.src = '';
      }
    }
  };

  App.registerPage('lottery-answer', module);
})();
