(function () {
  var pageEl = null;
  var signImage = null;
  var loadingEl = null;

  var module = {
    init: function () {
      pageEl = document.getElementById('page-lottery-answer');
      signImage = pageEl.querySelector('[data-role="sign-image"]');
    },
    show: function (params) {
      var sign = params.sign;
      if (!sign) return;

      // 确保解签页可滚动（JS 强制设置，覆盖 .page 的 overflow:hidden）
      pageEl.style.overflowY = 'auto';
      pageEl.style.webkitOverflowScrolling = 'touch';

      loadingEl = document.createElement('div');
      loadingEl.className = 'answer-loading';
      loadingEl.innerHTML = '<div class="answer-spinner"></div>';
      pageEl.appendChild(loadingEl);

      signImage.style.display = 'none';
      signImage.style.width = '100%';
      signImage.style.height = 'auto';
      signImage.src = 'images/签文/签' + sign + '.jpg';

      signImage.onload = function () {
        if (loadingEl && loadingEl.parentNode) {
          loadingEl.parentNode.removeChild(loadingEl);
          loadingEl = null;
        }
        signImage.style.display = 'block';
      };
    },
    hide: function () {
      pageEl.style.overflowY = '';
      pageEl.style.webkitOverflowScrolling = '';
      if (loadingEl && loadingEl.parentNode) {
        loadingEl.parentNode.removeChild(loadingEl);
        loadingEl = null;
      }
      signImage.style.display = 'none';
      signImage.src = '';
    }
  };

  App.registerPage('lottery-answer', module);
})();
