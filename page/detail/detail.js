// page/index/index.js

var a;

Page({
  data:{
    // item_id;
    item_id: 0,
    // swiper 数据和属性
    imgUrls: [],
    imgCount:0,
    // 地址
    address: "",
    // 时间
    time: "",
    // 电话
    phone: "",
    // 标题数据
    titleText: "",
    // 次标题
    detailTitleText: "",
    // 文章内容
    contentText: "",
    // swiper 属性
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1500,
    windowWidth: 0
  },
  backToIndex:function(){
    wx.navigateBack({
      delta: 5
    });
  },
  onLoad:function(options){

    var that = this;
    // 获取屏幕宽度
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowWidth:res.windowWidth
        })
      }
    })

    // 设置item_id
    this.data.item_id = options.item_id;
    // 请求数据
    wx.request({
      url: getApp().globalData.url + 'details',
      data:{
        item_id: this.data.item_id,
      },
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        that.setData({
          imgUrls: res.data.images,
          imgCount:res.data.images.length,
          titleText: res.data.row.title,
          detailTitleText: res.data.row.venue,
          contentText:res.data.review_rows[0].content,
          address: res.data.row.address,
          phone: res.data.row.phone,
          time: res.data.row.merchant_hours_detail[0]
        })
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
})