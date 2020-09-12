var n = wx.cloud.database(), a = getApp(), t = null;

Page({
    data: {
        about: "",
        carouselImgUrls: [ 
        "https://img.zcool.cn/community/01bffc5ccea2d7a801208f8bc101b2.png",
        "https://img.zcool.cn/community/01b2ba5542bd370000019ae90852e6.jpg",
        "https://img.zcool.cn/community/013dc55542bd370000019ae98149c1.jpg",  
        "https://img.zcool.cn/community/012fa95542bd380000019ae9c67b71.jpg", 
        "https://img.zcool.cn/community/0120595542bd340000019ae9184252.jpg" 
      ],
        functions: [ {
            name: "校园资讯",
            numbers: "",
            iconpath: "/images/choucang.png",
            classifier: "News",
            color: "orange",
            path: "../CampusNews/news"
        }, 
        {
            name: "勤工助学",
            numbers: "",
            color: "cyan",
            iconpath: "/images/jianding.png",
            classifier: "Jobs",
            path: "../StuJobs/Jobs"
        }, 
        // {
        //     name: "作品合集",
        //     numbers: "",
        //     color: "red",
        //     iconpath: "/images/jilu.png",
        //     classifier: "Works",
        //     path: "../works/works"
        // }, 
        // {
        //     name: "创意小屋",
        //     numbers: "",
        //     color: "purple",
        //     iconpath: "/images/shangcheng.png",
        //     classifier: "Happy",
        //     path: "../functions/functions"
        // } 
      ]
    },
    tofunction: function(n) {
        console.log(n.currentTarget.dataset.id);
        var a = this.data.functions[n.currentTarget.dataset.id].path;
        wx.navigateTo({
            url: a,
            success: function(n) {},
            fail: function(n) {
                wx.showToast({
                    title: "该功能暂未开发",
                    icon: "none"
                });
            },
            complete: function(n) {}
        });
    },
    onLoad: function(a) {
        var o = this;
        o.showModal()
        
        /* 广告 */
        /* wx.createInterstitialAd && ((t = wx.createInterstitialAd({
            adUnitId: "adunit-b15c7d26528ca1d3"
        })).onLoad(function() {}), t.onError(function(n) {}), t.onClose(function() {})); */
        
    },
    onReady: function() {},
    onShow: function() {
        t && t.show().catch(function(n) {
            console.error(n);
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    // onShareAppMessage: function(n) {
    //     return "button" === n.from && console.log(n.target), {
    //         title: "和菜鸟一起学编程吧！",
    //         path: "/pages/index/index",
    //         imageUrl: "https://wx4.sinaimg.cn/mw690/006cV2kkgy1gcdgzzcalqj30u00mi78g.jpg"
    //     };
    // },
    showModal: function(n) {
        this.setData({
            modalName: a.globalData.modalName
        });
    },
    hideModal: function(n) {
        a.globalData.modalName = "", this.setData({
            modalName: null
        });
    }
});