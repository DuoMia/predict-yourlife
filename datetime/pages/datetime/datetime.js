var hours = ['子时（23点整至1点整）', '丑时（1点整至3点整）', '寅时（3点整至5点整）', '卯时（5点整至7点整）', '辰时（7点整至9点整）', '巳时（9点整至11点整）', '午时（11点整至13点整）', '未时（13点整至15点整）', '申时（15点整至17点整）', '酉时（17点整至19点整）', '戌时（19点整至21点整）', '亥时（21点整至23点整）'];
var hourIndex = 0;
var hournum = "no";
var color = "124, 11, 11";
var ishidden = true;
var hiddeninfo = true;
var info = "点击选择你想测算的日期";
var timeinfo = "点击选择你想测算的时辰";
var resp_title = "点击展开";
var resp = "";
var respinfo = "";
var resp_info = "";
var resp_type = "";
var ishiddenres = true;
var buttonhide = false;
var showimg = true;
var select = true;
var showModal = false;
var selectedOptionIndex = -1;
var selectedDate = null;
var isRotating = false;

var respData = {
  '空亡': {
    info: '音信稀时，五行属土，颜色黄色，方位中央;临勾陈。谋事主三、六、九。有不吉、无结果、忧虑之含义。诀曰:空亡事不祥，阴人多乖张。求财无利益，行人有灾殃。失物寻不见，官事有刑伤。病人逢暗鬼，析解可安康。',
    details: ['出行不利，易遇阻碍', '病情反复，需多调养', '失物难寻', '不宜修造']
  },
  '大安': {
    info: '身不动时，五行属木，颜色青色，方位东方。临青龙，谋事主一、五、七。有静止、心安。吉祥之含义。诀曰:大安事事昌，求谋在东方，失物去不远，宅舍保安康。行人身未动，病者主无妨。将军回田野，仔细好推详。',
    details: ['出行大吉，东方最宜', '身体无碍，心情舒畅', '失物在近处', '宜修造动土']
  },
  '留连': {
    info: '人未归时，五行属水，颜色黑色，方位北方，临玄武，凡谋事主二、八、十。有喑味不明，延迟。纠缠.拖延、漫长之含义。诀曰:留连事难成，求谋日未明。官事只宜缓，去者来回程，失物南方去，急寻方心明。更需防口舌，人事且平平。',
    details: ['出行有阻，需耐心', '病情缠绵', '失物在南方', '修造宜缓']
  },
  '速喜': {
    info: '人即至时，五行属火，颜色红色方位南方，临朱雀，谋事主三，六，九。有快速、喜庆，吉利之含义。指时机已到。诀曰:速喜喜来临，求财向南行。失物申未午，逢人要打听。官事有福德，病者无须恐。田宅六畜吉，行人音信明。',
    details: ['出行速吉，南方大利', '病情好转', '失物速寻可得', '修造吉利']
  },
  '赤口': {
    info: '官事凶时，五行属金，颜色白色，方位西方，临白虎，谋事主四、七，十。有不吉、惊恐，凶险、口舌是非之含义。诀曰:赤口主口舌，官非切要防。失物急去寻，行人有惊慌。鸡犬多作怪，病者出西方。更须防咀咒，恐怕染瘟殃。',
    details: ['出行不利，宜避西方', '病情较重', '失物难寻', '不宜修造']
  },
  '小吉': {
    info: '人来喜时，五行属木，临六合，凡谋事主一、五、七有和合、吉利之含义。诀曰:小吉最吉昌，路上好商量。阴人来报喜，失物在坤方。行人立便至，交易甚是强，凡事皆和合，病者祈上苍。',
    details: ['出行吉利，有贵人', '病情好转', '失物可寻', '修造顺利']
  }
};

function datemodal() {
  document.getElementById('date-modal').style.display = 'block';
  document.getElementById('modal-mask').style.display = 'block';
}

function timemodal() {
  document.getElementById('time-modal').style.display = 'block';
  document.getElementById('modal-mask').style.display = 'block';
}

function confirmDate() {
  var dateInput = document.getElementById('date-input');
  if (dateInput.value) {
    selectedDate = new Date(dateInput.value);
    var year = selectedDate.getFullYear();
    var month = selectedDate.getMonth() + 1;
    var day = selectedDate.getDate();
    info = "你选择的日期是: " + year + "年" + month + "月" + day + "日";
    document.getElementById('date-btn').textContent = info;
    hournum = hourIndex;
  }
  closeDateModal();
}

function confirmTime() {
  timeinfo = "你选择的时辰是" + hours[hourIndex];
  document.getElementById('time-btn').textContent = timeinfo;
  hournum = hourIndex;
  closeTimeModal();
}

function closeDateModal() {
  document.getElementById('date-modal').style.display = 'none';
  document.getElementById('modal-mask').style.display = 'none';
}

function closeTimeModal() {
  document.getElementById('time-modal').style.display = 'none';
  document.getElementById('modal-mask').style.display = 'none';
}

function onHourChange(value) {
  hourIndex = parseInt(value);
}

function goto2() {
  window.location.href = '../../../random/pages/random/random.html';
}

function openexplain() {
  showimg = false;
  document.getElementById('modal-mask').style.display = 'block';
  document.getElementById('explain-modal').style.display = 'block';
}

function closeimg() {
  showimg = true;
  document.getElementById('modal-mask').style.display = 'none';
  document.getElementById('explain-modal').style.display = 'none';
}

function chooseModal() {
  if (!selectedDate) {
    showToast('请选择日期哦~');
    return;
  }
  if (hournum === "no") {
    showToast('请选择时辰哦~');
    return;
  }
  showModal = true;
  document.getElementById('option-mask').style.display = 'block';
  document.getElementById('option-modal').style.display = 'block';
}

function closeModal() {
  showModal = false;
  document.getElementById('option-mask').style.display = 'none';
  document.getElementById('option-modal').style.display = 'none';
}

function selectOption(index) {
  selectedOptionIndex = index;
  var types = ['出行求财', '疾病康愈', '失物寻找', '吊宫修造'];
  resp_type = types[index];
  
  closeModal();
  buttonhide = true;
  color = "grey";
  
  calculateResult();
}

function calculateResult() {
  var year = selectedDate.getFullYear();
  var month = selectedDate.getMonth() + 1;
  var day = selectedDate.getDate();
  
  var sum = year + month + day + hourIndex;
  sum = (sum - 2) % 6;
  
  var results = ['空亡', '大安', '留连', '速喜', '赤口', '小吉'];
  resp = results[sum];
  respinfo = respData[resp].info;
  resp_info = respData[resp].details[selectedOptionIndex];
  
  // 每种结果对应不同的角度（每60度一个结果）
  var rotateNums = [300, 0, 60, 120, 180, 240]; // 空亡、大安、留连、速喜、赤口、小吉
  var targetAngle = rotateNums[sum];
  
  // 添加多圈旋转（5圈 + 目标角度）
  var totalRotate = 1800 + targetAngle; // 5圈 = 1800度
  
  // 旋转动画
  var img = document.getElementById('myImage');
  isRotating = true;
  img.style.transform = 'rotate(' + totalRotate + 'deg)';
}

// 监听旋转结束
document.addEventListener('DOMContentLoaded', function() {
  var img = document.getElementById('myImage');
  img.addEventListener('transitionend', function(e) {
    if (e.propertyName === 'transform' && isRotating) {
      isRotating = false;
      
      // 显示指针（箭头）
      document.getElementById('turn').style.display = 'block';
      
      // 500ms后显示结果弹窗
      setTimeout(function() {
        showResultModal();
      }, 500);
    }
  });
});

function showResultModal() {
  document.getElementById('resp-type').textContent = resp_type;
  document.getElementById('resp-result').textContent = resp;
  document.getElementById('resp-name').textContent = resp;
  document.getElementById('info-text').textContent = respinfo;
  document.getElementById('resp-detail').textContent = resp_info;
  document.getElementById('result-modal').style.display = 'block';
  document.getElementById('modal-mask').style.display = 'block';
}

function openinfo() {
  hiddeninfo = !hiddeninfo;
  resp_title = hiddeninfo ? "点击展开" : "点击收起";
  document.getElementById('info-text').style.display = hiddeninfo ? 'none' : 'block';
  document.getElementById('resp-title').textContent = resp_title;
}

function resonmodal() {
  ishiddenres = true;
  buttonhide = false;
  color = "124, 11, 11";
  document.getElementById('result-modal').style.display = 'none';
  document.getElementById('modal-mask').style.display = 'none';
  document.getElementById('turn').style.display = 'none';
}
