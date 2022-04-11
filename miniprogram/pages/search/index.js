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
    active: 0,
    inputVal: ''
  },
  onLoad(options) {
    console.log('onLoad: Search Page');
    if (!this.data.haveGetRecord) {
      this.getAllRecord();
      // this.getTabRecord();
    }
    this.setData({
      search: this.search.bind(this)
    });
  },
  search(value) {
    console.log(value);
    // var result = [{ text: '搜索结果1', value: 1 }];
    var result = this.getSearchRecord(value);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(result)
      }, 200)
    })
  },
  selectResult(e) {
    console.log('select result', e.detail)
  },
  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?id=${e.currentTarget.dataset.id}`,
    });
  },
  onChange(event) {
    console.log('onChange:', event.detail.title);
  },
  onClickInfo(event) {
    this.jumpPage(event);
  },
  onSearch() {
    var that = this;
    console.log('搜索' + that.data.value);
  },
  onCancel() {
    var that = this;
    console.log('搜索' + that.data.value);
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
    if (records[0]) {
      var tabs = that.data.tabTitle;
      tabs.forEach(tab => {
        switch (tab) {
          case '全部':
            break;
          case '其它':
            var result = records[0].filter(record => record.family != tabs[1] && record.family != tabs[2]);
            records.push(result);
          default:
            var result = records[0].filter(record => record.family == tab);
            records.push(result);
        }
      });
      this.setData({
        records: records
      });
      console.log('getTabRecord: 加载数据成功');
    } else {
      console.log('getTabRecord: 加载数据失败');
    }
  },
  getSearchRecord(searchValue) {
    var that = this;
    var records = that.data.records;
    var results = [];
    if (records[0]) {
      var fullResults = records[0].filter(record => record.family.includes(searchValue) || record.genus.includes(searchValue) || record.name.includes(searchValue) || record.flower_language.includes(searchValue));
      // var result = [{ text: '搜索结果1', value: 1 }];
      for (let i = 0; i < fullResults.length; i++) {
        const result = { text: fullResults[i].name, value: i };
        console.log(result);
        results.push(result);
      }
      console.log('getSearchRecord: 搜索数据成功');
    } else {
      console.log('getSearchRecord: 搜索数据失败');
    }
    console.log(results);
    return results;
  },
  clearRecord() {
    this.setData({
      haveGetRecord: false,
      records: ['']
    });
  }
});
