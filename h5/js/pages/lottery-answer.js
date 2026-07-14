(function () {
  var pageEl = null;
  var signImage = null;
  var scrollEl = null;
  var loadingEl = null;
  var backBtn = null;

  function showImage() {
    if (loadingEl && loadingEl.parentNode) {
      loadingEl.parentNode.removeChild(loadingEl);
      loadingEl = null;
    }
    signImage.style.display = 'block';
  }

  var module = {
    init: function () {
      pageEl = document.getElementById('page-lottery-answer');
      scrollEl = pageEl.querySelector('.answer-scroll');
      signImage = pageEl.querySelector('[data-role="sign-image"]');

      backBtn = document.createElement('div');
      backBtn.className = 'answer-back-btn';
      backBtn.innerHTML = '返回';
      backBtn.addEventListener('click', function () {
        history.back();
      });
      pageEl.appendChild(backBtn);
    },
    show: function (params) {
      var sign = params.sign;
      if (!sign) return;

      if (scrollEl) {
        scrollEl.scrollTop = 0;
      }

      loadingEl = document.createElement('div');
      loadingEl.className = 'answer-loading';
      loadingEl.innerHTML = '<div class="loading-spinner"></div>';
      pageEl.appendChild(loadingEl);

      signImage.style.display = 'none';
      signImage.style.width = '100%';
      signImage.style.height = 'auto';

      signImage.onload = showImage;
      signImage.onerror = showImage;
      signImage.src = 'images/签文/签' + sign + '.jpg?t=' + Date.now();

      if (signImage.complete && signImage.naturalWidth > 0) {
        showImage();
      }
    },
    hide: function () {
      if (scrollEl) {
        scrollEl.scrollTop = 0;
      }
      if (loadingEl && loadingEl.parentNode) {
        loadingEl.parentNode.removeChild(loadingEl);
        loadingEl = null;
      }
      signImage.style.display = 'none';
      signImage.src = '';
      signImage.onload = null;
      signImage.onerror = null;
    }
  };

  App.registerPage('lottery-answer', module);
})();
