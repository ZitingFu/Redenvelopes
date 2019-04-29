/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

// var host = "m.pailifan.com/xcx"
var host = "https://qb.xluob.com"
// var host = "bs.te.pailifan.com/xcxdev"
var b = 144
// var b = 171
// var b =2621
// var b =2617
var config = {
    b,
    // 下面的地址配合云端 Server 工作
    host,

    // 登陆
    login:host+'/mini/passport/auth',

};

module.exports = config
