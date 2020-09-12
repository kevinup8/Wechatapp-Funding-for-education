const app = getApp();
const db = wx.cloud.database();
Page({

  data: {
    userInfo: {},
    openid: '',
    isLoginPopup: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    src:'',
    nickName:'',
    userType:'user'
  },

  handleContact(e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
   
    wx.cloud.callFunction({
      name:'getUserInfo',
      success:res=>{
        console.log(res)
          const info = res.result;
          if(info){
            this.setData({
              nickName:info.nickName,
              src:info.avatarUrl,
              isLogin:true,
              userType:info.userType ==undefined?'user':info.userType
            })
          }
      },
      fail:err=>{
        console.log(err)
      }
    })
    

  },
 

  onReady: function () {

  },

// 消息
  // xiaoxi() {
  //   wx.showModal({
  //     title: '提示',
  //     content: '功能开发中',
  //   })
  // },
  xiaoxi() {
    wx.navigateTo({
      url: '../message/message',
    })
  },
  daka(){
    wx.navigateTo({
      url: '../daka/daka',
    })
  },




  /* 管理员入口 */
  toRoot: function () {
      wx.navigateTo({
        url: '/pages/admin/admin',
      })
  },


  onTapTag: function (e) {
    var self = this;
    var tab = e.currentTarget.id;
    var topBarItems = self.data.topBarItems;
    // 切换topBarItem 
    for (var i = 0; i < topBarItems.length; i++) {
      if (tab == topBarItems[i].id) {
        topBarItems[i].selected = true;
      } else {
        topBarItems[i].selected = false;
      }
    }
    self.setData({
      topBarItems: topBarItems,
      tab: tab

    })
    if (tab !== 0) {
      this.fetchPostsData(tab);
    } else {
      this.fetchPostsData("1");
    }
  },

  /* 转发功能 */
  onShareAppMessage: function () {
    return {
      title: title,
      path: path,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  /* 反馈电话 */
  callTelePhone: function () {
    wx.makePhoneCall({
      phoneNumber: "15272272758",
      success: function () {
        console.log("拨打成功");
      },
      fail: function () {
        console.log("拨打失败");
      }
    });
  },

  /* 复制链接 */
  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },

  // 清除缓存
  clearStorge: function (e) {
    Auth.logout()
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  /* 赞赏码 */
  showQrcode() {
    wx.previewImage({
      urls: ['https://www.itwcn.xyz/wp-content/uploads/2020/04/mm_reward_qrcode_1586253165964.png'],
      current: 'https://www.itwcn.xyz/wp-content/uploads/2020/04/mm_reward_qrcode_1586253165964.png' // 当前显示图片的http链接      
    })
  },
  getUserInfo: function (e) {
    let info = e.detail.userInfo;
   
    this.setData({
      isLogin: true,          //确认登陆状态
      src: info.avatarUrl,    //更新图片来源
      nickName: info.nickName //更新昵称
    })
   
    wx.cloud.callFunction({
      name:'saveUserInfo',
      data:{
        nickName:info.nickName,
        avatarUrl:info.avatarUrl,
        city:info.city,
        province:info.province,
        gender:info.gender
      }
    })
  }
})