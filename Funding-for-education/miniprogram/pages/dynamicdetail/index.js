// pages/dynamicdetail/index.js
const app = getApp()
var db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stationsInfo: null,
    repeat: '',
    height: 100,
    isseccond: false,
    repeatwho: '',
    pinglun: [],
    hasMore: false,
    placeholder: '评论',
    focus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  setrepeat(e) {
    console.log(e)
    this.setData({
      repeat: e.detail.value
    })
  },
  checkFullSucreen: function () {

    const self = this

    wx.getSystemInfo({

      success: function (res) {



        // 根据 屏幕高度 进行判断

        if (res.screenHeight - res.windowHeight - res.statusBarHeight - 32 > 72) {

          //self.globalData.isFullSucreen = true
          self.setData({
            height: 180
          })

        }



      }

    })

  },

  onLoad: function (opt) {
    this.checkFullSucreen()

    this.setData({
      stationsInfo: JSON.parse(opt.item)
    })
    this.getpinglun()
    
    if (this.data.stationsInfo.openid == app.globalData.openId) {
      this.setData({
        showdelete: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  deletepinglun(e) {
    console.log(e.currentTarget.dataset.id)

    wx.showModal({
      title: '删除提示',
      content: '删除后不可找回',
      confirmColor:'#ff5500',
      success (res) {
      if (res.confirm) {
        wx.cloud.callFunction({
          name: 'removefeel',
          data: {
              id:e.currentTarget.dataset.id
          }
        }).then(res => {
            if(res.result.success){
              wx.showToast({
                title: '已删除',
                icon:'success',
                duration:2000
              })
              setTimeout(function(){
                wx.navigateBack()
              },2000)
              
            }
        })
      } else if (res.cancel) {
      console.log('用户点击取消')
      }
    }
  })

  },
  zan(e){
    wx.cloud.callFunction({
      name: 'zan',
      data: {
          feel_id:this.data.stationsInfo._id
      }
    }).then(res => {
        console.log(res)
        if(res.result.success){
          wx.showToast({
            title: '点赞成功',
            icon:'success',
            duration:2000
          })
        }
    })
  },
  secondrepeat(e){
    console.log(e)
      this.setData({
        isseccond:true,
        placeholder:'回复'+e.currentTarget.dataset.nickname,
        repeatwho:e.currentTarget.dataset.repeatwho,
        focus:true
      })
  },
  checkfocus(e){
    if(e.detail.value == ''){
      this.setData({
        isseccond:false,
        placeholder:'评论',
        repeatwho:'',
        focus:false
      })
    }
  },
  repeat(e) {
    let isseccond = false, repeatwho = ''
    if (this.data.isseccond) {
      isseccond = true
      repeatwho = this.data.repeatwho
    }
    if(this.data.repeat == ''){
      wx.showToast({
        title: '回复内容为空',
        icon:'none'
      })
      return 
    }
    wx.cloud.callFunction({
      name: 'repeat',
      data: {
        feel_id: this.data.stationsInfo._id,
        repeatwho: repeatwho,
        content: this.data.repeat,
        isseccond: isseccond
      }
    }).then(res => {
      if (res.result.success) {
        this.setData({
          repeatwho: '',
          isseccond: false,
          repeat:'',
          focus:false
        })
      }
      this.getpinglun()
    })
  },
  getpinglun() {
    wx.cloud.callFunction({
      name: 'getrepeat',
      data: {
        filter: {
          feel_id: this.data.stationsInfo._id
        }
      }
    }).then(res => {

      this.setData({
        pinglun: res.result.data,
        hasMore: res.result.hasMore
      })
    })

  },
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