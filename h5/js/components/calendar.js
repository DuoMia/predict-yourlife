(function () {
  function CalendarComponent(container, options) {
    this.container = container;
    this.options = options || {};
    this.currentYear = null;
    this.currentMonth = null;
    this.selectedDate = null;
    this.init();
  }

  CalendarComponent.prototype.init = function () {
    this.bindEvents();
    this.today();
  };

  CalendarComponent.prototype.renderCalendar = function () {
    var year = this.currentYear;
    var month = this.currentMonth;
    var html = '';

    html += '<div class="calendar">';

    html += '<div class="calendar-title">';
    html += '<div class="calendar-title-left">';
    html += '<span class="ctrl item" data-action="prevMonth">◀</span>';
    html += '<span class="item title-item">' + year + '年' + month + '月</span>';
    html += '<span class="ctrl item" data-action="nextMonth">▶</span>';
    html += '</div>';
    html += '<span class="today-btn" data-action="today">回到今天</span>';
    html += '</div>';

    html += '<div class="calendar-week">';
    var weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    for (var w = 0; w < weeks.length; w++) {
      html += '<span class="item">' + weeks[w] + '</span>';
    }
    html += '</div>';

    html += '<div class="calendar-container">';
    var days = this.createDays(year, month);

    for (var i = 0; i < days.length; i++) {
      var d = days[i];
      var grayClass = d.gray ? ' gray' : '';
      var selectClass = '';
      if (this.selectedDate && this.selectedDate.year === d.year && this.selectedDate.month === d.month && this.selectedDate.day === d.day) {
        selectClass = ' select';
      }
      html += '<div class="grid' + grayClass + '" data-year="' + d.year + '" data-month="' + d.month + '" data-day="' + d.day + '">';
      html += '<div class="wrap' + selectClass + '" data-action="selectDate">';
      html += d.day;
      html += '<div class="lunar-day">' + d.lunar + '</div>';
      html += '</div>';
      html += '</div>';
    }

    html += '</div>';
    html += '</div>';

    this.container.innerHTML = html;
  };

  CalendarComponent.prototype.bindEvents = function () {
    var self = this;
    this.container.addEventListener('click', function (e) {
      var target = e.target;
      while (target && target !== self.container) {
        var action = target.getAttribute('data-action');
        if (action) {
          switch (action) {
            case 'prevMonth':
              self.lastMonth();
              break;
            case 'nextMonth':
              self.nextMonth();
              break;
            case 'today':
              self.today();
              break;
            case 'selectDate':
              var grid = target.parentElement;
              var clickYear = parseInt(grid.getAttribute('data-year'), 10);
              var clickMonth = parseInt(grid.getAttribute('data-month'), 10);
              var clickDay = parseInt(grid.getAttribute('data-day'), 10);
              self.display(clickYear, clickMonth, clickDay);
              break;
          }
          return;
        }
        target = target.parentElement;
      }
    });
  };

  CalendarComponent.prototype.display = function (year, month, date) {
    this.currentYear = year;
    this.currentMonth = month;
    if (date) {
      this.selectedDate = { year: year, month: month, day: date };
    } else {
      this.selectedDate = null;
    }
    this.renderCalendar();
    if (date && typeof this.options.onDateSelect === 'function') {
      var lunarInfo = null;
      try {
        lunarInfo = LunarCalc({ year: year, month: month, day: date });
      } catch (e) {
        lunarInfo = null;
      }
      var solar = year + '年' + month + '月' + date + '日';
      var lunar = '';
      if (lunarInfo) {
        lunar = lunarInfo.lunarYear + '年 ' + lunarInfo.monthC + lunarInfo.dayC;
      }
      this.options.onDateSelect({ solar: solar, lunar: lunar });
    }
  };

  CalendarComponent.prototype.today = function () {
    var now = new Date();
    this.display(now.getFullYear(), now.getMonth() + 1, now.getDate());
  };

  CalendarComponent.prototype.select = function (date) {
    this.display(this.currentYear, this.currentMonth, date);
  };

  CalendarComponent.prototype.lastMonth = function () {
    var year = this.currentYear;
    var month = this.currentMonth - 1;
    if (month < 1) {
      month = 12;
      year--;
    }
    this.display(year, month);
  };

  CalendarComponent.prototype.nextMonth = function () {
    var year = this.currentYear;
    var month = this.currentMonth + 1;
    if (month > 12) {
      month = 1;
      year++;
    }
    this.display(year, month);
  };

  CalendarComponent.prototype.getThisMonthDays = function (year, month) {
    return new Date(year, month, 0).getDate();
  };

  CalendarComponent.prototype.createDays = function (year, month) {
    var days = [];
    var daysInMonth = this.getThisMonthDays(year, month);
    var firstDayOfWeek = new Date(year, month - 1, 1).getDay();

    var prevMonth = month === 1 ? 12 : month - 1;
    var prevYear = month === 1 ? year - 1 : year;
    var prevMonthDays = this.getThisMonthDays(prevYear, prevMonth);

    for (var i = firstDayOfWeek - 1; i >= 0; i--) {
      var day = prevMonthDays - i;
      var lunar = '';
      try {
        lunar = LunarCalc({ year: prevYear, month: prevMonth, day: day }).dayC;
      } catch (e) {}
      days.push({ day: day, lunar: lunar, gray: true, year: prevYear, month: prevMonth });
    }

    for (var j = 1; j <= daysInMonth; j++) {
      var lunarDay = '';
      try {
        lunarDay = LunarCalc({ year: year, month: month, day: j }).dayC;
      } catch (e) {}
      days.push({ day: j, lunar: lunarDay, gray: false, year: year, month: month });
    }

    var totalCells = days.length;
    var rows = Math.ceil(totalCells / 7);
    var remaining = rows * 7 - totalCells;

    var nextMonth = month === 12 ? 1 : month + 1;
    var nextYear = month === 12 ? year + 1 : year;

    for (var k = 1; k <= remaining; k++) {
      var lunarNext = '';
      try {
        lunarNext = LunarCalc({ year: nextYear, month: nextMonth, day: k }).dayC;
      } catch (e) {}
      days.push({ day: k, lunar: lunarNext, gray: true, year: nextYear, month: nextMonth });
    }

    return days;
  };

  CalendarComponent.prototype.createEmptyGrids = function (year, month) {
    var firstDayOfWeek = new Date(year, month - 1, 1).getDay();
    var daysInMonth = this.getThisMonthDays(year, month);
    var totalCells = firstDayOfWeek + daysInMonth;
    var rows = Math.ceil(totalCells / 7);
    var afterEmpty = rows * 7 - totalCells;
    return { before: firstDayOfWeek, after: afterEmpty };
  };

  window.CalendarComponent = CalendarComponent;
})();
