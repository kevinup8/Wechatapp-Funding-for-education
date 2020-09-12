// miniprogram/pages/StuJobs/Jobs.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    cardCur: 0,
    DotStyle:true,
    stationsList:[],
    hasMore:false,
    swiperList: [{
      id: 0,
      type: 'image',
      url: "https://img.zcool.cn/community/01bffc5ccea2d7a801208f8bc101b2.png"
    }, {
      id: 1,
        type: 'image',
        url: "https://img.zcool.cn/community/01b2ba5542bd370000019ae90852e6.jpg"
    }, {
      id: 2,
      type: 'image',
        url: "https://img.zcool.cn/community/013dc55542bd370000019ae98149c1.jpg"
    }, {
      id: 3,
      type: 'image',
        url: "https://img.zcool.cn/community/012fa95542bd380000019ae9c67b71.jpg"
    }, {
      id: 4,
      type: 'image',
        url: "https://img.zcool.cn/community/0120595542bd340000019ae9184252.jpg" 
    }],
  },

  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getstations()
  },
  getstations:function(){
    wx.cloud.callFunction({
      name:'getstations',
      data:{
        filter:{ 
          status:1,
        },
       
        pageIndex:1,
        pageSize:10
      }
    }).then(res=>{
      console.log(res)
      const result = res.result.data
      for(let i in result){
          
          result[i].num_data = this.num_data(result[i].starttime,result[i].endtime)
      }

      this.setData({
        stationsList:result,
        hasMore:res.result.hasMore
      })
    })
  },
  num_data: function (start_date1,end_date1) {
    var start_date = new Date(start_date1.replace(/-/g, "/"));
    var end_date = new Date(end_date1.replace(/-/g, "/"));
    var days = end_date.getTime() - start_date.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    if (day>0) {
      return day
    } else {
      wx.showToast({
        icon: 'none',
        title: '日期有误',
      })
     
    }
  },
  showdetail:function(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/jobdetail/index?item='+ JSON.stringify(e.currentTarget.dataset.item),
    })
  },
  handleClickBaoming:function(e){
    if(!e.currentTarget.dataset.disabled){
      wx.navigateTo({
        url: '/pages/JobsForm/form?stationid='+e.currentTarget.dataset.id,
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})