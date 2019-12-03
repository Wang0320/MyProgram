//index.js
//获取应用实例
const app = getApp()

function formatterDateTime() {
  var date = new Date()
  var month = date.getMonth() + 1
  var datetime = date.getFullYear() +
    "" // "年"
    +
    (month >= 10 ? month : "0" + month) +
    "" // "月"
    +
    (date.getDate() < 10 ? "0" + date.getDate() : date
      .getDate()) +
    "" +
    (date.getHours() < 10 ? "0" + date.getHours() : date
      .getHours()) +
    "" +
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
      .getMinutes()) +
    "" +
    (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
      .getSeconds());
  return datetime;
}

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    TabCur: 0,
    navList: [],
    newsList: [],
    channelName: '国内焦点',
    page: 1,
		title:''
  },
  onLoad() {
    this.getNavList()
    this.getNewsList()
  },
  tabSelect(e) {
    // console.log(e)
    const _this = this
    const {
      index,
      channelid,
      title
    } = e.currentTarget.dataset
    this.setData({
      TabCur: index,
      scrollLeft: (index - 1) * 60,
      channelName: title
    })
    this.getNewsList(this.data.channelName)
    // console.log(this.data.channelName)
  },
  handleNavToNewsDetail(e) { //跳转并传id给下一个页面
    const { //id取自自定义属性data-id
      id
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: '../newsDetail/newsDetail?id=' + id //需使用?id=接住id
    })
    console.log(id)
  },
  getNavList() { //获取导航栏标签
    const _this = this
    wx.request({
      type: 'post',
      url: 'http://route.showapi.com/109-34',
      dataType: 'json',
      data: {
        "showapi_timestamp": formatterDateTime(),
        "showapi_appid": '110878', //这里需要改成自己的appid
        "showapi_sign": 'c6fe91b1f9064a19bb1127fd2a9afe78', //这里需要改成自己的应用的密钥secret
      },
      error: function(XmlHttpRequest, textStatus, errorThrown) {
        alert("操作失败!");
      },
      success: function(res) {
        if (res.statusCode == 200) { //如果请求代码正确执行
          const {
            channelList
          } = res.data.showapi_res_body
          _this.setData({
            navList: channelList
          })
        }
      }
    })
  },
  getNewsList(channelName = '国内焦点') {
    const _this = this
    wx.request({
      type: 'post',
      url: 'http://route.showapi.com/109-35 ',
      dataType: 'json',
      data: {
        showapi_timestamp: formatterDateTime(),
        showapi_appid: '110878', //这里需要改成自己的appid
        showapi_sign: 'c6fe91b1f9064a19bb1127fd2a9afe78', //这里需要改成自己的应用的密钥secret
        channelName,
        page: 1,
        // channelId: "",
        // title: "",
        // needContent: "0",
        // needHtml: "0",
        // needAllList: "0",
        // maxResult: "20",
        // id: ""
      },
      error: function(XmlHttpRequest, textStatus, errorThrown) {
        alert("操作失败!");
      },
      success(res) {
        if (res.statusCode == 200) { //如果请求代码正确执行
          const {
            contentlist
          } = res.data.showapi_res_body.pagebean
          _this.setData({
            newsList: contentlist
          })
        }
        // console.log(res.data.showapi_res_body.pagebean.contentlist)
      }
    })
  },
  onPullDownRefresh() {
    wx.showLoading({
      title: '正在刷新',
    })
    this.setData({
      mtop: 20
    })
    setTimeout(() => {
      wx.hideLoading()
      this.setData({
        mtop: 0
      })
    }, 2000)
  },
  onReachBottom() {
    let {
      page,
      title
    } = this.data
    page++
    this.data.page = page
    console.log(page)
    this.getNewsList(title, page)
  }
  // onPullDownRefresh() {
  //   wx.showLoading({
  //     title: '加载中',
  //   })
  //   this.setData({
  //     mtop: this.data.mtop + 20
  //   })
  //   setTimeout(() => {
  //     this.setData({
  //       mtop: this.data.mtop - 20
  //     })
  //     wx.hideLoading()
  //   }, 2000)
  // }
})