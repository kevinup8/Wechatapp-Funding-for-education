
const app = getApp();
Page({

  /**
   * 页面的初始数据
   * 
   */
  data: {
    StatusBar:app.globalData.StatusBar,
    CutomBar:app.globalData.CutomBar,
    index:null,
    sex:[{type:'man',name:'男'},{type:'woman',name:'女'}],
    selectedsex:{type:'man',name:'男'},
    college: [{ id: 0, name: '新闻传播学院' }, { id: 1, name: '播音主持艺术学院' }, { id: 2, name: '电影与电视学院' }, { id: 3, name: '设计学院' }, { id: 4, name: '人文与艺术学院' }, { id: 5, name: '文化管理学院' }, { id: 6, name: '传媒技术学院' },],
    selectedcollege: { id: 0, name:'新闻传播学院'},
    class:[{id:0,name:'大一'},{id:1,name:'大二'},{id:2,name:'大三'},{id:3,name:'大四'}],
    selectedclass:{id:0,name:'大一'},
    mobile:null,
    xh:null,
    rn:null,
    notes:null,
    stationid:null
  },
  collegeChange:function(e){
    this.setData({
      selectedcollege:this.data.college[e.detail.value]
    })
  },
  sexChange:function(e){
    this.setData({
      selectedsex:this.data.sex[e.detail.value]
    })
  },
  classChange:function(e){
    this.setData({
      selectedclass:this.data.class[e.detail.value]
    })
  },
  getPhoneNumber(e){
    var that = this;
    wx.cloud.callFunction({
        name: 'getMobile',
        data: {
            weRunData: wx.cloud.CloudID(e.detail.cloudID),
        }
    }).then(res => {
      console.log(res)
        that.setData({
            mobile: res.result,
        })

    }).catch(err => {
        console.error(err);

  })
},
  changexh(e){


      this.setData({
        xh:e.detail.value
      })
        
    
      
  
  },
  changern(e){
    console.log(e.detail.value)
    this.setData({
      rn:e.detail.value
    })
  },
  changepn(e){
    console.log(e.detail.value)
    this.setData({
      mobile:e.detail.value
    })
  },
  changeNotes(e){
    console.log(e.detail.value)
    this.setData({
      notes:e.detail.value
    })
  },
  isNumber(val) {

        var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    
        if(regPos.test(val) || regNeg.test(val)) {
    
            return true;
    
            } else {
    
            return false;
    
            }
    
        },
  signUp(){
    const {selectedcollege,selectedsex,selectedclass,xh,rn,mobile,notes} = this.data;
    if(!this.isNumber(xh)){
      wx.showToast({
        title: '学号不正确',
        icon:'none',
        duration:3000
      })
      return false
    }else{
      if(xh.length!= 11){
        wx.showToast({
          title: '学号不正确',
          icon:'none',
          duration:3000
        })
        return false
      }
      
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if(mobile.length===0){
        wx.showToast({
            title: '输入的手机号为空',
            icon: 'none',
            duration: 1500
        });
        return false;
    }else if (mobile.length < 11) {
        wx.showToast({
            title: '手机号长度有误！',
            icon: 'none',
            duration: 1500
        });
        return false;
    } else if (!myreg.test(mobile)) {
        wx.showToast({
            title: '手机号有误！',
            icon: 'none',
            duration: 1500
        });
        return false;
    }
  if(rn == ''){
    wx.showToast({
      title: '输入的姓名为空',
      icon: 'none',
      duration: 1500
  });
  return false;
  }

    wx.cloud.callFunction({
      name:'signUp',
      data:{
        college:selectedcollege.name,
        sex:selectedsex.name,
        class:selectedclass.name,
        xh:xh,
        rn:rn,
        mobile:mobile,
        notes:notes,
        signup_id:this.data.stationid
      }
    }).then(res=>{
      console.log(res.result)

      if(res.result.success ){
        wx.showToast({
          title: '报名成功',
          icon:'success'
        })
        wx.navigateBack({
          complete: (res) => {},
        })
      }else{
        wx.showToast({
          title: res.result.error,
          icon:'none'
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(opt) {
   this.setData({
    stationid:opt.stationid
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