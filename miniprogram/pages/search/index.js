Page({
  data: {
    haveGetRecord: false,
    showRecord: true,
    record: '',
    tabTitle: [
      '全部',
      '蔷薇科',
      '百合科',
      '其它',
    ],
    active: 0
  },
  onLoad(options) {
    console.log('加载 Search 页面...');
    if (!this.data.haveGetRecord){
      this.getRecord();
    }
  },
  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?id=${e.currentTarget.dataset.id}`,
    });
  },
  onChange(event) {
    console.log(event.detail);
    wx.showToast({
      title: `${event.detail.title}`,
      icon: 'none',
    });
  },
  onClickInfo(event) {
    this.jumpPage(event);
  },
  getRecord() {
    wx.showLoading({
      title:'Loading...'
    });
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
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      wx.hideLoading();
    });
  },
  clearRecord() {
    this.setData({
      haveGetRecord: false,
      record: ''
    });
  }
});
