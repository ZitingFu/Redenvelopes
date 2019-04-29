const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//succ 同意授权地理位置并且微信开启了地理位置 后要执行的  (存入城市)
//fail  不同意授权地理位置所要执行的

//获取地理位置
let getLocations = (succ, chooseSucc, chooseFail, fail) => {
    wx.showLoading({
        title: '定位中',
        mask: true
    });
    wx.getLocation({
        type: 'wgs84',
        altitude: false,
        success: function (res) {//同意授权地理位置
            var latitude = res.latitude
            var longitude = res.longitude
            //判断微信是否开启地理位置
            if (latitude == '' || latitude == null || longitude == '' || longitude == null) {
                wx.hideLoading();
                wx.showModal({
                    title: '无法获取您的位置信息',
                    showCancel: false,
                    content: '「拍立返」小程序暂无法获得你的位置信息，请确认并手动选取定位',
                    mask: true,
                    success: function (res) {
                        wx.chooseLocation({
                            success: function (ress) {
                            	console.log(ress)
                                 chooseSucc(ress)
                            },
                            fail: function (res) {
                                wx.hideLoading();
                                wx.showModal({
                                    title: '无法获得定位授权',
                                    mask: true,
                                    showCancel: false,
                                    content: '「拍立返」小程序暂无法获得你的位置信息，请确认并手动选取定位',
                                    success: function (res) {
                                        chooseFail()
                                    }
                                })
                            }
                        })
                    }
                })
            } else {//开启了微信地理位置
                succ(res)
            }
        }, fail: function (res) {//没有授权地理位置
            wx.hideLoading();
            fail()
        }
    })
};


module.exports = {
  formatTime: formatTime
}
