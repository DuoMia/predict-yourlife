Page({

  data: {
    imgload:true,
    preimg:false,
  },
  imgload:function(){
    this.setData({
      preimg:true,
      imgload:false,
    })
  },
  onLoad(options) {
  },
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
  goto1(){
    wx.navigateTo({
      url: '../../lottery/pages/lottery/lottery',
    })
  }
})
