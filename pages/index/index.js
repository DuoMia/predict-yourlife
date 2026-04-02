// pages/index/index.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    imgload:true,
    imgnoload:false,
    indexhidden:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  isonline(){
    if(app.globalData.online=="no"){
      setTimeout(()=>{
        this.isonline()
        },50)
    }else{
      if(app.globalData.online==true){
        this.setData({
          indexhidden:false
        })
      }else{
        wx.redirectTo({
          url: '../test/test',
        })
      }
    }
  },
  onLoad: async function () {
    this.isonline()
    this.openid = await getApp().getOpenid()
    var openid = this.openid
    db.collection("user_info").where({
      _openid:openid   //进行筛选
    }).get().then(res=>{
      if(res.data.length==0){
        console.log("添加用户")
        db.collection("user_info").add({
          data:{
            status:0,
            datetime:db.serverDate(),
            lottery:0
          }
        })
      }
      else{
        console.log("已有该用户")
      }
    })
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