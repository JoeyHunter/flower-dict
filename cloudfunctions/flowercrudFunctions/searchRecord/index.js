const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

exports.main = async (event, context) => {
  // key
  switch (event.key) {
    case 'id':
      return await db.collection('flowers').doc(event.id).get();
    case 'family':
      return await db.collection('flowers').doc(event.family).get();
    case 'genus':
      return await db.collection('flowers').doc(event.genus).get();
  }
};
