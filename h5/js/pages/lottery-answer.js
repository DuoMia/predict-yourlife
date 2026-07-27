(function () {
  var pageEl = null;
  var signImage = null;
  var scrollEl = null;
  var loadingEl = null;
  var loadTimer = null;
  var hideTimer = null;
  var currentSign = null;
  var retriedSigns = {};
  var hidden = false;

  function removeLoadingEl() {
    if (loadingEl && loadingEl.parentNode) {
      loadingEl.parentNode.removeChild(loadingEl);
    }
    loadingEl = null;
  }

  function hideLoading() {
    if (hidden) return;
    hidden = true;
    if (loadTimer) {
      clearTimeout(loadTimer);
      loadTimer = null;
    }
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
    if (signImage) {
      signImage.style.display = 'block';
    }
    if (loadingEl && loadingEl.parentNode) {
      loadingEl.style.opacity = '0';
      loadingEl.style.transition = 'opacity 0.2s';
      setTimeout(removeLoadingEl, 250);
    }
  }

  function scheduleHideLoading() {
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      requestAnimationFrame(function () {
        requestAnimationFrame(hideLoading);
      });
    }, 200);
  }

  function showImage() {
    if (!signImage) return;
    signImage.style.display = 'block';
    scheduleHideLoading();
  }

  function forceShowImage() {
    if (signImage) {
      signImage.style.display = 'block';
    }
    scheduleHideLoading();
  }

  function showLoading() {
    hidden = false;
    if (loadingEl && loadingEl.parentNode) {
      loadingEl.parentNode.removeChild(loadingEl);
    }
    loadingEl = document.createElement('div');
    loadingEl.className = 'answer-loading';
    loadingEl.innerHTML = '<div class="loading-spinner"></div>';
    loadingEl.style.opacity = '1';
    loadingEl.style.transition = '';
    if (pageEl) {
      pageEl.appendChild(loadingEl);
    }
  }

  function onImageError() {
    var sign = currentSign;
    if (sign && !retriedSigns[sign]) {
      retriedSigns[sign] = true;
      var imgSrc = 'images/签文/签' + sign + '.webp?v=20260727d';
      setTimeout(function () {
        if (signImage) {
          signImage.src = imgSrc;
        }
      }, 500);
      return;
    }
    forceShowImage();
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

      var imgSrc = 'images/签文/签' + sign + '.webp?v=20260727d';
      var isSameSign = (currentSign === sign);

      currentSign = sign;

      if (isSameSign && signImage.complete && signImage.naturalWidth > 0) {
        signImage.style.display = 'block';
        removeLoadingEl();
        hidden = true;
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

      loadTimer = setTimeout(forceShowImage, 20000);
    },
    hide: function () {
      if (loadTimer) {
        clearTimeout(loadTimer);
        loadTimer = null;
      }
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      if (scrollEl) {
        scrollEl.scrollTop = 0;
      }
      removeLoadingEl();
      hidden = false;
      if (signImage) {
        signImage.onload = null;
        signImage.onerror = null;
      }
    }
  };

  App.registerPage('lottery-answer', module);
})();
