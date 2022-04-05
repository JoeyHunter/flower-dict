Page({
  data: {
    id: '',
    haveGetRecord: false,
    record: '',
  },
  onLoad(options) {
    console.log('加载 Detail 页面...');
    this.setData({
      id: options.id
    });
    this.getDetail();
    console.log('Detail 页面加载完毕');
  },
  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${e.currentTarget.dataset.id}`,
    });
  },
  getDetail() {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'flowercrudFunctions',
      data: {
        type: 'getDetail',
        id: this.data.id
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
    })
  }
});
