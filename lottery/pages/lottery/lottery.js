Page({

  data: {
    signList: [
      1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100
    ],
    sign: "",
    isShow:true,
    current: 0,
    imgload:true,
    imgnoload:false,
    title:"",
    btnhide:true,
    btnhide2:false,
    btnhide3:true,
    imghide:true,
    imghide2:false,
    imghide3:false,
    images: [
      '../../image/圣杯.png',
      '../../image/圣杯.png',
      '../../image/圣杯.png',
      '../../image/圣杯.png',
      '../../image/笑杯.png',
      '../../image/圣杯.png',
      '../../image/圣杯.png',
      '../../image/圣杯.png'
    ],
    image1: '',
    image2: '',
    image3: '',
    count: 0,
    buttonhide:false,
    color:"rgb(124, 11, 11)",
    texthide:true,
    texthide2:true,
    resopen:true
  },

  onLoad: function () {
    this.setData({
      imghide3:false
    })
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

  shake: function (res) {
    if (res.x > 1.5 || res.y > 1.5 || res.z > 1.5) {
      this.draw()
    }
  },

  timechange:function(){
    this.setData({
      isShow:true
    })
    this.timer && clearInterval(this.timer)
    var index = Math.floor(Math.random() * this.data.signList.length)
    this.setData({
      sign: this.data.signList[index],
      imghide:false
    })
  },

  draw: function () {
    this.setData({
      isShow:false,
      imghide2:true,
      btnhide3:true,
      title:"",
      btnhide:true,
      image1:"",
      image2:"",
      image3:"",
      count:0,
      sign:"",
      imghide:true,
      texthide2:true,
      resopen:false
    })
    this.timer = setInterval(function(){
      this.timechange()
      this.setData({
        btnhide2:true,
        btnhide:false
      })
    }.bind(this),2000)
  },

  onButtonClick: function() {
    var randomIndex = Math.floor(Math.random() * this.data.images.length);
    var randomImage = this.data.images[randomIndex];
    if (randomImage.indexOf('圣杯.png') > -1) {
      this.setData({
        ['image' + (this.data.count + 1)]: randomImage,
        count: this.data.count + 1,
        title:"你掷出了一次圣杯，请再掷一次！"
      })
      if (this.data.count === 3) {
        this.setData({
          aCount: 0,
          title:"恭喜你,连续三次掷出了圣杯，请取灵签!",
          btnhide:true,
          btnhide3:false
        });
      }
    } else {
      this.setData({
        ['image' + (this.data.count + 1)]: randomImage,
        title:"你掷出了笑杯，此签不灵，请重新抽签",
        btnhide2:false,
        btnhide:true
      })
    }
  },

  getres:function(){
    this.setData({
      btnhide3:true,
      btnhide2:false,
      buttonhide:true,
      color:"grey",
      texthide:false,
      resopen:true,
      imghide3:true
    })
    var sign = this.data.sign
    wx.navigateTo({
      url: '../../../lottery_answer/pages/lottery_answer/lottery_answer?sign='+sign,
    })
  },

  gotores(){
    var sign = this.data.sign
    var resopen = this.data.resopen
    if(resopen == true){
      wx.navigateTo({
        url: '../../../lottery_answer/pages/lottery_answer/lottery_answer?sign='+sign,
      })
    }
  },

  restart(){
    wx.redirectTo({
      url: '../lottery/lottery',
    })
  }
})
