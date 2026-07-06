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

      // 允许 body 和页面滚动，签文图很长需要上下滑动
      document.body.style.overflow = 'auto';
      pageEl.style.overflowY = 'auto';
      pageEl.style.height = 'auto';
      pageEl.style.minHeight = '100vh';

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
      // 恢复 body 和页面样式
      document.body.style.overflow = 'hidden';
      pageEl.style.overflowY = '';
      pageEl.style.height = '';
      pageEl.style.minHeight = '';

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
