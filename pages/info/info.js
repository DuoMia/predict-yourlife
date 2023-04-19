// pages/game/game.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgload:true,
    preimg:false,
    indexhidden:true
  },
  imgload:function(){
    this.setData({
      preimg:true,
      imgload:false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    db.collection("online").get().then(res=>{
      if(res.data[0].status==false){
        wx.redirectTo({
          url: '../test/test',
        })
      }else{
        this.setData({
          indexhidden:false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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
  goto1(){
    wx.navigateTo({
      url: '../../lottery/pages/lottery/lottery',
    })
  }
})