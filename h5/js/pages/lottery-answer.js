(function () {
  var pageEl = null;
  var signImage = null;
  var scrollEl = null;
  var loadingEl = null;
  var loadTimer = null;
  var currentSign = null;
  var retriedSigns = {};

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

  function showLoading() {
    if (loadingEl && loadingEl.parentNode) {
      loadingEl.parentNode.removeChild(loadingEl);
    }
    loadingEl = document.createElement('div');
    loadingEl.className = 'answer-loading';
    loadingEl.innerHTML = '<div class="loading-spinner"></div>';
    if (pageEl) {
      pageEl.appendChild(loadingEl);
    }
  }

  function onImageError() {
    var sign = currentSign;
    if (sign && !retriedSigns[sign]) {
      retriedSigns[sign] = true;
      var imgSrc = 'images/签文/签' + sign + '.webp';
      setTimeout(function () {
        if (signImage) {
          signImage.src = imgSrc;
        }
      }, 500);
      return;
    }
    showImage();
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

      var sign = params && params.sign;
      if (!sign) return;

      if (scrollEl) {
        scrollEl.scrollTop = 0;
      }

      var imgSrc = 'images/签文/签' + sign + '.webp';
      var isSameSign = (currentSign === sign);

      currentSign = sign;

      if (isSameSign && signImage.complete && signImage.naturalWidth > 0) {
        signImage.style.display = 'block';
        if (loadingEl && loadingEl.parentNode) {
          loadingEl.parentNode.removeChild(loadingEl);
          loadingEl = null;
        }
        return;
      }

      signImage.onload = null;
      signImage.onerror = null;

      signImage.style.display = 'none';

      showLoading();

      signImage.onload = showImage;
      signImage.onerror = onImageError;

      if (!isSameSign) {
        signImage.src = imgSrc;
      } else {
        if (signImage.complete && signImage.naturalWidth > 0) {
          showImage();
        } else {
          signImage.src = imgSrc;
        }
      }

      loadTimer = setTimeout(showImage, 15000);
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
        signImage.onload = null;
        signImage.onerror = null;
      }
    }
  };

  App.registerPage('lottery-answer', module);
})();
