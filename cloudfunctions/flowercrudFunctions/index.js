// 云函数入口文件
const cloud = require('wx-server-sdk')

const getCollection = require('./getCollection/index')
const getOpenId = require('./getOpenId/index')
const getDetail = require('./getDetail/index')
const searchRecord = require('./searchRecord/index')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.type) {
        case 'getOpenId':
            return await getOpenId.main(event, context);
        case 'getCollection':
            return await getCollection.main(event, context);
        case 'getDetail':
            return await getDetail.main(event, context);
        case 'searchRecord':
            return await searchRecord.main(event, context);
    }
}