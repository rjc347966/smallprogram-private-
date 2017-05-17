var pid=0;
var did=0;
var prid=0;
Page({
  data:{
    // data
    popularSort:{
      page_no:1,
      hasMore:true,
      list:[]
    },
    distanceSort:{
      page_no:1,
      hasMore:true,
      list:[]
    },
    priceSort:{
      page_no:1,
      hasMore:true,
      list:[]
    },
    tabMark:{
      tabIndex:0,
      contentIndex:0
    },
    tags:''
  },
  pageTab:function(e){
    var datasetMark = e.target.dataset.mark;
    var tabMark = {};
    tabMark.tabIndex = datasetMark;
    tabMark.contentIndex = datasetMark;
    this.setData({
      tabMark:tabMark
    });
  if(datasetMark==1){
      did = 0;
      if(this.data.distanceSort.list.length == 0) {
        this.getDataInfo("distance",this.data.distanceSort.page_no);
      }
    }else if(datasetMark==2){
      prid = 0;
      if(this.data.priceSort.list.length == 0)
        this.getDataInfo("price",this.data.priceSort.page_no);
    }
  },
  // popular 加载更多数据
  pouplarSortLoadMore:function(e){
    if (this.data.popularSort.hasMore == true){
      this.getDataInfo("hot", this.data.popularSort.page_no);
    }
  },
  // distance 加载更多数据
  distanceSortLoadMore:function(e){
    if (this.data.distanceSort.hasMore == true){
      this.getDataInfo("distance", this.data.distanceSort.page_no);
    }
  },
  // price 加载更多数据
  priceSortLoadMore:function(e){
    if (this.data.priceSort.hasMore == true){
      this.getDataInfo("price", this.data.priceSort.page_no);
    }
  },
  // 获取数据
  getDataInfo:function(source,page_no){
    var that = this;
    var tags = this.data.tags;
    wx.request({
      url: getApp().globalData.url + 'hotlist',
      data: {
        source:source,
        page:page_no,
        long:getApp().globalData.location.longitude,
        lat:getApp().globalData.location.latitude,
        tags:tags
      },
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (source == "hot") {
          // 人气排行
          var res_data = that.data.popularSort;
          for(var item in res.data.data.item) {
            res_data.list.push(res.data.data.item[item]);
          }
          res_data.page_no++;
          res_data.hasMore = res_data.page_no < res.data.data.pagenum ? true : false;
          // 设置数据
          that.setData({
            popularSort:res_data
          })
          
        } else if(source == "distance") {
          // 距离排行
          var res_data = that.data.distanceSort;

          for(var item in res.data.data.distance) {
            res_data.list.push(res.data.data.distance[item]);
          }
          res_data.page_no++;
          res_data.hasMore = res_data.page_no < res.data.data.pagenum ? true : false;
          // 设置数据
          that.setData({
            distanceSort:res_data
          })
        } else {
          // 价格排行
          var res_data = that.data.priceSort;

          for(var item in res.data.data.price) {
            res_data.list.push(res.data.data.price[item]);
          }
          res_data.page_no++;
          res_data.hasMore = res_data.page_no < res.data.data.pagenum ? true : false;
          // 设置数据
          that.setData({
            priceSort:res_data
          })
        }
      },
      fail:function() {
        // console.log('请求失败');
      }
    })
  },
  onLoad:function(options){
    this.setData({
      tags:options.tags
    })
    this.getDataInfo("hot", this.data.popularSort.page_no);
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
  }
  
})