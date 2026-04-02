const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
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
    indexhidden:true,
    imghide:true,
    imghide2:false,
    imghide3:false,
    images: ['cloud://pipiyoyo-0ggyytqka90cf293.7069-pipiyoyo-0ggyytqka90cf293-1302175885/小程序图片素材/圣杯.png', 'cloud://pipiyoyo-0ggyytqka90cf293.7069-pipiyoyo-0ggyytqka90cf293-1302175885/小程序图片素材/圣杯.png','cloud://pipiyoyo-0ggyytqka90cf293.7069-pipiyoyo-0ggyytqka90cf293-1302175885/小程序图片素材/圣杯.png', 'cloud://pipiyoyo-0ggyytqka90cf293.7069-pipiyoyo-0ggyytqka90cf293-1302175885/小程序图片素材/圣杯.png', 'cloud://pipiyoyo-0ggyytqka90cf293.7069-pipiyoyo-0ggyytqka90cf293-1302175885/小程序图片素材/笑杯.png','cloud://pipiyoyo-0ggyytqka90cf293.7069-pipiyoyo-0ggyytqka90cf293-1302175885/小程序图片素材/圣杯.png','cloud://pipiyoyo-0ggyytqka90cf293.7069-pipiyoyo-0ggyytqka90cf293-1302175885/小程序图片素材/圣杯.png','cloud://pipiyoyo-0ggyytqka90cf293.7069-pipiyoyo-0ggyytqka90cf293-1302175885/小程序图片素材/圣杯.png'],
    image1: '',
    image2: '',
    image3: '',
    count: 0, // 计数器，记录页面中出现的图片a数量,
    buttonhide:false,
    color:"rgb(124, 11, 11)",
    texthide:true,
    texthide2:true,
    resopen:true
  },
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
          url: '../../../pages/test/test',
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    this.isonline()
    this.setData({
      imghide3:false
    })
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
    db.collection("user_info").where({
      _openid:openid   //进行筛选
    }).get().then(res=>{
      if(res.data[0].status==1){
        this.setData({
          buttonhide:true,
          color:"grey",
          texthide:false,
          imghide:false,
          imghide2:true,
          sign:res.data[0].lottery
        })
      }
      if(res.data[0].lottery != 0){
        this.setData({
          imghide:false,
          imghide2:true,
          sign:res.data[0].lottery
        })
      }
    })
    db.collection("user_info").where({
      _openid:openid   //进行筛选
    }).get().then(res=>{
      console.log("抽签状态："+res.data[0].status)
      console.log("抽签时间"+res.data[0].datetime.getDate())
      console.log("本地时间"+new Date().getDate())
      if(res.data[0].datetime.getFullYear() < new Date().getFullYear()){
        console.log("判断年份")
        db.collection("user_info").where({
          _openid:openid   //进行筛选
        }).update({
          data:{
            status:0,
            datetime:db.serverDate()
          }
        }).then(res=>{
          this.setData({
            buttonhide:false,
            color:"rgb(124, 11, 11)",
            texthide:true,
            texthide2:false
          })
        })
      }else{
        if(res.data[0].datetime.getMonth()+1 < new Date().getMonth()+1){
          console.log("判断月份")
          db.collection("user_info").where({
            _openid:openid   //进行筛选
          }).update({
            data:{
              status:0,
              datetime:db.serverDate()
            }
          }).then(res=>{
            this.setData({
              buttonhide:false,
              color:"rgb(124, 11, 11)",
              texthide:true,
              texthide2:false
            })
          })
        }else{
          if(res.data[0].datetime.getDate() < new Date().getDate()){
            console.log("判断日期")
            db.collection("user_info").where({
              _openid:openid   //进行筛选
            }).update({
              data:{
                status:0,
                datetime:db.serverDate()
              }
            }).then(res=>{
              this.setData({
                buttonhide:false,
                color:"rgb(124, 11, 11)",
                texthide:true,
                texthide2:false
              })
            })
          }
        }
      }
    })
  },
  imgload:function(){
    var openid = this.openid
    db.collection("user_info").where({
      _openid:openid   //进行筛选
    }).get().then(res=>{
      if(res.data[0].status==0){
        this.setData({
          buttonhide:false,
          color:"rgb(124, 11, 11)",
          texthide:true
        })
        if(res.data[0].lottery != 0){
          this.setData({
            texthide2:false
          })
        }
      }
    })
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
    // 随机生成a和b两个字母中的一个
    var randomIndex = Math.floor(Math.random() * this.data.images.length);
    var randomImage = this.data.images[randomIndex];
    if (randomImage.indexOf('cloud://pipiyoyo-0ggyytqka90cf293.7069-pipiyoyo-0ggyytqka90cf293-1302175885/小程序图片素材/圣杯.png', 'cloud://pipiyoyo-0ggyytqka90cf293.7069-pipiyoyo-0ggyytqka90cf293-1302175885/小程序图片素材/圣杯.png') > -1) {
      // 如果选中的是图片a
      this.setData({
        ['image' + (this.data.count + 1)]: randomImage,
        count: this.data.count + 1,
        title:"你掷出了一次圣杯，请再掷一次！"
      })
      if (this.data.count === 3) {
        // 如果a的数量为3，禁用按钮
        this.setData({
          aCount: 0,
          title:"恭喜你,连续三次掷出了圣杯，请取灵签!",
          btnhide:true,
          btnhide3:false
        });
      }
    } else {
      // 如果展示的字母是b，清空text文本框中的内容，并将aCount重置为0
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
    var openid = this.openid
    var sign = parseInt(this.data.sign)
    db.collection("user_info").where({
      _openid:openid   //进行筛选
    }).update({
      data:{
        status:1,
        datetime:db.serverDate(),
        lottery:sign
      }
    })
    var sign = this.data.sign
    wx.navigateTo({
      url: '../../../lottery_answer/pages/lottery_answer/lottery_answer?sign='+sign,
    })
  },
  gotores(){
    var openid = this.openid
    var sign = this.data.sign
    var resopen = this.data.resopen
    db.collection("user_info").where({
      _openid:openid   //进行筛选
    }).get().then(res=>{
      if(resopen == true){
        wx.navigateTo({
          url: '../../../lottery_answer/pages/lottery_answer/lottery_answer?sign='+sign,
        })
      }
    })
  },
  restart(){
    const db = wx.cloud.database()
    var openid = this.openid
    db.collection("user_info").where({
      _openid:openid   //进行筛选
    }).update({
      data:{
        status:0,
        datetime:db.serverDate()
      }
    }).then(res=>{
      wx.redirectTo({
        url: '../lottery/lottery',
      })
    })
  }
})