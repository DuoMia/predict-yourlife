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

      // 使用body原生滚动（移动端最可靠的滚动方式）
      // 让page脱离fixed定位，成为正常文档流元素，由body/viewport负责滚动
      document.body.style.overflowY = 'visible';
      document.body.style.height = 'auto';
      pageEl.style.position = 'relative';
      pageEl.style.top = '';
      pageEl.style.left = '';
      pageEl.style.width = '100%';
      pageEl.style.height = 'auto';
      pageEl.style.minHeight = '100vh';
      pageEl.style.minHeight = '100dvh';
      pageEl.style.overflow = 'visible';
      window.scrollTo(0, 0);

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
      // 恢复body和page样式
      document.body.style.overflowY = '';
      document.body.style.height = '';
      pageEl.style.position = '';
      pageEl.style.top = '';
      pageEl.style.height = '';
      pageEl.style.minHeight = '';
      pageEl.style.overflow = '';
      window.scrollTo(0, 0);

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