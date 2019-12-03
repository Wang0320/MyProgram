Page({
  data: {
    content: ''
  },
  onLoad(option) {
    const {
      id
    } = option
    this.getNewsDetail(id)
    console.log(option)
  },
  getNewsDetail(id) {
    const _this = this
    wx.request({
      type: 'post',
      url: 'http://route.showapi.com/109-35 ',
      dataType: 'json',
      data: {
        // showapi_timestamp: formatterDateTime(),
        showapi_appid: '110878', //这里需要改成自己的appid
        showapi_sign: 'c6fe91b1f9064a19bb1127fd2a9afe78', //这里需要改成自己的应用的密钥secret
        // channelName,
        page: "1",
        // channelId: "",
        // title: "",
        // needContent: "0",
        // needHtml: "0",
        // needAllList: "0",
        // maxResult: "20",
        id
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
            content: contentlist[0]
          })
          // console.log(contentlist)
        }
      }
    })
  }
})