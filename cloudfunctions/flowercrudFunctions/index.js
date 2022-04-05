// 云函数入口文件
const cloud = require('wx-server-sdk')

const getCollection = require('./getCollection/index')
const getOpenId = require('./getOpenId/index')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.type) {
        case 'getOpenId':
            return await getOpenId.main(event, context);
        case 'getCollection':
            return await getCollection.main(event, context);
    }
}