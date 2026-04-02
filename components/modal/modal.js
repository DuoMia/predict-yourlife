Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showModal: { // 控制弹窗显示隐藏
      type: Boolean,
      value: false
    },
    title: { // 弹窗标题
      type: String,
      value: '请选择你想测算的方向'
    },
    options: { // 选项
      type: Array,
      value: ['出行求财', '疾病康愈', '失物寻找','吊宫修造']
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭弹窗
    closeModal() {
      this.triggerEvent('closeModal')
    },
    // 选择选项
    selectOption(e) {
      const index = e.currentTarget.dataset.index // 获取选项的下标
      this.triggerEvent('selectOption', index) // 触发selectOption事件，将选中的选项的下标传递出去
    }
  }
})