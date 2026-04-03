Page({

  data: {
    resp:"",
    inputlist:[""],
    sum:0,
    color:"124, 11, 11",
    animationData: {},
    rotatenum:0,
    ishidden:true,
    hiddeninfo:true,
    resp_type:"",
    respinfo:"",
    resp_info:"",
    resp_title:"点击展开",
    buttonhide:false,
    buttonhide2:false,
    showimg:true,
    select:true,
    left:"",
    top:"",
    rotate:"",
    showModal: false,
    selectedOptionIndex: -1
  },
  addinput(e){
    var inputlist = this.data.inputlist
    inputlist.push("")
    this.setData({
      inputlist:inputlist
    })
    if(this.data.inputlist.length>1){
      this.setData({
        buttonhide2:false
      })
    }
  },
  deletedq(e){
    var inputlist = this.data.inputlist
    inputlist.splice(e.currentTarget.dataset.index,1)
    this.setData({
      inputlist:inputlist
    })
    if(this.data.inputlist.length==1){
      this.setData({
        buttonhide2:true
      })
    }
  },
  checknums(e){
    var sum = 0
    var inputlist = this.data.inputlist
    var value = e.detail.value.replace(/\D/g, "")
    inputlist[e.currentTarget.dataset.index] = value
    this.setData({
      inputlist:inputlist
    })
    for (var i = 0 ; i < inputlist.length ; i++){
      if(inputlist[i] != ""){
        sum = sum + parseInt(inputlist[i])
      }
    }
    this.setData({
      sum:sum
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   if(this.data.inputlist.length==1){
     this.setData({
       buttonhide2:true
     })
   }
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
  onmodal:function(){
    var inputlist = this.data.inputlist
    this.setData({
      ishidden:true,
      buttonhide:false,
      color:"124, 11, 11"
    })
    if(inputlist.length != 1){
      this.setData({
        buttonhide2:false
      })
    }
  },
  goto1:function(){
    wx.redirectTo({
      url: '../../../datetime/pages/datetime/datetime',
    })
  },
  touchmove:function(){
    return
  },
  chooseModal(){
    var inputlist = this.data.inputlist
    for (var i = 0 ; i < inputlist.length ; i++){
      if(inputlist[i] == 0){
        wx.showToast({
          title: '请输入非0整数哦！',
          icon:'none'
        })
        return
      }
    }
    this.setData({
      showModal: true
    })
  },
  closeModal() {
    this.setData({
      showModal: false
    })
  },
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
      buttonhide2:true,
      color:"grey",
      select:true
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
    var sum = this.data.sum
    var length = this.data.inputlist.length
    sum = (sum-(length-1))%6
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
      ishidden:false
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
  }
)