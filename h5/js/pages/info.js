(function () {
  var _inited = false;

  var state = {
    imgload: true,
    preimg: false,
    indexhidden: true
  };

  var el = null;

  function updateVisibility() {
    var showEls = el.querySelectorAll('[data-show]');
    for (var i = 0; i < showEls.length; i++) {
      var elem = showEls[i];
      var key = elem.getAttribute('data-show');
      elem.style.display = state[key] ? 'none' : '';
    }
  }

  function imgload() {
    state.preimg = true;
    state.imgload = false;
    updateVisibility();
  }

  var page = {
    init: function () {
      if (_inited) return;
      _inited = true;

      el = document.getElementById('page-info');

      state.indexhidden = false;
      updateVisibility();

      var infoImg = el.querySelector('.info-img');
      infoImg.addEventListener('load', function () {
        imgload();
      });

      if (infoImg.complete && infoImg.naturalWidth > 0) {
        imgload();
      }

      var gotoLottery = function () {
        App.navigate('/lottery');
      };

      infoImg.addEventListener('click', gotoLottery);

      var infoText = el.querySelector('.info-text');
      if (infoText) infoText.addEventListener('click', gotoLottery);
    },

    show: function () {},

    hide: function () {}
  };

  App.registerPage('info', page);
})();
