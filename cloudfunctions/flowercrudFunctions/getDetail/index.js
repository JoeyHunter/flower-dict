const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

exports.main = async (event, context) => {
  console.log(`数据库单条记录查询：${event.id}`);
  // 返回数据库查询结果
  return await db.collection('flowers').doc(event.id).get();
};
