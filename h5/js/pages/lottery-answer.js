(function () {
  var pageEl = null;
  var signImage = null;
  var scrollEl = null;
  var loadingEl = null;

  var module = {
    init: function () {
      pageEl = document.getElementById('page-lottery-answer');
      scrollEl = pageEl.querySelector('.answer-scroll');
      signImage = pageEl.querySelector('[data-role="sign-image"]');
    },
    show: function (params) {
      var sign = params.sign;
      if (!sign) return;

      // 不修改body样式！使用页面内部的绝对定位滚动容器滚动
      // .answer-scroll 是 position:absolute;top:0;left:0;right:0;bottom:0;overflow-y:auto
      // 它在 .page (position:absolute;height:100%) 内占满全部空间，overflow-y:auto 提供滚动
      if (scrollEl) {
        scrollEl.scrollTop = 0;
      }

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
      if (scrollEl) {
        scrollEl.scrollTop = 0;
      }
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