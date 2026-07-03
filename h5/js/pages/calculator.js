(function () {
  var pageEl = null;
  var displaySlots = [];
  var counter = { posture: ['', '', ''], ansType: false };
  var _inited = false;

  function updateDisplay() {
    displaySlots[0].textContent = counter.posture[0];
    displaySlots[1].textContent = counter.posture[1];
    displaySlots[2].textContent = counter.posture[2];
  }

  function numBtn(val) {
    if (counter.ansType) {
      counter.posture[0] = '';
      counter.ansType = false;
    }

    if (counter.posture[1] === '') {
      if (val === '.') {
        if (counter.posture[0] === '') {
          counter.posture[0] = '0.';
        } else if (counter.posture[0].indexOf('.') !== -1) {
          return;
        } else {
          counter.posture[0] += '.';
        }
      } else {
        if (counter.posture[0] === '0') {
          counter.posture[0] = val;
        } else {
          counter.posture[0] += val;
        }
      }
    } else {
      if (val === '.') {
        if (counter.posture[2] === '') {
          counter.posture[2] = '0.';
        } else if (counter.posture[2].indexOf('.') !== -1) {
          return;
        } else {
          counter.posture[2] += '.';
        }
      } else {
        if (counter.posture[2] === '0') {
          counter.posture[2] = val;
        } else {
          counter.posture[2] += val;
        }
      }
    }

    updateDisplay();
  }

  function opBtn(op) {
    if (counter.posture[2] !== '') {
      finish(false);
    }
    counter.posture[1] = op;
    counter.ansType = false;
    updateDisplay();
  }

  function finish(isManual) {
    var left = parseFloat(counter.posture[0]) || 0;
    var right = parseFloat(counter.posture[2]) || 0;
    var op = counter.posture[1];
    var result = 0;

    switch (op) {
      case '+':
        result = Accurate.add(left, right);
        break;
      case '-':
        result = Accurate.sub(left, right);
        break;
      case '×':
        result = Accurate.mul(left, right);
        break;
      case '÷':
        if (right === 0) {
          counter.posture = ['错误', '', ''];
          updateDisplay();
          return;
        }
        result = Accurate.div(left, right);
        result = parseFloat(result.toFixed(10));
        break;
      case '%':
        if (right === 0) {
          counter.posture = ['错误', '', ''];
          updateDisplay();
          return;
        }
        result = left % right;
        break;
      default:
        result = left;
    }

    counter.posture = [String(result), '', ''];
    if (isManual) {
      counter.ansType = true;
    }
    updateDisplay();
  }

  function resetBtn() {
    counter.posture = ['', '', ''];
    counter.ansType = false;
    updateDisplay();
  }

  function delBtn() {
    if (counter.posture[2] !== '') {
      counter.posture[2] = counter.posture[2].slice(0, -1);
    } else if (counter.posture[1] !== '') {
      counter.posture[1] = '';
    } else if (counter.posture[0] !== '') {
      counter.posture[0] = counter.posture[0].slice(0, -1);
    }
    counter.ansType = false;
    updateDisplay();
  }

  var module = {
    init: function () {
      if (_inited) return;
      _inited = true;

      pageEl = document.getElementById('page-calculator');
      displaySlots = [
        pageEl.querySelector('[data-slot="0"]'),
        pageEl.querySelector('[data-slot="1"]'),
        pageEl.querySelector('[data-slot="2"]')
      ];

      var btns = pageEl.querySelector('.calculator-btns');
      btns.addEventListener('click', function (e) {
        var target = e.target;
        while (target && target !== btns) {
          var action = target.getAttribute('data-action');
          if (action) {
            var val = target.getAttribute('data-val');
            switch (action) {
              case 'numBtn': numBtn(val); break;
              case 'opBtn': opBtn(val); break;
              case 'resetBtn': resetBtn(); break;
              case 'delBtn': delBtn(); break;
              case 'finish': finish(true); break;
            }
            return;
          }
          target = target.parentElement;
        }
      });
    },
    show: function () {
      resetBtn();
    },
    hide: function () {
      resetBtn();
    }
  };

  App.registerPage('calculator', module);
})();
