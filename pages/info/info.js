var current = 0;
var hasSwitched = false;

document.addEventListener('DOMContentLoaded', function() {
  load();
  // 3秒后自动切换到主页面
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
  document.getElementById('info-container').style.display = 'block';
}

function onImgLoad() {
  showMainPage();
}

function goto1() {
  window.location.href = '../../lottery/pages/lottery/lottery.html';
}
