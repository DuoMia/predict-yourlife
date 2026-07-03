(function () {
  var _inited = false;

  var page = {
    init: function () {
      if (_inited) return;
      _inited = true;

      var el = document.getElementById('page-mine');

      el.querySelector('[data-action="contact"]').addEventListener('click', function () {
        alert('客服功能暂未开放');
      });

      el.querySelector('[data-action="feedback"]').addEventListener('click', function () {
        alert('反馈功能暂未开放');
      });
    },

    show: function () {},

    hide: function () {}
  };

  App.registerPage('mine', page);
})();
