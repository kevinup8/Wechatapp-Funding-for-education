wx.cloud.database();

Component({
    properties: {
        imgUrls: Array
    },
    data: {
        currentIndex: 0
    },
    methods: {
        swiperChange: function(e) {
            this.setData({
                currentIndex: e.detail.current
            });
        }
    }
});