// lottery_answer/pages/lottery_answer/lottery_answer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sign:"",
    img:"",
    image:"",
    height:"",
    width:"",
    imgload:true,
    preimg:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.sign)
    if(options.sign=='1'){
      this.setData({
        img:"cloud://pipiyoyo-2ghga83b70065f85.7069-pipiyoyo-2ghga83b70065f85-1302175885/签文/签1.jpg"
      })
    }
    if(options.sign=='2'){
      this.setData({
        img:"cloud://pipiyoyo-2ghga83b70065f85.7069-pipiyoyo-2ghga83b70065f85-1302175885/签文/签2.jpg"
      })
    }
    if(options.sign=='3'){
      this.setData({
        img:"cloud://pipiyoyo-2ghga83b70065f85.7069-pipiyoyo-2ghga83b70065f85-1302175885/签文/签3.jpg"
      })
    }
    if(options.sign=='4'){
      this.setData({
        img:"cloud://pipiyoyo-2ghga83b70065f85.7069-pipiyoyo-2ghga83b70065f85-1302175885/签文/签4.jpg"
      })
    }
    if(options.sign=='5'){
      this.setData({
        img:"cloud://pipiyoyo-2ghga83b70065f85.7069-pipiyoyo-2ghga83b70065f85-1302175885/签文/签5.jpg"
      })
    }
    if(options.sign=='6'){
      this.setData({
        img:"cloud://pipiyoyo-2ghga83b70065f85.7069-pipiyoyo-2ghga83b70065f85-1302175885/签文/签6.jpg"
      })
    }
    if(options.sign=='7'){
      this.setData({
        img:"cloud://pipiyoyo-2ghga83b70065f85.7069-pipiyoyo-2ghga83b70065f85-1302175885/签文/签7.jpg"
      })
    }
    if(options.sign=='8'){
      this.setData({
        img:"cloud://pipiyoyo-2ghga83b70065f85.7069-pipiyoyo-2ghga83b70065f85-1302175885/签文/签8.jpg"
      })
    }
    if(options.sign=='9'){
      this.setData({
        img:"cloud://pipiyoyo-2ghga83b70065f85.7069-pipiyoyo-2ghga83b70065f85-1302175885/签文/签9.jpg"
      })
    }
    if(options.sign=='10'){
      this.setData({
        img:"cloud://pipiyoyo-2ghga83b70065f85.7069-pipiyoyo-2ghga83b70065f85-1302175885/签文/签10.jpg"
      })
    }
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