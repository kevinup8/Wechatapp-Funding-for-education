App({
    onLaunch: function () {
        var t = this;
        wx.cloud && wx.cloud.init({
            // 此处请填入环境 ID, 环境 ID 可打开云控制台查看
            env: 'dev-gd1ob',
            traceUser: !0
        }), wx.getSystemInfo({
            success: function (a) {
                t.globalData.h = a.screenHeight, t.globalData.StatusBar = a.statusBarHeight;
                var e = wx.getMenuButtonBoundingClientRect();
                e ? (t.globalData.Custom = e, t.globalData.CustomBar = e.bottom + e.top - a.statusBarHeight) : t.globalData.CustomBar = a.statusBarHeight + 50;
            }
        });
        this.getUserInfo()
        if (this.globalData.userInfo) {
            console.log(1)
           
          } else if (wx.canIUse) {
            console.log(2)
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            this.userInfoReadyCallback = res => {
              console.log(12)
              this.globalData.userInfo = res.userInfo
             
            }
          } else {
            console.log(3)
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
              success: res => {
                this.globalData.userInfo = res.userInfo
            
              },
              fail: res => {
                console.log(4);
              
              }
            })
          }
      
    },
    globalData: {
        modalName: "Image",
        isfirst: 1,
        h: "",
        ColorList: [{
            title: "嫣红",
            name: "red",
            color: "#e54d42"
        }, {
            title: "桔橙",
            name: "orange",
            color: "#f37b1d"
        }, {
            title: "明黄",
            name: "yellow",
            color: "#fbbd08"
        }, {
            title: "橄榄",
            name: "olive",
            color: "#8dc63f"
        }, {
            title: "森绿",
            name: "green",
            color: "#39b54a"
        }, {
            title: "天青",
            name: "cyan",
            color: "#1cbbb4"
        }, {
            title: "海蓝",
            name: "blue",
            color: "#0081ff"
        }, {
            title: "姹紫",
            name: "purple",
            color: "#6739b6"
        }, {
            title: "木槿",
            name: "mauve",
            color: "#9c26b0"
        }, {
            title: "桃粉",
            name: "pink",
            color: "#e03997"
        }, {
            title: "棕褐",
            name: "brown",
            color: "#a5673f"
        }, {
            title: "玄灰",
            name: "grey",
            color: "#8799a3"
        }, {
            title: "草灰",
            name: "gray",
            color: "#aaaaaa"
        }, {
            title: "墨黑",
            name: "black",
            color: "#333333"
        }, {
            title: "雅白",
            name: "white",
            color: "#ffffff"
        }]
    },
    /* 版本更新 */
    update_v: function () {
        var t = wx.getUpdateManager();
        t.onCheckForUpdate(function (t) {
            console.log(t);
        }), t.onUpdateReady(function () {
            wx.showModal({
                title: "更新提示",
                content: "新版本已经准备好，是否重启应用？",
                success: function (o) {
                    o.confirm && t.applyUpdate();
                }
            });
        }), t.onUpdateFailed(function () { });
    },
    // 获取当前时间
    getnowtime: function () {
        var date = new Date
        var year = date.getFullYear().toString()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()

        if (hour.toString().length === 1) {
            hour = '0' + hour.toString()
        } else if (minute.toString().length === 1) {
            minute = '0' + minute.toString()
        } else if (second.toString().length === 1) {
            second = '0' + second.toString()
        }

        var nowtime = year + '/' + month.toString() + '/' + day.toString() + ' ' + hour + ":" + minute + ":" + second
        return nowtime
    },

    getUserInfo(){
        wx.cloud.callFunction({
            name:'getUserInfo',
            success:res=>{
              console.log(res)
                const info = res.result;
                if(info){
                  this.globalData.openId = info.userInfo.openId
                }
            },
            fail:err=>{
              console.log(err)
            }
          })
    }
});