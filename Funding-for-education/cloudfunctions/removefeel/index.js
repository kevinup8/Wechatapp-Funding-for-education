// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
try {
  let result = {}
 const ac = await db.collection('feeling').where({_id:event.id,openid:wxContext.OPENID}).remove().then(res=>{
  if(res.errMsg = 'collection.remove:ok' ){
    result.success = true
  }
  })

  return result
} catch (error) {
  console.log(error)
}
  
}