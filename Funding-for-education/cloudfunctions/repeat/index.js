// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db = cloud.database()
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
  let repeatwho = event.repeatwho ? event.repeatwho : ''; 
  let isseccond = event.isseccond ? event.isseccond : false; 

  try {
    let result = {}
   const ac = await db.collection('discuss').add({
      data:{
        create_time:formatTime(new Date(Date.now() + (8 * 60 * 60 * 1000))),
        feel_id:event.feel_id,
        openid:wxContext.OPENID,
        repeatwho:repeatwho,
        content:event.content,
        isseccond:isseccond
      }
    }).then(res=>{
      
      if(res.errMsg = 'collection.add:ok'){
        result.success = true
      }
    })
    return result
    
  } catch (error) {
    console.log(error)
  }
  
  
}