//logs.js
const util = require('../../utils/util.js')
Page({
  data: {
    activeIndex: 1, //1关闭弹出层 2中奖 3手的Animation 4未中奖 ,
    money:5
  }, 
  onShow: function () {
    var that = this;
    wx.onAccelerometerChange(function (res) {
      	if (res.x > 1 && res.y < 0) {
      		that.startAnimation()
      	}
    })
  },
  // 关闭弹出框
  maskClose:function(){
    this.setData({
      activeIndex: 1
    })
  },
  // 点击领取
  Receive: function(){
    console.log("领取金额")
    this.maskClose()
  },
  // 点击触发摇一摇
  startAnimation: function () {
    var that = this
    if(that.data.activeIndex == 2){
      wx.showToast({
        title: '抽奖次数以达到上线',
        icon: 'none',
        duration: 2000
      })
    }
    else{
      that.setData({
        activeIndex: 3
      })
      wx.showLoading({
          title: '正在加载...',
      })
      setTimeout(function () {
        wx.hideLoading()
        // 控制 中奖跟未中奖的图片
        that.setData({
            activeIndex:2
        })
      },1500)
    }
  },
})
