Page({

  data: {
    current: 0,
    imgload:true,
    imgnoload:false,
  },

  onLoad() {
  },
  imgload:function(){
    this.setData({
      imgload:false,
      imgnoload:true
    })
  },
  onReady() {
    this.load()
  },
  load: function() {
    var n = 1;
    var timer = setInterval(()=>{
      if(n == 10) {
        clearInterval(timer);
      }
      this.setData({
        current: this.data.current+1
      });
      if(this.data.current > 3)
        this.setData({
          current: 0
        });
        n++;
    }, 400);
  },
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
  goto1(){
    wx.navigateTo({
      url: '../../datetime/pages/datetime/datetime',
    })
  },
  goto2(){
    wx.navigateTo({
      url: '../../random/pages/random/random',
    })
  }
})
