// pages/jobdetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stationsInfo:null,
    nickName:null,
    src:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
      console.log(opt)

      let stationsInfo = JSON.parse(opt.item)
      this.setData({
        stationsInfo
      })

      wx.cloud.callFunction({
        name:'getUserInfo',
        data:{
          openid:stationsInfo.publishuser
        },
        success:res=>{
          console.log(res)
            const info = res.result;
            if(info){
              this.setData({
                nickName:info.nickName,
                src:info.avatarUrl,
               
              })
            }
        },
        fail:err=>{
          console.log(err)
        }
      })
  },
  handleClickBaoming:function(){
    wx.navigateTo({
      url: '/pages/JobsForm/form?stationid='+this.data.stationsInfo._id,
    })
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