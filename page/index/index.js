var realclassify = new Array;
Page({
  data:{
    classify:[],
    btnMark:[]
  },
  showAll:function(e){
    var dataID = e.target.dataset.id;
    var classify = this.data.classify;
    var btnMark = this.data.btnMark;
    btnMark[dataID] = 0;
    classify[dataID].classifyspan = realclassify[dataID];
    this.setData({
      classify:classify,
      btnMark:btnMark
    })
  },
  closeAll:function(e){
    var dataID = e.target.dataset.id;
    var classify = this.data.classify;
    var btnMark = this.data.btnMark;
    btnMark[dataID] = 1;
    classify[dataID].classifyspan = realclassify[dataID].slice(0,8);
    this.setData({
      classify:classify,
      btnMark:btnMark
    })
  },
  onLoad:function(options){
    var that = this;
    var btnMark = this.data.btnMark;
    var i;
    wx.request({
      url: 'https://mobapi.intocity.cn/api/small-program/menu',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        var params = Array.from(res.data.menu);
        that.setData({
          classify:params
        });
        var classify = that.data.classify;
        for(i=0;i<=classify.length-1;i++){
          btnMark[i] = 1;
          if(classify[i].classifyspan.length >= 9){
              realclassify[i] = classify[i].classifyspan;
              classify[i].classifyspan = classify[i].classifyspan.slice(0,8);
              that.setData({
              classify:classify,
              btnMark:btnMark
            })
          };
        };
      },
      fail: function() {
        // fail
        // console.log("error");
      }
    });
    // 页面初始化 options为页面跳转所带来的参数
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