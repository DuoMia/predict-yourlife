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
  var errorShown = false;

  function removeLoadingEl() {
    if (loadingEl && loadingEl.parentNode) {
      loadingEl.parentNode.removeChild(loadingEl);
    }
    loadingEl = null;
  }

  function doHideLoading() {
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
    errorShown = false;
    if (signImage) {
      signImage.style.display = 'block';
    }
    if (loadingEl && loadingEl.parentNode) {
      loadingEl.style.opacity = '0';
      loadingEl.style.transition = 'opacity 0.25s';
      setTimeout(removeLoadingEl, 280);
    }
  }

  function hideLoadingWhenReady() {
    if (!signImage) {
      doHideLoading();
      return;
    }
    signImage.style.display = 'block';
    if (signImage.decode) {
      var decoded = false;
      var fallback = setTimeout(function () {
        if (!decoded) {
          decoded = true;
          doHideLoading();
        }
      }, 1500);
      try {
        signImage.decode().then(function () {
          if (!decoded) {
            decoded = true;
            clearTimeout(fallback);
            doHideLoading();
          }
        }).catch(function () {
          if (!decoded) {
            decoded = true;
            clearTimeout(fallback);
            doHideLoading();
          }
        });
      } catch (e) {
        clearTimeout(fallback);
        setTimeout(doHideLoading, 300);
      }
    } else {
      setTimeout(function () {
        requestAnimationFrame(function () {
          requestAnimationFrame(doHideLoading);
        });
      }, 300);
    }
  }

  function showErrorTip() {
    if (errorShown) return;
    errorShown = true;
    if (!loadingEl) return;
    loadingEl.innerHTML = '<div style="text-align:center;color:#999;font-size:14px;line-height:2">图片加载较慢<br>请稍候或检查网络...</div>';
  }

  function onImageLoad() {
    hideLoadingWhenReady();
  }

  function onImageError() {
    var sign = currentSign;
    if (sign && !retriedSigns[sign]) {
      retriedSigns[sign] = true;
      var imgSrc = 'images/signs/sign' + sign + '.webp?v=20260727f';
      setTimeout(function () {
        if (signImage && currentSign === sign) {
          signImage.src = imgSrc;
        }
      }, 800);
      return;
    }
    if (loadingEl) {
      loadingEl.innerHTML = '<div style="text-align:center;color:#c00;font-size:14px;line-height:2">图片加载失败<br><span style="color:#09bb07;cursor:pointer" onclick="location.reload()">点击刷新重试</span></div>';
    }
  }

  function showLoading() {
    hidden = false;
    errorShown = false;
    removeLoadingEl();
    loadingEl = document.createElement('div');
    loadingEl.className = 'answer-loading';
    loadingEl.innerHTML = '<div class="loading-spinner"></div>';
    loadingEl.style.opacity = '1';
    loadingEl.style.transition = '';
    if (pageEl) {
      pageEl.appendChild(loadingEl);
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

      var sign = params && params.sign;
      if (!sign) return;

      if (scrollEl) {
        scrollEl.scrollTop = 0;
      }

      var imgSrc = 'images/signs/sign' + sign + '.webp?v=20260727f';
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

      if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
      if (loadTimer) { clearTimeout(loadTimer); loadTimer = null; }

      signImage.style.display = 'none';

      showLoading();

      signImage.onload = onImageLoad;
      signImage.onerror = onImageError;

      loadTimer = setTimeout(showErrorTip, 15000);

      if (!isSameSign) {
        signImage.src = imgSrc;
      } else {
        if (signImage.complete && signImage.naturalWidth > 0) {
          hideLoadingWhenReady();
        } else {
          signImage.src = imgSrc;
        }
      }
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
      errorShown = false;
      if (signImage) {
        signImage.onload = null;
        signImage.onerror = null;
      }
    }
  };

  App.registerPage('lottery-answer', module);
})();
