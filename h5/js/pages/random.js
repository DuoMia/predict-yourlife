(function () {
  var pageEl = null;
  var baguaEl = null;
  var timers = [];
  var _inited = false;
  var _deleting = false;

  var state = {
    resp: '',
    inputlist: [''],
    sum: 0,
    color: '124, 11, 11',
    rotatenum: 0,
    ishidden: true,
    hiddeninfo: true,
    resp_type: '',
    respinfo: '',
    resp_info: '',
    resp_title: '点击展开',
    buttonhide: false,
    buttonhide2: false,
    showimg: true,
    select: true,
    left: '',
    top: '',
    rotate: '',
    showModal: false,
    selectedOptionIndex: -1
  };

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

    var startBtn = pageEl.querySelector('.random-start-btn');
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

  function renderInputList() {
    var listEl = pageEl.querySelector('.random-input-list');
    if (!listEl) return;

    listEl.innerHTML = '';
    for (var i = 0; i < state.inputlist.length; i++) {
      var item = document.createElement('div');
      item.className = 'random-input-item';

      var input = document.createElement('input');
      input.type = 'number';
      input.placeholder = '请输入数字';
      input.value = state.inputlist[i];
      input.setAttribute('data-index', i);
      (function (idx) {
        input.addEventListener('input', function (e) {
          checknums(e, idx);
        });
      })(i);

      var btnGroup = document.createElement('div');
      btnGroup.className = 'random-btn-group';

      var addBtn = document.createElement('button');
      addBtn.className = 'random-add-btn';
      addBtn.innerHTML = '<img src="images/add.png">';
      addBtn.addEventListener('click', function (e) {
        e.preventDefault();
        addinput();
      });

      var delBtn = document.createElement('button');
      delBtn.className = 'random-delete-btn';
      delBtn.setAttribute('data-index', i);
      delBtn.innerHTML = '<img src="images/delete.png">';
      if (state.buttonhide2) {
        delBtn.style.display = 'none';
      }
      (function (idx) {
        delBtn.addEventListener('click', function (e) {
          e.preventDefault();
          deletedq(idx);
        });
      })(i);

      btnGroup.appendChild(addBtn);
      btnGroup.appendChild(delBtn);
      item.appendChild(input);
      item.appendChild(btnGroup);
      listEl.appendChild(item);
    }
  }

  function clearTimers() {
    for (var i = 0; i < timers.length; i++) {
      clearTimeout(timers[i]);
    }
    timers = [];
  }

  function addinput() {
    var list = state.inputlist.slice();
    list.push('');
    var updates = { inputlist: list };
    if (list.length > 1) {
      updates.buttonhide2 = false;
    }
    setState(updates);
    renderInputList();
    requestAnimationFrame(function () {
      var area = pageEl.querySelector('.random-input-area');
      if (area) {
        area.scrollTo({ top: area.scrollHeight, behavior: 'smooth' });
      }
      var inputs = pageEl.querySelectorAll('.random-input-item input');
      if (inputs.length > 0) {
        var lastInput = inputs[inputs.length - 1];
        setTimeout(function () {
          lastInput.focus();
        }, 300);
      }
    });
  }

  function deletedq(index) {
    if (_deleting) return;
    var items = pageEl.querySelectorAll('.random-input-item');
    var targetItem = items[index];
    if (!targetItem) return;

    _deleting = true;
    targetItem.classList.add('removing');

    setTimeout(function () {
      var list = state.inputlist.slice();
      list.splice(index, 1);
      var updates = { inputlist: list };
      if (list.length === 1) {
        updates.buttonhide2 = true;
      }
      setState(updates);
      renderInputList();
      _deleting = false;

      requestAnimationFrame(function () {
        var area = pageEl.querySelector('.random-input-area');
        if (!area) return;
        var maxScroll = area.scrollHeight - area.clientHeight;
        if (area.scrollTop > maxScroll) {
          area.scrollTo({ top: maxScroll > 0 ? maxScroll : 0, behavior: 'smooth' });
        }
        var remainingInputs = pageEl.querySelectorAll('.random-input-item input');
        var focusIdx = index < remainingInputs.length ? index : remainingInputs.length - 1;
        if (focusIdx >= 0 && remainingInputs[focusIdx]) {
          remainingInputs[focusIdx].focus();
        }
      });
    }, 250);
  }

  function checknums(e, index) {
    var value = e.target.value.replace(/\D/g, '');
    var list = state.inputlist.slice();
    list[index] = value;
    var sum = 0;
    for (var i = 0; i < list.length; i++) {
      if (list[i] !== '') {
        sum = sum + parseInt(list[i], 10);
      }
    }
    state.inputlist = list;
    state.sum = sum;
  }

  function chooseModal() {
    var inputlist = state.inputlist;
    for (var i = 0; i < inputlist.length; i++) {
      if (inputlist[i] === '' || inputlist[i] === 0 || inputlist[i] === '0') {
        App.toast('请输入非0整数哦！');
        return;
      }
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
      buttonhide2: true,
      select: true
    });

    var sum = state.sum;
    var length = state.inputlist.length;
    sum = (sum - (length - 1)) % 6;

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
        setState({ ishidden: false });
      }, rotateTime + 2000));
    }
  }

  function onmodal() {
    clearTimers();
    var inputlist = state.inputlist;
    var updates = {
      ishidden: true,
      buttonhide: false,
      color: '124, 11, 11'
    };
    if (inputlist.length !== 1) {
      updates.buttonhide2 = false;
    }
    setState(updates);
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

  function goto1() {
    App.navigate('/datetime');
  }

  function bindEvents() {
    var actionEls = pageEl.querySelectorAll('[data-action]');
    for (var i = 0; i < actionEls.length; i++) {
      (function (el) {
        var action = el.getAttribute('data-action');
        if (action === 'addinput' || action === 'deletedq' || action === 'selectOption') {
          return;
        }
        el.addEventListener('click', function (e) {
          e.preventDefault();
          switch (action) {
            case 'chooseModal': chooseModal(); break;
            case 'closeModal': closeModal(); break;
            case 'onmodal': onmodal(); break;
            case 'openinfo': openinfo(); break;
            case 'openexplain': openexplain(); break;
            case 'closeimg': closeimg(); break;
            case 'goto1': goto1(); break;
          }
        });
      })(actionEls[i]);
    }

    var resultModal = pageEl.querySelector('.result-modal');
    if (resultModal) {
      resultModal.addEventListener('click', function (e) {
        if (e.target === resultModal) {
          e.preventDefault();
          onmodal();
        }
      });
    }

    var optionEls = pageEl.querySelectorAll('.type-option[data-action="selectOption"]');
    for (var j = 0; j < optionEls.length; j++) {
      (function (el) {
        var idx = parseInt(el.getAttribute('data-index'), 10);
        el.addEventListener('click', function (e) {
          e.preventDefault();
          selectOption(idx);
        });
      })(optionEls[j]);
    }
  }

  function resetState() {
    clearTimers();
    state.resp = '';
    state.inputlist = [''];
    state.sum = 0;
    state.color = '124, 11, 11';
    state.rotatenum = 0;
    state.ishidden = true;
    state.hiddeninfo = true;
    state.resp_type = '';
    state.respinfo = '';
    state.resp_info = '';
    state.resp_title = '点击展开';
    state.buttonhide = false;
    state.buttonhide2 = false;
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

      pageEl = document.getElementById('page-random');
      if (!pageEl) return;
      baguaEl = document.getElementById('random-bagua');
      resetState();
      state.buttonhide2 = true;
      bindEvents();
      render();
      renderInputList();
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
      _deleting = false;
      if (state.buttonhide) {
        resetState();
        state.buttonhide2 = true;
        if (baguaEl) {
          baguaEl.style.transition = 'none';
          baguaEl.style.animation = '';
          baguaEl.style.transform = 'rotate(0deg)';
          baguaEl.offsetHeight;
        }
        renderInputList();
        render();
      }
    }
  };

  App.registerPage('random', module);
})();
