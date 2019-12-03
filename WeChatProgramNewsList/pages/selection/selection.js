Page({
  data: {
    points: { //，默认经纬度
      longitude: 113.3245211,
      latitude: 23.10229
    },
    tabbar: [{
      id: 1,
      name: '定位',
      event: 'getLocation' //事件
    }],
    markers: [{
      iconPath: "mark.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 20,
      height: 20
    }],
  },
  handleMap(e) {
    const _this = this
    const {
      event
    } = e.target.dataset
    switch (event) {
      case 'getLocation':
        wx.getLocation({
          type: "gch02",
          altitude: true,
          success(res) {
            const {
              longitude,
              latitude
            } = res
            _this.setData({
              points: {
                longitude,
                latitude
              },
              markers: [{
                iconPath: "mark.png",
                id: 0,
                latitude,
                longitude,
                width: 20,
                height: 20
              }]
            })
          },
        })
        break;
      default:
        wx.showToast({
          title: '想去哪',
        })
    }
  }
})