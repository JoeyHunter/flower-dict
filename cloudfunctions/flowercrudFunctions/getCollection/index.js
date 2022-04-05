const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  console.log("数据库查询：flowers");
  // 返回数据库查询结果
  return await db.collection('flowers').get();
};
