const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

exports.main = async (event, context) => {
  // key
  switch (event.key) {
    case 'id':
      console.log('searchRecord:',event.id);
      return await db.collection('flowers').where({
        id: event.id
      }).get();
    case 'family':
      console.log('searchRecord:', event.family);
      return await db.collection('flowers').where({
        family: event.family
      }).get();
    case 'genus':
      console.log('searchRecord:', event.genus);
      return await db.collection('flowers').where({
        genus: event.genus
      }).get();
  }
};
