Page({
  data: {
    haveGetRecord: false,
    showRecord: true,
    records: [''],
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
    if (!this.data.haveGetRecord) {
      this.getAllRecord();
      // this.getTabRecord();
    }
  },
  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?id=${e.currentTarget.dataset.id}`,
    });
  },
  onChange(event) {
    console.log('onChange',event.detail.title);
    // wx.showToast({
    //   title: `${event.detail.title}`,
    //   icon: 'none',
    // });
  },
  onClickInfo(event) {
    this.jumpPage(event);
  },
  getAllRecord() {
    wx.showLoading({
      title: 'Loading...'
    });
    wx.cloud.callFunction({
      name: 'flowercrudFunctions',
      data: {
        type: 'getCollection'
      }
    }).then((resp) => {
      this.setData({
        haveGetRecord: true,
        'records[0]': resp.result.data
      })
      this.getTabRecord();
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      wx.hideLoading();
    });
  },
  getTabRecord() {
    var that = this;
    var records = that.data.records;
    console.log('getting record from records...');
    if (records[0]) {
      var tabs = that.data.tabTitle;
      tabs.forEach(tab => {
        switch(tab){
          case '全部':
            break;
          case '其它':
            var result = records[0].filter(record => record.family != tabs[1] && record.family!= tabs[2]);
            records.push(result);
          default:
            var result = records[0].filter(record => record.family == tab);
            records.push(result);
        }
      });
      console.log(records);
      this.setData({
        records: records
      });
      console.log('getTabRecord: 加载数据成功');
    }else{
      console.log('getTabRecord: 加载数据失败');
    }
  },
  clearRecord() {
    this.setData({
      haveGetRecord: false,
      records: ['']
    });
  }
});
