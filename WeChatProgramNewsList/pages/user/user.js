Page({
  data: {
    userHead: '/static/icon/logo.png',
    hasLogin: false
  },
  getUserInfo(e) {
    const _this = this
    wx.getUserInfo({
      success: function(res) {
        _this.setData({
          UserInfo: res.userInfo,
          hasLogin: true
        })
      }
    })
  }
})