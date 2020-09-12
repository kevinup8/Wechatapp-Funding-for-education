// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _ = db.command
  try {
    let result = {}
    const ac = await db.collection('zan').where({openid:wxContext.OPENID,feel_id:event.feel_id}).count();
    
    if(ac.total>0){
      result.success = false;
      result.error = '你已经赞过此条动态'
    }else{
      const cc = await db.collection('zan').add({
        data:{
          create_time: formatTime(new Date(Date.now() + (8 * 60 * 60 * 1000))),
          feel_id:event.feel_id,
          openid:wxContext.OPENID
        }
      }).then(res=>{

      })
      const bc = await db.collection('feeling').where({_id:event.feel_id}).update({
        data:{
          zan: _.inc(1)
        }
      }).then(res=>{
        console.log(res)
        if(res.errMsg = 'collection.update:ok' && res.stats.updated == 1){
          result.success = true
        }
      })


    }
  return result
  } catch (error) {
    
  }
}