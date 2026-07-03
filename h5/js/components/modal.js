(function () {
  function ModalComponent(container, options) {
    this.container = container;
    this.options = options || {};
    this.wrapper = null;
  }

  ModalComponent.prototype.show = function (content) {
    this.hide();

    this.wrapper = document.createElement('div');

    var html = '<div class="modal-mask"></div>';

    if (this.options.type === 'select') {
      html += '<div class="modal-dialog">';
      html += '<div class="modal-title">' + (this.options.title || '请选择你想测算的方向') + '</div>';
      html += '<div class="modal-content">';
      var opts = this.options.options || ['出行求财', '疾病康愈', '失物寻找', '吊宫修造'];
      for (var i = 0; i < opts.length; i++) {
        html += '<div class="option" data-index="' + i + '">' + opts[i] + '</div>';
      }
      html += '</div>';
      html += '</div>';
    } else {
      html += '<div class="modal-dialog">';
      html += '<div class="modal-title">' + (this.options.title || '') + '</div>';
      html += '<div class="modal-content">' + (content || '') + '</div>';
      html += '<div style="margin-top:15px;text-align:center">';
      html += '<button class="confirm-btn" style="padding:8px 30px;background:#09bb07;color:#fff;border:none;border-radius:4px;font-size:0.3rem">确定</button>';
      if (this.options.onCancel) {
        html += '<button class="cancel-btn" style="padding:8px 30px;background:#f5f5f5;color:#333;border:none;border-radius:4px;font-size:0.3rem;margin-left:10px">取消</button>';
      }
      html += '</div>';
      html += '</div>';
    }

    this.wrapper.innerHTML = html;
    this.container.appendChild(this.wrapper);

    this.bindEvents();
  };

  ModalComponent.prototype.bindEvents = function () {
    var self = this;
    var mask = this.wrapper.querySelector('.modal-mask');
    if (mask) {
      mask.addEventListener('click', function () {
        self.hide();
      });
    }

    if (this.options.type === 'select') {
      var options = this.wrapper.querySelectorAll('.option');
      for (var i = 0; i < options.length; i++) {
        (function (el) {
          el.addEventListener('click', function () {
            var index = parseInt(el.getAttribute('data-index'), 10);
            if (typeof self.options.onSelect === 'function') {
              self.options.onSelect(index);
            }
            self.hide();
          });
        })(options[i]);
      }
    } else {
      var confirmBtn = this.wrapper.querySelector('.confirm-btn');
      if (confirmBtn) {
        confirmBtn.addEventListener('click', function () {
          if (typeof self.options.onConfirm === 'function') {
            self.options.onConfirm();
          }
          self.hide();
        });
      }

      var cancelBtn = this.wrapper.querySelector('.cancel-btn');
      if (cancelBtn) {
        cancelBtn.addEventListener('click', function () {
          if (typeof self.options.onCancel === 'function') {
            self.options.onCancel();
          }
          self.hide();
        });
      }
    }
  };

  ModalComponent.prototype.hide = function () {
    if (this.wrapper && this.wrapper.parentNode) {
      this.wrapper.parentNode.removeChild(this.wrapper);
    }
    this.wrapper = null;
  };

  window.ModalComponent = ModalComponent;
})();
