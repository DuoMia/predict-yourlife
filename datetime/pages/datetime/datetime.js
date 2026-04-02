const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hours: "",
    hourIndex: "",
    hournum:"no",
    color:"124, 11, 11",
    ishidden:true,
    ishiddendate:true,
    ishiddentime:true,
    ishiddentimedate:true,
    hiddeninfo:true,
    numlist:[],
    resp:"",
    alltime:"",
    timedate:"no",
    info:"点击选择你想测算的日期",
    timeinfo:"点击选择你想测算的时辰",
    resp_title:"点击展开",
    animationData: {},
    rotatenum:0,
    respinfo:"",
    resp_info:"",
    resp_type:"",
    ishiddenres:true,
    buttonhide:false,
    indexhidden:true,
    showimg:true,
    select:true,
    left:"",
    top:"",
    rotate:"",
    showModal: false, // 控制弹窗显示隐藏
    selectedOptionIndex: -1 // 选中的选项的下标
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
  datemodal:function(){
    this.setData({
      ishidden:false
    })
  },
  timemodal:function(){
    this.setData({
      ishiddentime:false,
      hours:['子时（23点整至1点整）', '丑时（1点整至3点整）', '寅时（3点整至5点整）', '卯时（5点整至7点整）', '辰时（7点整至9点整）', '巳时（9点整至11点整）', '午时（11点整至13点整）', '未时（13点整至15点整）', '申时（15点整至17点整）', '酉时（17点整至19点整）', '戌时（19点整至21点整）', '亥时（21点整至23点整）'],
      hourIndex:0
    })
  },
  onmodal:function(e){
    var alltime = this.data.alltime
    this.setData({
      timedate:alltime,
      ishiddendate:false,
      ishidden:true
    })
    var timedate = this.data.timedate
    this.setData({
      info:"你选择的阴历日期是:"+timedate.lunar+"\n("+"阳历为"+timedate.solar+")"
    })
  },
  openmodal:function(){
    this.setData({
      ishiddentime:true,
      ishiddentimedate:false,
      hournum:this.data.hourIndex
    })
    var hours = this.data.hours
    var hourIndex = this.data.hourIndex
    this.setData({
      timeinfo:"你选择的时辰是"+hours[hourIndex]
    })
  },
  offmodal:function(){
    this.setData({
      ishidden:true
    })
  },
  cancelmodal:function(){
    this.setData({
      ishiddentime:true
    })
  },
  onHourChange: function (e) {
    this.setData({ hourIndex: e.detail.value });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.isonline()
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
  solarAndLunar(e){
    this.setData({
      alltime:e.detail
    })
  },
  resonmodal:function(){
    this.setData({
      ishiddenres:true,
      buttonhide:false,
      color:"124, 11, 11"
    })
  },
goto2:function(){
  wx.redirectTo({
    url: '../../../random/pages/random/random',
  })
},
touchmove:function(){
  return
},
chooseModal() {
  var timedate = this.data.timedate
  var hournum = this.data.hournum
  if(timedate == "no"){
    wx.showToast({
      title: '请选择日期哦~',
      icon:'none'
    })
    return
  }
  if(hournum == "no"){
    wx.showToast({
      title: '请选择时辰哦~',
      icon:'none'
    })
    return
  }
  this.setData({
    showModal: true
  })
},
// 关闭弹窗
closeModal() {
  this.setData({
    showModal: false
  })
},
// 选择选项
selectOption(e) {
  const index = e.detail // 获取选中的选项的下标
  if(index==0){
    this.setData({
      resp_type:"出行求财"
    })
  }
  if(index==1){
    this.setData({
      resp_type:"疾病康愈"
    })
  }
  if(index==2){
    this.setData({
      resp_type:"失物寻找"
    })
  }
  if(index==3){
    this.setData({
      resp_type:"吊宫修造"
    })
  }
  this.setData({
    selectedOptionIndex: index, // 保存选中的选项的下标
    showModal: false, // 关闭弹窗
    buttonhide:true,
    color:"grey",
    select:true
  })
  this.setData({
    numlist:[]
  })
  var rotateDegree = 0
  // 计算旋转时间，假设旋转速度为1秒/圈
  var rotateTime = Math.abs(rotateDegree) / 360 * 1 * 1000 
  // 创建动画并应用于图片元素
  var animation = wx.createAnimation({
    duration: rotateTime,
    timingFunction: 'linear'
  })
  animation.rotate(rotateDegree).step()
  this.setData({
    animationData: animation.export()
  })
  var datetime = (this.data.timedate.lunar).replace("月",",")
    datetime = datetime.replace("闰","")
    datetime = datetime.replace("初","")
    datetime = datetime.replace("廿","二十")
    datetime = datetime.replace(" ",",")
    datetime = datetime.split(",")
    console.log("日期是"+datetime)
    for(var i in datetime){
      if (datetime[i] == "一"){
        this.data.numlist.push("1")
      }
      if (datetime[i] == "二"){
        this.data.numlist.push("2")
      }
      if (datetime[i] == "三"){
        this.data.numlist.push("3")
      }
      if (datetime[i] == "四"){
        this.data.numlist.push("4")
      }
      if (datetime[i] == "五"){
        this.data.numlist.push("5")
      }
      if (datetime[i] == "六"){
        this.data.numlist.push("6")
      }
      if (datetime[i] == "七"){
        this.data.numlist.push("7")
      }
      if (datetime[i] == "八"){
        this.data.numlist.push("8")
      }
      if (datetime[i] == "九"){
        this.data.numlist.push("9")
      }
      if (datetime[i] == "十"){
        this.data.numlist.push("10")
      }
      if (datetime[i] == "十一"){
        this.data.numlist.push("11")
      }
      if (datetime[i] == "十二"){
        this.data.numlist.push("12")
      }
      if (datetime[i] == "十三"){
        this.data.numlist.push("13")
      }
      if (datetime[i] == "十四"){
        this.data.numlist.push("14")
      }
      if (datetime[i] == "十五"){
        this.data.numlist.push("15")
      }
      if (datetime[i] == "十六"){
        this.data.numlist.push("16")
      }
      if (datetime[i] == "十七"){
        this.data.numlist.push("17")
      }
      if (datetime[i] == "十八"){
        this.data.numlist.push("18")
      }
      if (datetime[i] == "十九"){
        this.data.numlist.push("19")
      }
      if (datetime[i] == "二十"){
        this.data.numlist.push("20")
      }
      if (datetime[i] == "二十一"){
        this.data.numlist.push("21")
      }
      if (datetime[i] == "二十二"){
        this.data.numlist.push("22")
      }
      if (datetime[i] == "二十三"){
        this.data.numlist.push("23")
      }
      if (datetime[i] == "二十四"){
        this.data.numlist.push("24")
      }
      if (datetime[i] == "二十五"){
        this.data.numlist.push("25")
      }
      if (datetime[i] == "二十六"){
        this.data.numlist.push("26")
      }
      if (datetime[i] == "二十七"){
        this.data.numlist.push("27")
      }
      if (datetime[i] == "二十八"){
        this.data.numlist.push("28")
      }
      if (datetime[i] == "二十九"){
        this.data.numlist.push("29")
      }
      if (datetime[i] == "三十"){
        this.data.numlist.push("30")
      }
    }
    var hours = this.data.hours
    var hournum = this.data.hournum
    var time = hours[hournum].charAt(0)
    console.log("时辰是"+time)
    if(time == "子"){
      this.data.numlist.push("1")
    }
    if(time == "丑"){
      this.data.numlist.push("2")
    }
    if(time == "寅"){
      this.data.numlist.push("3")
    }
    if(time == "卯"){
      this.data.numlist.push("4")
    }
    if(time == "辰"){
      this.data.numlist.push("5")
    }
    if(time == "巳"){
      this.data.numlist.push("6")
    }
    if(time == "午"){
      this.data.numlist.push("7")
    }
    if(time == "未"){
      this.data.numlist.push("8")
    }
    if(time == "申"){
      this.data.numlist.push("9")
    }
    if(time == "酉"){
      this.data.numlist.push("10")
    }
    if(time == "戌"){
      this.data.numlist.push("11")
    }
    if(time == "亥"){
      this.data.numlist.push("12")
    }
    var numlist = this.data.numlist
    var sum = 0
    for (var i = 0 ; i < numlist.length ; i++){
      sum = sum + parseInt(numlist[i])
    }
    sum = (sum-2)%6
    console.log("sum"+sum)
    if(sum==0){
      this.setData({
       resp:"空亡",
       rotatenum:1620,
       respinfo:"音信稀时，五行属土，颜色黄色，方位中央;临勾陈。谋事主三、六、九。有不吉、无结果、忧虑之含义。诀曰:空亡事不祥，阴人多乖张。求财无利益，行人有灾殃。失物寻不见，官事有刑伤。病人逢暗鬼，析解可安康。",
       left:"-15%",
        top:"83%",
        rotate:180
     })
     var info = this.data.resp
     var selectedOptionIndex = parseInt(this.data.selectedOptionIndex)
     db.collection("res_info").doc("e33be08d6795cc3201c996163e07ad0a").get().then(res=>{
      var res = res.data[info][selectedOptionIndex]
      this.setData({
        resp_info:res
      })
    })
    }
    if(sum==1){
     this.setData({
       resp:"大安",
       rotatenum:1680,
       respinfo:"身不动时，五行属木，颜色青色，方位东方。临青龙，谋事主一、五、七。有静止、心安。吉祥之含义。诀曰:大安事事昌，求谋在东方，失物去不远，宅舍保安康。行人身未动，病者主无妨。将军回田野，仔细好推详。",
       left:"19%",
        top:"61%",
        rotate:120
     })
     var info = this.data.resp
     var selectedOptionIndex = parseInt(this.data.selectedOptionIndex)
     db.collection("res_info").doc("e33be08d6795cc3201c996163e07ad0a").get().then(res=>{
      var res = res.data[info][selectedOptionIndex]
      this.setData({
        resp_info:res
      })
    })
    }
    if(sum==2){
      this.setData({
        resp:"留连",
        rotatenum:1740,
        respinfo:"人未归时，五行属水，颜色黑色，方位北方，临玄武，凡谋事主二、八、十。有喑味不明，延迟。纠缠.拖延、漫长之含义。诀曰:留连事难成，求谋日未明。官事只宜缓，去者来回程，失物南方去，急寻方心明。更需防口舌，人事且平平。",
        left:"17%",
        top:"20%",
        rotate:60
      })
      var info = this.data.resp
     var selectedOptionIndex = parseInt(this.data.selectedOptionIndex)
     db.collection("res_info").doc("e33be08d6795cc3201c996163e07ad0a").get().then(res=>{
      var res = res.data[info][selectedOptionIndex]
      this.setData({
        resp_info:res
      })
    })
    }
    if(sum==3){
      this.setData({
        resp:"速喜",
        rotatenum:1800,
        respinfo:"人即至时，五行属火，颜色红色方位南方，临朱雀，谋事主三，六，九。有快速、喜庆，吉利之含义。指时机已到。诀曰:速喜喜来临，求财向南行。失物申未午，逢人要打听。官事有福德，病者无须恐。田宅六畜吉，行人音信明。",
        left:"-19%",
        top:"2%",
        rotate:0
      })
      var info = this.data.resp
     var selectedOptionIndex = parseInt(this.data.selectedOptionIndex)
     db.collection("res_info").doc("e33be08d6795cc3201c996163e07ad0a").get().then(res=>{
      var res = res.data[info][selectedOptionIndex]
      this.setData({
        resp_info:res
      })
    })
    }
    if(sum==4){
      this.setData({
        resp:"赤口",
        rotatenum:1500,
        respinfo:"官事凶时，五行属金，颜色白色，方位西方，临白虎，谋事主四、七，十。有不吉、惊恐，凶险、口舌是非之含义。诀曰:赤口主口舌，官非切要防。失物急去寻，行人有惊慌。鸡犬多作怪，病者出西方。更须防咀咒，恐怕染瘟殃。",
        left:"-53%",
        top:"24%",
        rotate:300
      })
      var info = this.data.resp
     var selectedOptionIndex = parseInt(this.data.selectedOptionIndex)
     db.collection("res_info").doc("e33be08d6795cc3201c996163e07ad0a").get().then(res=>{
      var res = res.data[info][selectedOptionIndex]
      this.setData({
        resp_info:res
      })
    })
    }
    if(sum==5){
      this.setData({
        resp:"小吉",
        rotatenum:1560,
        respinfo:"人来喜时，五行属木，临六合，凡谋事主一、五、七有和合、吉利之含义。诀曰:小吉最吉昌，路上好商量。阴人来报喜，失物在坤方。行人立便至，交易甚是强，凡事皆和合，病者祈上苍。",
        left:"-51%",
        top:"64%",
        rotate:240
      })
      var info = this.data.resp
     var selectedOptionIndex = parseInt(this.data.selectedOptionIndex)
     db.collection("res_info").doc("e33be08d6795cc3201c996163e07ad0a").get().then(res=>{
      var res = res.data[info][selectedOptionIndex]
      this.setData({
        resp_info:res
      })
    })
  }
  var rotateDegree = this.data.rotatenum
    // 计算旋转时间，假设旋转速度为1秒/圈
    var rotateTime = Math.abs(rotateDegree) / 360 * 1 * 1000 
    // 创建动画并应用于图片元素
    var animation = wx.createAnimation({
      duration: rotateTime,
      timingFunction: 'linear'
    })
    animation.rotate(rotateDegree).step()
    this.setData({
      animationData: animation.export()
    })
    var timenum = this.data.animationData.actions[0].option.transition.duration
    setTimeout(()=>{
      this.setData({
        select:false
      })
      },timenum)
    timenum = timenum + 2000
    setTimeout(()=>{
    this.setData({
      ishiddenres:false
    })
    },timenum)
},
openinfo(){
  this.setData({
    hiddeninfo:this.data.hiddeninfo == true?false:true,
    resp_title:this.data.resp_title == "点击展开"?"点击收起":"点击展开"
  })
},
openexplain(){
  this.setData({
    showimg:false
  })
},
closeimg(){
  this.setData({
    showimg:true
  })
}
})