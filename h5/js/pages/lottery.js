(function () {
  var signList = [];
  for (var i = 1; i <= 100; i++) {
    signList.push(i);
  }

  var images = [
    'images/圣杯.png', 'images/圣杯.png', 'images/圣杯.png',
    'images/圣杯.png', 'images/圣杯.png', 'images/圣杯.png',
    'images/笑杯.png',
    'images/圣杯.png'
  ];

  var state = {
    signList: signList,
    sign: '',
    isShow: true,
    current: 0,
    imgload: true,
    imgnoload: false,
    title: '',
    btnhide: true,
    btnhide2: false,
    btnhide3: true,
    indexhidden: true,
    imghide: true,
    imghide2: false,
    imghide3: false,
    images: images,
    image1: '',
    image2: '',
    image3: '',
    count: 0,
    buttonhide: false,
    color: 'rgb(124, 11, 11)',
    texthide: true,
    texthide2: true,
    resopen: true
  };

  var timer = null;
  var loadingTimer = null;
  var pageEl = null;
  var _inited = false;

  function updateVisibility() {
    var showEls = pageEl.querySelectorAll('[data-show]');
    for (var i = 0; i < showEls.length; i++) {
      var el = showEls[i];
      var key = el.getAttribute('data-show');
      var val = state[key];
      el.style.display = val ? 'none' : '';
    }
  }

  function updateCupImages() {
    var cup1 = pageEl.querySelector('.cup1');
    var cup2 = pageEl.querySelector('.cup2');
    var cup3 = pageEl.querySelector('.cup3');
    if (cup1) cup1.src = state.image1;
    if (cup2) cup2.src = state.image2;
    if (cup3) cup3.src = state.image3;
  }

  function updateSignText() {
    var signEl = pageEl.querySelector('.sign-text');
    if (signEl) signEl.textContent = state.sign;
  }

  function updateResultText() {
    var textEl = pageEl.querySelector('.lottery-result-text');
    if (textEl) textEl.textContent = state.title;
  }

  function updateDrawButton() {
    var drawBtn = pageEl.querySelector('.lottery-btn-draw');
    if (drawBtn) {
      drawBtn.disabled = state.buttonhide;
      drawBtn.style.color = state.color;
      drawBtn.style.opacity = state.buttonhide ? '0.5' : '1';
    }
  }

  function updateAll() {
    updateVisibility();
    updateCupImages();
    updateSignText();
    updateResultText();
    updateDrawButton();
  }

  function isSameDay(dateStr, date2) {
    var d1 = new Date(dateStr);
    var d2 = new Date(date2);
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  }

  function load() {
    var dots = pageEl.querySelectorAll('.lottery-load-dots .dot');
    if (!dots.length) return;
    var current = 0;
    var n = 1;
    dots[0].classList.add('sct');
    loadingTimer = setInterval(function () {
      if (n >= 10) {
        clearInterval(loadingTimer);
        loadingTimer = null;
        return;
      }
      for (var j = 0; j < dots.length; j++) {
        dots[j].classList.remove('sct');
      }
      current++;
      if (current > 3) current = 0;
      dots[current].classList.add('sct');
      n++;
    }, 400);
  }

  var module = {
    init: function () {
      if (_inited) return;
      _inited = true;

      pageEl = document.getElementById('page-lottery');

      Storage.getUserInfo();

      state.indexhidden = false;
      state.imghide3 = false;

      updateAll();

      load();

      pageEl.addEventListener('click', function (e) {
        var target = e.target;
        while (target && target !== pageEl) {
          var action = target.getAttribute('data-action');
          if (action && typeof module[action] === 'function') {
            module[action](e);
            return;
          }
          target = target.parentElement;
        }
      });

      var gifImg = pageEl.querySelector('.lottery-drawing-img');
      if (gifImg) {
        gifImg.addEventListener('load', function () {
          module.imgload();
        });
        if (gifImg.complete && gifImg.naturalWidth > 0) {
          module.imgload();
        }
      }
    },

    show: function () {
      var userInfo = Storage.getUserInfo();
      var now = new Date();

      if (userInfo.datetime) {
        if (!isSameDay(userInfo.datetime, now)) {
          Storage.updateUserInfo({ status: 0, datetime: now.toString() });
          userInfo.status = 0;
        }
      }

      // 对齐原版 onLoad 的初始值设置
      state.isShow = true;
      state.btnhide = true;
      state.btnhide2 = false;
      state.btnhide3 = true;
      state.resopen = true;

      if (userInfo.status === 1) {
        // 当日已抽签：显示签面图，隐藏抽签图+杯子+结果，禁用抽签
        state.buttonhide = true;
        state.color = 'grey';
        state.texthide = false;
        state.texthide2 = true;
        state.imghide = false;
        state.imghide2 = true;
        state.imghide3 = true;
        state.sign = String(userInfo.lottery);
        state.image1 = '';
        state.image2 = '';
        state.image3 = '';
        state.title = '';
      } else {
        // 未抽签或跨天重置
        state.imghide3 = false;
        state.buttonhide = false;
        state.color = 'rgb(124, 11, 11)';
        state.texthide = true;
        state.count = 0;
        state.title = '';
        state.image1 = '';
        state.image2 = '';
        state.image3 = '';

        if (userInfo.lottery && userInfo.lottery !== 0) {
          // 有历史签号：显示签面图+上次结果文字
          state.texthide2 = false;
          state.imghide = false;
          state.imghide2 = true;
          state.sign = String(userInfo.lottery);
        } else {
          // 首次访问：显示抽签图
          state.texthide2 = true;
          state.imghide = true;
          state.imghide2 = false;
          state.sign = '';
        }
      }

      updateAll();
    },

    hide: function () {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      if (loadingTimer) {
        clearInterval(loadingTimer);
        loadingTimer = null;
      }
    },

    draw: function () {
      if (state.buttonhide) return;

      // 对齐原版 draw()：隐藏所有内容，显示抽签动画
      state.isShow = false;
      state.imghide2 = true;
      state.btnhide3 = true;
      state.btnhide2 = true;
      state.btnhide = true;
      state.title = '';
      state.image1 = '';
      state.image2 = '';
      state.image3 = '';
      state.count = 0;
      state.sign = '';
      state.imghide = true;
      state.texthide2 = true;
      state.resopen = false;

      if (timer) {
        clearInterval(timer);
      }

      // 2秒后对齐原版 timechange()：隐藏动画，显示签面图+签号，显示掷杯按钮
      timer = setInterval(function () {
        state.isShow = true;
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
        var idx = Math.floor(Math.random() * signList.length);
        state.sign = String(signList[idx]);
        state.imghide = false;
        state.btnhide2 = true;
        state.btnhide = false;
        updateAll();
      }, 2000);

      updateAll();
    },

    onButtonClick: function () {
      var idx = Math.floor(Math.random() * images.length);
      var img = images[idx];
      var isHolyCup = img.indexOf('圣杯') !== -1;

      if (isHolyCup) {
        state.count++;
        state['image' + (state.count)] = img;
        state.title = '你掷出了一次圣杯，请再掷一次！';

        if (state.count >= 3) {
          state.title = '恭喜你,连续三次掷出了圣杯，请取灵签!';
          state.btnhide = true;
          state.btnhide3 = false;
        }
      } else {
        state['image' + (state.count + 1)] = img;
        state.title = '你掷出了笑杯，此签不灵，请重新抽签';
        state.btnhide2 = false;
        state.btnhide = true;
      }

      updateAll();
    },

    getres: function () {
      state.btnhide3 = true;
      state.btnhide2 = false;
      state.buttonhide = true;
      state.color = 'grey';
      state.texthide = false;
      state.resopen = true;
      state.imghide3 = true;

      Storage.updateUserInfo({
        status: 1,
        datetime: new Date().toString(),
        lottery: parseInt(state.sign, 10) || 0
      });

      updateAll();

      App.navigate('/lottery-answer', { sign: state.sign });
    },

    gotores: function () {
      if (state.resopen) {
        App.navigate('/lottery-answer', { sign: state.sign });
      }
    },

    restart: function () {
      Storage.updateUserInfo({
        status: 0,
        datetime: new Date().toString()
      });

      App.navigate('/lottery');
    },

    imgload: function () {
      var userInfo = Storage.getUserInfo();
      var now = new Date();

      if (userInfo.datetime) {
        if (!isSameDay(userInfo.datetime, now)) {
          Storage.updateUserInfo({ status: 0, datetime: now.toString() });
          userInfo.status = 0;
        }
      }

      if (userInfo.status === 0) {
        state.buttonhide = false;
        state.color = 'rgb(124, 11, 11)';
        state.texthide = true;
        if (userInfo.lottery && userInfo.lottery !== 0) {
          state.texthide2 = false;
        }
      }

      state.imgload = false;
      state.imgnoload = true;

      updateAll();
    }
  };

  App.registerPage('lottery', module);
})();
