// miniprogram/pages/dynamic/dynamic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryResult: [],
    pageIndex: 1,
    pageSize: 10,
    hasMore: true,

    left: 0,
    right: 50,
    bottom: 50,
    bgColor: "#39b54a",
    btnList: [],
    list: [{
      bgColor: "#16C2C2",
      imgUrl: "/images/fab/creat.png",
      imgHeight: 64,
      imgWidth: 64,
      text: "创建",
      fontSize: 34,
      color: "#fff"
    }, {
      bgColor: "#64B532",
      imgUrl: "/images/fab/xiaoxi.png",
      imgHeight: 64,
      imgWidth: 64,
      text: "通知",
      fontSize: 34,
      color: "#fff"
    }, {
      bgColor: "#FFA000",
      imgUrl: "/images/fab/about.png",
      imgHeight: 64,
      imgWidth: 64,
      text: "关于",
      fontSize: 34,
      color: "#fff"
    }, ]
  },
  onClick(e) {
    let index = e.detail.index
    switch (index) {
      case -1:
        util.toast("您点击了悬浮按钮")
        break;
      case 0:
        wx.navigateTo({
          url: '../publish/publish',
        })
        break;
      case 1:
        wx.navigateTo({
          url: '../message/message',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../user-about/about',
        })
        break;
      default:
        break;
    }
  },

  zan(e) {

    wx.cloud.callFunction({
      name: 'zan',
      data: {
        feel_id: e.currentTarget.dataset.id
      }
    }).then(res => {
      console.log(res)
      if (res.result.success) {
        wx.showToast({
          title: '点赞成功',
          icon: 'success',
          duration: 1000
        })
        this.onQuerydiy()
      } else {
        wx.showToast({
          title: res.result.error,
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
  onQuerydiy: function() {
    wx.cloud.callFunction({
      name: 'queryfeel',
      data: {
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        filter: {
          status: 0
        }
      }
    }).then(res => {
      wx.hideLoading()
      this.setData({
        queryResult: res.result.data,
        hasMore: res.result.hasMore
      })
      wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    })
  },
  onQuery: function() {

    wx.cloud.callFunction({
      name: 'queryfeel',
      data: {
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        filter: {
          status: 0
        }
      }
    }).then(res => {
      wx.hideLoading()
      this.setData({
        queryResult: this.data.queryResult.concat(res.result.data),
        hasMore: res.result.hasMore
      })
      wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.popover = this.selectComponent('#popover');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log(111)
    this.onQuerydiy()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  onTap: function(e) {
    var id = e.target.id // 或者 e.target.id 获取点击元素的 ID 值

    wx.createSelectorQuery().select('#' + id).boundingClientRect(res => {
      // 调用自定义组件 popover 中的 onDisplay 方法
      this.popover.onDisplay(res);
    }).exec();
  },
  previewImage(e) {
    console.log(e)
    wx.previewImage({
      urls: e.currentTarget.dataset.item,
      current: e.currentTarget.dataset.src,
    })
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onLoad: function(options) {



  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      pageIndex: 1
    })
    wx.showLoading()
    this.onQuerydiy()
    wx.hideLoading()
    this.onQuerydiy()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.hasMore) {
      this.setData({
        pageIndex: this.data.pageIndex + 1
      })
      this.onQuery()
    } else {
      wx.showToast({
        title: '没有更多啦',
        icon: 'none'
      })
    }

  },
  watchdt(e) {

    wx.navigateTo({
      url: '/pages/dynamicdetail/index?item=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  toedit: function() {
    wx.navigateTo({
      url: "/pages/publish/publish"
    });
  }
})