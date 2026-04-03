var sign = "";
var img = "";
var hasSwitched = false;

function getUrlParam(name) {
  var params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function showMainPage() {
  hasSwitched = true;
  document.getElementById('loading-container').style.display = 'none';
  document.getElementById('main-container').style.display = 'block';
}

function onImgLoad() {
  showMainPage();
}

document.addEventListener('DOMContentLoaded', function() {
  sign = getUrlParam('sign') || 1;
  img = '../../image/签文/签' + sign + '.jpg';
  document.getElementById('sign-image').src = img;
  
  // 3秒后自动显示
  setTimeout(function() {
    if (!hasSwitched) {
      showMainPage();
    }
  }, 3000);
});
