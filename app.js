App({
  globalData:{
    online:"no"
  }
  ,
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
        env:"pipiyoyo-0ggyytqka90cf293"
      });
    };
    const db = wx.cloud.database()
    db.collection("online").get().then(res=>{
      console.log(res.data)
      this.globalData.online=res.data[0].status
      console.log(this.globalData.online)
    })
  },
  //如果担心openid的安全，就用这个函数
  getCloudOpenid: async function () {
    return this.openid = this.openid || (await wx.cloud.callFunction({name: 'login'})).result.OPENID
  },
  //最佳方案。
  getOpenid: async function () {
    (this.openid = this.openid || wx.getStorageSync('openid')) || wx.setStorageSync('openid', await this.getCloudOpenid())
    return this.openid
  }
})