const app = getApp()
const accountInfo = wx.getAccountInfoSync()
const utils = require('../../utils/utils')
Page({


  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    imgList: [],
    niubi: '',
    realimgList: []
  },
  niubiT(e) {
    // console.log(e)
    this.setData({
      niubi: e.detail.value
    })
  },

  onAdd() {
    if (this.data.niubi == '') {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 3000
      })
      return false
    }
    wx.cloud.callFunction({
      name: 'publishfeel',
      data: {
        content: this.data.niubi,
        image: this.data.realimgList,
        type: 'feeling'
      },
      success: function(res) {
        console.log(res)
        if (res.errMsg == 'cloud.callFunction:ok') {
          wx.showToast({
            title: '发布成功',
          })
          wx.navigateBack()
        } else {
          wx.showToast({
            icon: 'none',
            title: '发布失败'
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          icon: 'none',
          title: '发布失败'
        })
      }
    })
  },

  onLoad: function(options) {
    console.log(utils.formatTime(new Date()))
  },

  onReady: function() {

  },
  /**
   * 预览图片
   */
  previewImage: function(event) {
    let url = event.target.id;
    wx.previewImage({
      current: '',
      urls: [wxfile]
    })
  },
  /**
   * 获取输入内容
   */
  getTextContent: function(event) {
    let value = event.detail.value;
    this.setData({
      textContent: value
    });
  },

  ChooseImage(e) {
    wx.vibrateShort({})
    // let imgCount = 3-this.data.imgList.length
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: res => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }

        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + '.png',
          filePath: res.tempFilePaths[0],
          success: res => {
            // 返回文件 ID



            if (this.data.realimgList.length != 0) {
              this.setData({
                realimgList: this.data.realimgList.concat(res.fileID)
              })
              console.log(this.data)
            } else {
              this.setData({
                realimgList: [res.fileID]
              })
              console.log(this.data)
            }
          },
          fail: res => {
            console.log(res)
          }
        })
      }
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  // DelImg: function (t) {
  //     this.data.imgList.splice(t.currentTarget.dataset.index, 1), this.setData({
  //         imgList: this.data.imgList
  //     });
  // },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
})