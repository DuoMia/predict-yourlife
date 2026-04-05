var current = 0;
var imgload = true;
var imgnoload = false;
var hasSwitched = false;

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  load();
  // 3秒后自动切换到主页面（防止图片加载失败卡住）
  setTimeout(function() {
    if (!hasSwitched) {
      showMainPage();
    }
  }, 3000);
});

function load() {
  var n = 1;
  var timer = setInterval(function() {
    if (n == 10) {
      clearInterval(timer);
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
    if (i === current) {
      dot.classList.add('sct');
    } else {
      dot.classList.remove('sct');
    }
  });
}

function showMainPage() {
  hasSwitched = true;
  document.getElementById('loading-container').style.display = 'none';
  document.getElementById('main-container').style.display = 'block';
}

function onMainImgLoad() {
  showMainPage();
}

function gototool() {
  window.location.href = '../tool/tool.html';
}

function gotoinfo() {
  window.location.href = '../info/info.html';
}

function gotomine() {
  window.location.href = '../mine/mine.html';
}
