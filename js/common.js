// H5 公共工具库

// Toast 提示
function showToast(msg, duration) {
  duration = duration || 2000;
  var toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.7);color:#fff;padding:10px 20px;border-radius:4px;z-index:9999;font-size:14px;pointer-events:none;transition:opacity 0.3s;';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(function() {
    toast.style.opacity = '0';
  }, duration);
}

// URL 参数
function getUrlParam(key) {
  var params = new URLSearchParams(window.location.search);
  return params.get(key);
}

// 测算结果数据（替代云数据库）
var resultData = {
  '空亡': {
    info: '音信稀时，五行属土，颜色黄色，方位中央;临勾陈。谋事主三、六、九。有不吉、无结果、忧虑之含义。诀曰:空亡事不祥，阴人多乖张。求财无利益，行人有灾殃。失物寻不见，官事有刑伤。病人逢暗鬼，析解可安康。',
    details: ['出行不利，易遇阻碍，建议改日出行', '病情反复，需多加调养，注意休息', '失物难寻，可能已被人拾走', '不宜动土修造，诸事不顺']
  },
  '大安': {
    info: '身不动时，五行属木，颜色青色，方位东方。临青龙，谋事主一、五、七。有静止、心安。吉祥之含义。诀曰:大安事事昌，求谋在东方，失物去不远，宅舍保安康。行人身未动，病者主无妨。将军回田野，仔细好推详。',
    details: ['出行大吉，东方最宜，可获财运', '身体无碍，心情舒畅，适合养生', '失物在近处，仔细寻找可得', '宜修造动土，大吉大利']
  },
  '留连': {
    info: '人未归时，五行属水，颜色黑色，方位北方，临玄武，凡谋事主二、八、十。有喑味不明，延迟。纠缠.拖延、漫长之含义。诀曰:留连事难成，求谋日未明。官事只宜缓，去者来回程，失物南方去，急寻方心明。更需防口舌，人事且平平。',
    details: ['出行有阻，可能延误，需耐心等待', '病情缠绵，需坚持治疗', '失物在南方，需费时寻找', '修造宜缓，不宜急躁']
  },
  '速喜': {
    info: '人即至时，五行属火，颜色红色方位南方，临朱雀，谋事主三，六，九。有快速、喜庆，吉利之含义。指时机已到。诀曰:速喜喜来临，求财向南行。失物申未午，逢人要打听。官事有福德，病者无须恐。田宅六畜吉，行人音信明。',
    details: ['出行速吉，南方大利，有喜事临门', '病情好转，即将康复', '失物速寻可得，有人归还', '修造吉利，速战速决']
  },
  '赤口': {
    info: '官事凶时，五行属金，颜色白色，方位西方，临白虎，谋事主四、七，十。有不吉、惊恐，凶险、口舌是非之含义。诀曰:赤口主口舌，官非切要防。失物急去寻，行人有惊慌。鸡犬多作怪，病者出西方。更须防咀咒，恐怕染瘟殃。',
    details: ['出行不利，易生是非，宜避西方', '病情较重，需多加小心', '失物难寻，需防被盗', '不宜修造，恐有意外']
  },
  '小吉': {
    info: '人来喜时，五行属木，临六合，凡谋事主一、五、七有和合、吉利之含义。诀曰:小吉最吉昌，路上好商量。阴人来报喜，失物在坤方。行人立便至，交易甚是强，凡事皆和合，病者祈上苍。',
    details: ['出行吉利，有贵人相助', '病情好转，心情愉快', '失物可寻，有人相助', '修造顺利，万事如意']
  }
};

var typeNames = ['出行求财', '疾病康愈', '失物寻找', '吊宫修造'];

function getDetailInfo(resultName, typeIndex) {
  if (resultData[resultName] && resultData[resultName].details[typeIndex] !== undefined) {
    return resultData[resultName].details[typeIndex];
  }
  return '';
}

// 实时流量统计（累计总流量）
(function() {
  var trafficEl = null;
  var currentPageSize = 0;
  var lastRecordedSize = 0;
  var STORAGE_KEY = 'total_traffic';
  
  function formatSize(bytes) {
    if (bytes > 1024 * 1024) {
      return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    } else if (bytes > 1024) {
      return (bytes / 1024).toFixed(2) + ' KB';
    } else {
      return bytes + ' B';
    }
  }
  
  function getTotalTraffic() {
    var stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  }
  
  function setTotalTraffic(bytes) {
    localStorage.setItem(STORAGE_KEY, bytes.toString());
  }
  
  function getCurrentPageSize() {
    var size = 0;
    if (window.performance && performance.getEntriesByType) {
      var resources = performance.getEntriesByType('resource');
      resources.forEach(function(resource) {
        if (resource.transferSize) {
          size += resource.transferSize;
        } else if (resource.encodedBodySize) {
          size += resource.encodedBodySize;
        }
      });
    }
    return size;
  }
  
  function updateTraffic() {
    currentPageSize = getCurrentPageSize();
    var total = getTotalTraffic();
    
    // 累加新增的流量（当前页面加载完成后才累加）
    if (currentPageSize > lastRecordedSize) {
      var newBytes = currentPageSize - lastRecordedSize;
      total += newBytes;
      setTotalTraffic(total);
      lastRecordedSize = currentPageSize;
    }
    
    if (trafficEl) {
      trafficEl.textContent = '总流量: ' + formatSize(total);
    }
  }
  
  function createTrafficElement() {
    if (!document.getElementById('traffic-stats')) {
      trafficEl = document.createElement('div');
      trafficEl.id = 'traffic-stats';
      trafficEl.textContent = '总流量: 计算中...';
      document.body.appendChild(trafficEl);
    } else {
      trafficEl = document.getElementById('traffic-stats');
    }
  }
  
  // DOM加载完成后创建元素
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      createTrafficElement();
      updateTraffic();
    });
  } else {
    createTrafficElement();
    updateTraffic();
  }
  
  // 实时更新（每500ms）
  setInterval(updateTraffic, 500);
  
  // 页面完全加载后更新
  window.addEventListener('load', function() {
    setTimeout(updateTraffic, 100);
  });
})();
