//index.js

//获取应用实例
const app = getApp()
var that;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
// 。。。导航栏。。。。。。。。。
  btnClick1: function () {//显示导航加载动画
    wx.showNavigationBarLoading()
  },
  btnClick2: function () {//停止导航加载动画
    wx.hideNavigationBarLoading()
  },
  btnClick3: function () {//改变后的导航栏文字
    wx.setNavigationBarTitle({
      title: '改变后的导航栏文字',
    })
  },
  btnClick4: function () {//改变导航的颜色
    wx.setNavigationBarColor({
      frontColor: '#000000',//前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000
      backgroundColor: '#FF9797',
      animation: {
        duration: 1000,
        timingFunc: 'easeInOut'
      }
    })
  },
// 。。。。。下拉背景变化。。。。。。。。
  BgbtnClick1: function () {//改变下拉背景字体、loading 图的样式
    wx.setBackgroundTextStyle({
      textStyle: 'dark' // 下拉背景字体、loading 图的样式为dark
    })
  },
  BgbtnClick2: function () {
    wx.setBackgroundColor({
      backgroundColor: '#000000', // 窗口的背景色为黑色
    })
  },
  BgbtnClick3: function () {
    wx.setBackgroundColor({
      backgroundColorTop: '#DC143C', // 顶部窗口的背景色为红
      backgroundColorBottom: '#   #00FA9A', // 底部窗口的背景色为绿
    })
  },
  // 。。。。。。。获取地理位置。。。。。。。。。。。。。。
  // 进入页面
  onShow: function () {
    that = this
    // 授权获取地理位置
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        // 同意获取
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        // 客户同意获取但是微信本身未开启定位
      },
      // 不同意获取
      fail: function (res) {
        // 设置里面 地理位置的状态
        wx.getSetting({
          success(res) {
            console.log(res.authSetting["scope.userLocation"])
            if (!res.authSetting["scope.userLocation"]) {
              console.log('没有授权地理位置')

            }
            else {  
              console.log('授权了地理位置')
            }
            // res.authSetting = {
            //   "scope.userInfo": true,
            //   "scope.userLocation": true
            // }
          }
        })
      }
    })
  },
  getPermission(){
    //必须点击事件触发，调起客户端小程序设置界面，手动设置
    wx.openSetting({
      complete: function (res) {
        console.log(res.authSetting["scope.userLocation"])
        if (!res.authSetting["scope.userLocation"]==true) {
            console.log('位置存到本地')
        } else {
          
        }
      }
    })
  },
  setPermissions: function () {
    that.getPermission()
  },
  onLoad: function () {
    
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
