(function () {
  var USER_KEY = 'predict_user_info';

  var res_info = {
    '空亡': ['出行不利，宜守不宜攻，等待时机', '病情反复，需耐心调养，不宜急躁', '失物难寻，可能已遗失，不必过分执着', '不宜修造，等待吉日再动工'],
    '大安': ['出行平安，一路顺风，贵人相助', '病情好转，安心休养，即将康复', '失物可寻，在东方附近，仔细寻找', '宜修造，吉日良辰，万事如意'],
    '留连': ['出行受阻，拖延不前，需耐心等待', '病情缠绵，难以速愈，需长期调养', '失物南方去，急寻方可得', '修造迟缓，不宜急进，顺其自然'],
    '速喜': ['出行有喜，南方有利，喜事临门', '病情速愈，即将好转，不必担忧', '失物申未午时寻，有人知晓下落', '修造吉利，速速动工，必有喜庆'],
    '赤口': ['出行不利，口舌是非，宜守不宜动', '病情凶险，需防恶化，多方求医', '失物急寻，恐有纷争，小心口舌', '修造不利，恐有口舌，暂缓动工'],
    '小吉': ['出行吉利，路上顺遂，和合如意', '病情渐愈，祈求上苍，终将康复', '失物在坤方，阴人来报信', '修造和合，凡事顺遂，吉利之兆']
  };

  var Storage = {
    getUserInfo: function () {
      var data = localStorage.getItem(USER_KEY);
      if (!data) {
        var defaultInfo = { status: 0, datetime: null, lottery: 0 };
        localStorage.setItem(USER_KEY, JSON.stringify(defaultInfo));
        return defaultInfo;
      }
      return JSON.parse(data);
    },

    updateUserInfo: function (data) {
      var info = this.getUserInfo();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          info[key] = data[key];
        }
      }
      localStorage.setItem(USER_KEY, JSON.stringify(info));
      return info;
    },

    getOnlineStatus: function () {
      return true;
    },

    getResInfo: function (resp, typeIndex) {
      var items = res_info[resp];
      if (!items) return '';
      var idx = parseInt(typeIndex, 10);
      if (isNaN(idx) || idx < 0 || idx >= items.length) return '';
      return items[idx];
    },

    init: function () {
      this.getUserInfo();
    }
  };

  window.Storage = Storage;
})();
