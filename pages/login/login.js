//const config = require('../../config');
//const util = require('../../util/util.js');
const app = getApp();
//index.js
//获取应用实例

var that;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl:'/image/logo130.png'
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res.userInfo)
          app.globalData.userInfo = res.userInfo
          
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        	wx.request({
			        url:config.login,
			        method:"post",
			        data: {
			            "encrypted_data":e.detail.encryptedData,
			            "code":app.data.code,
			            "iv":e.detail.iv
			        },
			        success: function(res) {
			        	console.log(res)
			        }
		      })
		    }
      })
    }
  },
  getUserInfo: function(e) {//获取微信 信息
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
