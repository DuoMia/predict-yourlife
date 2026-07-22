(function () {
  var pageEl = null;
  var baguaEl = null;
  var calendarInstance = null;
  var timers = [];
  var _inited = false;

  var state = {
    hours: ['子时（23点整至1点整）', '丑时（1点整至3点整）', '寅时（3点整至5点整）', '卯时（5点整至7点整）', '辰时（7点整至9点整）', '巳时（9点整至11点整）', '午时（11点整至13点整）', '未时（13点整至15点整）', '申时（15点整至17点整）', '酉时（17点整至19点整）', '戌时（19点整至21点整）', '亥时（21点整至23点整）'],
    hourIndex: 0,
    hournum: 'no',
    color: '124, 11, 11',
    ishidden: true,
    ishiddentime: true,
    ishiddentimedate: false,
    hiddeninfo: true,
    numlist: [],
    resp: '',
    alltime: '',
    timedate: 'no',
    info: '点击选择你想测算的日期',
    timeinfo: '点击选择你想测算的时辰',
    resp_title: '点击展开',
    rotatenum: 0,
    respinfo: '',
    resp_info: '',
    resp_type: '',
    ishiddenres: true,
    buttonhide: false,
    showimg: true,
    select: true,
    left: '',
    top: '',
    rotate: '',
    showModal: false,
    selectedOptionIndex: -1
  };

  function chineseToNumber(str) {
    var map = { '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9 };
    if (str === '十') return 10;
    if (str.indexOf('十') === -1) return map[str] || 0;
    var parts = str.split('十');
    var tens = parts[0] ? (map[parts[0]] || 0) : 1;
    var ones = parts[1] ? (map[parts[1]] || 0) : 0;
    return tens * 10 + ones;
  }

  function setState(updates) {
    for (var key in updates) {
      if (updates.hasOwnProperty(key)) {
        state[key] = updates[key];
      }
    }
    render();
  }

  function render() {
    if (!pageEl) return;

    var showEls = pageEl.querySelectorAll('[data-show]');
    for (var i = 0; i < showEls.length; i++) {
      var prop = showEls[i].getAttribute('data-show');
      if (state.hasOwnProperty(prop)) {
        var visible;
        if (prop === 'showModal') {
          visible = state[prop];
        } else {
          visible = !state[prop];
        }
        showEls[i].style.display = visible ? '' : 'none';
      }
    }

    var roleEls = pageEl.querySelectorAll('[data-role]');
    for (var j = 0; j < roleEls.length; j++) {
      var role = roleEls[j].getAttribute('data-role');
      if (state.hasOwnProperty(role)) {
        roleEls[j].textContent = state[role];
      }
    }

    var dateTextEl = pageEl.querySelector('.datetime-date-text');
    if (dateTextEl) {
      dateTextEl.textContent = state.info;
    }

    var timeTextEl = pageEl.querySelector('.datetime-time-text');
    if (timeTextEl) {
      timeTextEl.textContent = state.timeinfo;
    }

    var startBtn = pageEl.querySelector('.datetime-start-btn');
    if (startBtn) {
      if (state.buttonhide) {
        startBtn.style.backgroundColor = 'grey';
        startBtn.style.pointerEvents = 'none';
      } else {
        startBtn.style.backgroundColor = '';
        startBtn.style.pointerEvents = '';
      }
    }

    if (state.buttonhide) {
      pageEl.classList.add('predicting');
    } else {
      pageEl.classList.remove('predicting');
    }

    if (baguaEl && state.rotatenum > 0) {
      if (state.select) {
        baguaEl.style.animation = 'none';
      } else {
        baguaEl.style.animation = 'none';
        baguaEl.style.transition = 'none';
        baguaEl.style.transform = 'rotate(' + state.rotatenum + 'deg)';
      }
    }

    var pointerEl = pageEl.querySelector('.bagua-pointer');
    if (pointerEl && !state.select) {
      pointerEl.style.left = state.left;
      pointerEl.style.top = state.top;
      pointerEl.style.transform = 'rotate(' + state.rotate + 'deg)';
    }
  }

  function clearTimers() {
    for (var i = 0; i < timers.length; i++) {
      clearTimeout(timers[i]);
    }
    timers = [];
  }

  function datemodal() {
    if (!state.ishiddentime) return;
    setState({ ishidden: false });
  }

  function timemodal() {
    if (!state.ishidden) return;
    setState({ ishiddentime: false, hourIndex: 0 });
    var selectEl = pageEl.querySelector('.time-select');
    if (selectEl) {
      selectEl.value = '0';
    }
  }

  function onmodal() {
    var alltime = state.alltime;
    setState({
      timedate: alltime,
      ishiddentimedate: false,
      ishidden: true
    });
    var timedate = state.timedate;
    setState({
      info: '你选择的阴历日期是:' + timedate.lunar + '\n(' + '阳历为' + timedate.solar + ')'
    });
  }

  function openmodal() {
    var selectEl = pageEl.querySelector('.time-select');
    var idx = selectEl ? parseInt(selectEl.value, 10) : 0;
    if (isNaN(idx)) idx = 0;
    setState({
      ishiddentime: true,
      ishiddentimedate: false,
      hournum: idx
    });
    var hours = state.hours;
    setState({
      timeinfo: '你选择的时辰是' + hours[idx]
    });
  }

  function offmodal() {
    setState({ ishidden: true });
  }

  function cancelmodal() {
    setState({ ishiddentime: true });
  }

  function chooseModal() {
    if (state.timedate === 'no') {
      App.toast('请选择日期哦~');
      return;
    }
    if (state.hournum === 'no') {
      App.toast('请选择时辰哦~');
      return;
    }
    setState({ showModal: true });
  }

  function closeModal() {
    setState({ showModal: false });
  }

  function selectOption(index) {
    var types = ['出行求财', '疾病康愈', '失物寻找', '吊宫修造'];
    setState({
      resp_type: types[index] || '',
      selectedOptionIndex: index,
      showModal: false,
      buttonhide: true,
      select: true
    });

    var numlist = [];

    var datetime = state.timedate.lunar.replace('月', ',');
    datetime = datetime.replace('闰', '');
    datetime = datetime.replace('初', '');
    datetime = datetime.replace('廿', '二十');
    datetime = datetime.replace(' ', ',');
    datetime = datetime.split(',');

    for (var i = 0; i < datetime.length; i++) {
      var num = chineseToNumber(datetime[i]);
      if (num > 0) {
        numlist.push(num);
      }
    }

    var hours = state.hours;
    var hournum = state.hournum;
    var timeChar = hours[hournum].charAt(0);
    var hourMap = { '子': 1, '丑': 2, '寅': 3, '卯': 4, '辰': 5, '巳': 6, '午': 7, '未': 8, '申': 9, '酉': 10, '戌': 11, '亥': 12 };
    if (hourMap[timeChar]) {
      numlist.push(hourMap[timeChar]);
    }

    var sum = 0;
    for (var k = 0; k < numlist.length; k++) {
      sum = sum + numlist[k];
    }
    sum = (sum - 2) % 6;

    var results = [
      { name: '空亡', rotatenum: 1620, rotate: 180, left: '-15%', top: '83%', respinfo: '音信稀时，五行属土，颜色黄色，方位中央;临勾陈。谋事主三、六、九。有不吉、无结果、忧虑之含义。诀曰:空亡事不祥，阴人多乖张。求财无利益，行人有灾殃。失物寻不见，官事有刑伤。病人逢暗鬼，析解可安康。' },
      { name: '大安', rotatenum: 1680, rotate: 120, left: '19%', top: '61%', respinfo: '身不动时，五行属木，颜色青色，方位东方。临青龙，谋事主一、五、七。有静止、心安。吉祥之含义。诀曰:大安事事昌，求谋在东方，失物去不远，宅舍保安康。行人身未动，病者主无妨。将军回田野，仔细好推详。' },
      { name: '留连', rotatenum: 1740, rotate: 60, left: '17%', top: '20%', respinfo: '人未归时，五行属水，颜色黑色，方位北方，临玄武，凡谋事主二、八、十。有喑味不明，延迟。纠缠.拖延、漫长之含义。诀曰:留连事难成，求谋日未明。官事只宜缓，去者来回程，失物南方去，急寻方心明。更需防口舌，人事且平平。' },
      { name: '速喜', rotatenum: 1800, rotate: 0, left: '-19%', top: '2%', respinfo: '人即至时，五行属火，颜色红色方位南方，临朱雀，谋事主三，六，九。有快速、喜庆，吉利之含义。指时机已到。诀曰:速喜喜来临，求财向南行。失物申未午，逢人要打听。官事有福德，病者无须恐。田宅六畜吉，行人音信明。' },
      { name: '赤口', rotatenum: 1500, rotate: 300, left: '-53%', top: '24%', respinfo: '官事凶时，五行属金，颜色白色，方位西方，临白虎，谋事主四、七，十。有不吉、惊恐，凶险、口舌是非之含义。诀曰:赤口主口舌，官非切要防。失物急去寻，行人有惊慌。鸡犬多作怪，病者出西方。更须防咀咒，恐怕染瘟殃。' },
      { name: '小吉', rotatenum: 1560, rotate: 240, left: '-51%', top: '64%', respinfo: '人来喜时，五行属木，临六合，凡谋事主一、五、七有和合、吉利之含义。诀曰:小吉最吉昌，路上好商量。阴人来报喜，失物在坤方。行人立便至，交易甚是强，凡事皆和合，病者祈上苍。' }
    ];

    var result = results[sum];
    var respInfo = Storage.getResInfo(result.name, state.selectedOptionIndex);

    setState({
      resp: result.name,
      rotatenum: result.rotatenum,
      respinfo: result.respinfo,
      left: result.left,
      top: result.top,
      rotate: result.rotate,
      resp_info: respInfo
    });

    if (baguaEl) {
      baguaEl.style.animation = 'none';
      baguaEl.style.transition = 'none';
      baguaEl.style.transform = 'rotate(0deg)';
      baguaEl.offsetHeight;
      var rotateDegree = state.rotatenum;
      var rotateTime = Math.abs(rotateDegree) / 360 * 1000;
      baguaEl.style.transition = 'transform ' + rotateTime + 'ms linear';
      baguaEl.style.transform = 'rotate(' + rotateDegree + 'deg)';

      clearTimers();
      timers.push(setTimeout(function () {
        setState({ select: false });
      }, rotateTime));

      timers.push(setTimeout(function () {
        setState({ ishiddenres: false });
      }, rotateTime + 2000));
    }
  }

  function resonmodal() {
    clearTimers();
    setState({
      ishiddenres: true,
      buttonhide: false,
      color: '124, 11, 11'
    });
  }

  function openinfo() {
    setState({
      hiddeninfo: state.hiddeninfo ? false : true,
      resp_title: state.resp_title === '点击展开' ? '点击收起' : '点击展开'
    });
  }

  function openexplain() {
    setState({ showimg: false });
  }

  function closeimg() {
    setState({ showimg: true });
  }

  function solarAndLunar(data) {
    state.alltime = data;
  }

  function goto2() {
    App.navigate('/random');
  }

  function bindEvents() {
    var actionEls = pageEl.querySelectorAll('[data-action]');
    for (var i = 0; i < actionEls.length; i++) {
      (function (el) {
        var action = el.getAttribute('data-action');
        el.addEventListener('click', function (e) {
          e.preventDefault();
          switch (action) {
            case 'datemodal': datemodal(); break;
            case 'timemodal': timemodal(); break;
            case 'onmodal': onmodal(); break;
            case 'openmodal': openmodal(); break;
            case 'offmodal': offmodal(); break;
            case 'cancelmodal': cancelmodal(); break;
            case 'chooseModal': chooseModal(); break;
            case 'closeModal': closeModal(); break;
            case 'selectOption':
              var idx = parseInt(el.getAttribute('data-index'), 10);
              selectOption(idx);
              break;
            case 'resonmodal': resonmodal(); break;
            case 'openinfo': openinfo(); break;
            case 'openexplain': openexplain(); break;
            case 'closeimg': closeimg(); break;
            case 'goto2': goto2(); break;
          }
        });
      })(actionEls[i]);
    }

    var resultModal = pageEl.querySelector('.result-modal');
    if (resultModal) {
      resultModal.addEventListener('click', function (e) {
        if (e.target === resultModal) {
          e.preventDefault();
          resonmodal();
        }
      });
    }
  }

  function resetState() {
    clearTimers();
    state.hours = ['子时（23点整至1点整）', '丑时（1点整至3点整）', '寅时（3点整至5点整）', '卯时（5点整至7点整）', '辰时（7点整至9点整）', '巳时（9点整至11点整）', '午时（11点整至13点整）', '未时（13点整至15点整）', '申时（15点整至17点整）', '酉时（17点整至19点整）', '戌时（19点整至21点整）', '亥时（21点整至23点整）'];
    state.hourIndex = 0;
    state.hournum = 'no';
    state.color = '124, 11, 11';
    state.ishidden = true;
    state.ishiddentime = true;
    state.ishiddentimedate = false;
    state.hiddeninfo = true;
    state.numlist = [];
    state.resp = '';
    state.alltime = '';
    state.timedate = 'no';
    state.info = '点击选择你想测算的日期';
    state.timeinfo = '点击选择你想测算的时辰';
    state.resp_title = '点击展开';
    state.rotatenum = 0;
    state.respinfo = '';
    state.resp_info = '';
    state.resp_type = '';
    state.ishiddenres = true;
    state.buttonhide = false;
    state.showimg = true;
    state.select = true;
    state.left = '';
    state.top = '';
    state.rotate = '';
    state.showModal = false;
    state.selectedOptionIndex = -1;
  }

  var module = {
    init: function (params) {
      if (_inited) return;
      _inited = true;

      pageEl = document.getElementById('page-datetime');
      if (!pageEl) return;
      baguaEl = document.getElementById('datetime-bagua');
      resetState();

      var calendarContainer = pageEl.querySelector('[data-component="calendar"]');
      if (calendarContainer && typeof CalendarComponent !== 'undefined') {
        calendarInstance = new CalendarComponent(calendarContainer, {
          onDateSelect: function (data) {
            solarAndLunar(data);
          }
        });
      }

      bindEvents();
      render();
    },

    show: function (params) {
      if (baguaEl) {
        baguaEl.style.transition = 'none';
        baguaEl.style.animation = '';
        if (state.rotatenum > 0 && !state.select) {
          baguaEl.style.transform = 'rotate(' + state.rotatenum + 'deg)';
        } else {
          baguaEl.style.transform = 'rotate(0deg)';
        }
        baguaEl.offsetHeight;
      }
      render();
    },

    hide: function () {
      clearTimers();
      if (state.buttonhide) {
        resetState();
        if (baguaEl) {
          baguaEl.style.transition = 'none';
          baguaEl.style.animation = '';
          baguaEl.style.transform = 'rotate(0deg)';
          baguaEl.offsetHeight;
        }
        if (calendarInstance) {
          var now = new Date();
          calendarInstance.display(now.getFullYear(), now.getMonth() + 1);
        }
        render();
      }
    }
  };

  module.solarAndLunar = solarAndLunar;

  App.registerPage('datetime', module);
})();
