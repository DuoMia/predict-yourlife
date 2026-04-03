// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    imgload:true,
    imgnoload:false,
  },
  onLoad: function () {
  },
  imgload:function(){
      this.setData({
        imgload:false,
        imgnoload:true
      })
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  gototool(){
    wx.navigateTo({
      url: '../tool/tool',
    })
  },
  gotoinfo(){
    wx.navigateTo({
      url: '../info/info',
    })
  },
  gotomine(){
    wx.navigateTo({
      url: '../mine/mine',
    })
  }
})