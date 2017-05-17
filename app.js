//app.js
App({
  data:{
    
  },
  onLaunch: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        var location = {}
        location.latitude = res.latitude;
        location.longitude = res.longitude;
        that.globalData.location = location;
      }
    })
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    // 经纬度
    location:{
      latitude:null,
      longitude:null
    },
    url:"https://mobapi.intocity.cn/api/small-program/"
    // url:"ceshi"
  }
})