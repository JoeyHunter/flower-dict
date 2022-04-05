Page({
  data: {
    haveGetRecord: false,
    record: '',
    msg: [{ title: 'hello' }],
  },
  getRecord() {
    wx.cloud.callFunction({
      name: 'flowercrudFunctions',
      data: {
        type: 'getCollection'
      }
    }).then((resp) => {
      // console.log(resp.result.data);
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
})
