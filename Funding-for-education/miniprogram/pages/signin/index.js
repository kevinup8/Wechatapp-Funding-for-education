// pages/signin/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signList:[],
    pageIndex:1,
    pageSize:10,
    hasMore:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getsignListdiy(){
    wx.cloud.callFunction({
      name:'getsignup',
      data:{
        pageIndex:this.data.pageIndex,
        pageSize:this.data.pageSize
      }
    }).then(res=>{
      this.setData({
        signList:this.data.signList.concat(res.result.data),
        hasMore:res.result.hasMore
      })
    })

 },
   getsignList(){
      wx.cloud.callFunction({
        name:'getsignup',
        data:{
          pageIndex:this.data.pageIndex,
          pageSize:this.data.pageSize
        }
      }).then(res=>{
        this.setData({
          signList:res.result.data,
          hasMore:res.result.hasMore
        })
      })

   },
  onLoad: function (options) {
    this.getsignList()
  },
  onPullDownRefresh(){
    this.setData({
      pageIndex:this.data.pageIndex+1
    })
    this.getsignListdiy()
  },
  onReachBottom(){
    this.setData({
      pageIndex:this.data.pageIndex+1
    })
    this.getsignListdiy()
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