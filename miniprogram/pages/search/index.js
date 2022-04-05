Page({
  data: {
    haveGetRecord: false,
    showRecord: true,
    record: '',
    powerList: [{
      title: '数据库',
      tip: 'flower data',
      showRecord: false
    }],
  },
  onLoad(options) {
    console.log('加载 Search 页面...');
    if (!this.data.haveGetRecord){
      this.getRecord();
    }
  },
  onClickPowerInfo(e) {
    const index = e.currentTarget.dataset.index;
    const powerList = this.data.powerList;
    powerList[index].showItem = !powerList[index].showItem;
    if (powerList[index].title === '数据库' && !this.data.haveGetRecord) {
      this.getRecord();
    } else {
      this.setData({
        powerList
      });
    }
  },
  jumpPage(e) {
    // console.log(e);
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?id=${e.currentTarget.dataset.id}`,
    });
  },
  getRecord() {
    wx.cloud.callFunction({
      name: 'flowercrudFunctions',
      data: {
        type: 'getCollection'
      }
    }).then((resp) => {
      this.setData({
        haveGetRecord: true,
        record: resp.result.data
      });
    }).catch((e) => {
      console.log(e);
    });
  },
  clearRecord() {
    this.setData({
      haveGetRecord: false,
      record: ''
    });
  }
});
