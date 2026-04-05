var signList = [];
for (var i = 1; i <= 100; i++) signList.push(i);

var sign = "";
var isShow = true;
var current = 0;
var hasSwitched = false;
var title = "";
var btnhide = true;      // 掷杯按钮隐藏
var btnhide2 = false;    // 抽签按钮显示
var btnhide3 = true;     // 取签按钮隐藏
var imghide = true;      // 签面隐藏
var imghide2 = false;    // 抽签图显示
var imghide3 = true;     // 圣杯容器隐藏
var image1 = '';
var image2 = '';
var image3 = '';
var count = 0;
var buttonhide = false;
var color = "rgb(124, 11, 11)";
var texthide = true;
var texthide2 = true;
var resopen = false;     // 初始不能跳转
var timer = null;
var isDrawing = false;

document.addEventListener('DOMContentLoaded', function() {
  load();
  updateUI();
  // 3秒后自动显示主页面
  setTimeout(function() {
    if (!hasSwitched) {
      showMainPage();
    }
  }, 3000);
});

function load() {
  var n = 1;
  var t = setInterval(function() {
    if (n == 10) {
      clearInterval(t);
    }
    current++;
    if (current > 3) current = 0;
    updateLoadDots();
    n++;
  }, 400);
}

function updateLoadDots() {
  var dots = document.querySelectorAll('.load span');
  dots.forEach(function(dot, i) {
    dot.classList.toggle('sct', i === current);
  });
}

function showMainPage() {
  hasSwitched = true;
  document.getElementById('loading-container').style.display = 'none';
  document.getElementById('lottery-container').style.display = 'block';
}

function imgloadDone() {
  showMainPage();
}

function draw() {
  if (isDrawing) return;
  isDrawing = true;
  
  // 重置状态
  isShow = false;
  imghide2 = true;     // 隐藏抽签图
  btnhide3 = true;     // 隐藏取签按钮
  title = "";
  btnhide = true;      // 隐藏掷杯按钮
  image1 = "";
  image2 = "";
  image3 = "";
  count = 0;
  sign = "";
  imghide = true;      // 隐藏签面
  imghide3 = true;     // 隐藏圣杯容器
  texthide = true;
  texthide2 = true;
  resopen = false;
  
  // 清空圣杯图片
  document.getElementById('cup1').src = "";
  document.getElementById('cup2').src = "";
  document.getElementById('cup3').src = "";
  
  updateUI();
  
  document.getElementById('loading-lottery').style.display = 'block';
  
  // 2秒后显示签面
  setTimeout(function() {
    var index = Math.floor(Math.random() * signList.length);
    sign = signList[index];
    imghide = false;    // 显示签面
    imghide2 = true;    // 隐藏抽签图
    
    // 显示签号（格式：第 X 签）
    document.getElementById('sign').textContent = "第 " + sign + " 签";
    document.getElementById('img2').style.display = 'block';
    document.getElementById('sign').style.display = 'block';
    
    btnhide2 = true;    // 隐藏抽签按钮
    btnhide = false;    // 显示掷杯按钮
    // 圣杯容器等掷杯时再显示
    
    document.getElementById('loading-lottery').style.display = 'none';
    isDrawing = false;
    
    updateUI();
  }, 2000);
}

function onButtonClick() {
  // 第一次掷杯时显示圣杯容器
  if (count === 0) {
    imghide3 = false;
    updateUI();
  }
  
  // 随机选择圣杯或笑杯（7/8概率圣杯，1/8概率笑杯）
  var isShengbei = Math.random() < 0.875;  // 87.5%概率圣杯
  
  var cupImage = isShengbei ? '../../../picture/圣杯.png' : '../../../picture/笑杯.png';
  
  count++;
  
  // 只设置当前掷出的杯
  document.getElementById('cup' + count).src = cupImage;
  
  if (isShengbei) {
    if (count === 3) {
      title = "恭喜你,连续三次掷出了圣杯，请取灵签!";
      btnhide = true;
      btnhide3 = false;
      resopen = true;
    } else {
      title = "你掷出了一次圣杯，请再掷一次！";
    }
    
    document.getElementById('text2').textContent = title;
  } else {
    // 笑杯
    title = "你掷出了笑杯，此签不灵，请重新抽签";
    document.getElementById('text2').textContent = title;
    
    // 1.5秒后重置
    setTimeout(function() {
      btnhide2 = false;   // 显示抽签按钮
      btnhide = true;     // 隐藏掷杯按钮
      imghide = true;     // 隐藏签面
      imghide3 = true;    // 隐藏圣杯容器
      count = 0;
      image1 = "";
      image2 = "";
      image3 = "";
      document.getElementById('cup1').src = "";
      document.getElementById('cup2').src = "";
      document.getElementById('cup3').src = "";
      document.getElementById('img2').style.display = 'none';
      document.getElementById('sign').style.display = 'none';
      updateUI();
    }, 1500);
    return;
  }
  
  updateUI();
}

function getres() {
  if (!resopen) return;
  
  btnhide3 = true;
  btnhide2 = false;
  buttonhide = true;
  color = "grey";
  texthide = false;
  imghide3 = true;
  
  updateUI();
  
  window.location.href = '../../../lottery_answer/pages/lottery_answer/lottery_answer.html?sign=' + sign;
}

function gotores() {
  if (resopen) {
    window.location.href = '../../../lottery_answer/pages/lottery_answer/lottery_answer.html?sign=' + sign;
  }
}

function restart() {
  window.location.reload();
}

function updateUI() {
  document.getElementById('btn-throw').style.display = btnhide ? 'none' : 'block';
  document.getElementById('btn-draw').style.display = btnhide2 ? 'none' : 'block';
  document.getElementById('btn-getres').style.display = btnhide3 ? 'none' : 'block';
  document.getElementById('img1').style.display = imghide2 ? 'none' : 'block';
  document.getElementById('img2').style.display = imghide ? 'none' : 'block';
  document.getElementById('sign').style.display = imghide ? 'none' : 'block';
  document.getElementById('cups-container').style.display = imghide3 ? 'none' : 'flex';
  document.getElementById('text2').style.display = (imghide3 && !title) ? 'none' : 'block';
  document.getElementById('text3').style.display = texthide ? 'none' : 'block';
  document.getElementById('text4').style.display = texthide ? 'none' : 'block';
  document.getElementById('restart-btn').style.display = texthide ? 'none' : 'block';
  document.getElementById('btn-draw').disabled = buttonhide;
  document.getElementById('btn-draw').style.color = color;
}
