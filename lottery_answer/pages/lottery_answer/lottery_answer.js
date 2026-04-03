Page({

  data: {
    sign:"",
    img:"",
    image:"",
    height:"",
    width:"",
    imgload:true,
    preimg:false,
  },

  onLoad(options) {
    console.log("抽到的签是"+options.sign)
    this.setData({
      img:"../../image/签文/签"+options.sign+".jpg"
    })
    var image = this.data.img
    wx.getImageInfo({
      src: image,
      complete:(res)=>{
        let imgheight = res.height
        let imgwidth = res.width
        this.setData({
          height:imgheight,
          width:imgwidth
        })
        this.setData({
          image:image
        })
      }
    })
  },
  imgload:function(){
    this.setData({
      preimg:true,
      imgload:false,
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

  }
})