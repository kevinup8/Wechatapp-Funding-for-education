// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 数据库链接
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


  try {


  
 return await  db.collection('feeling').add({
      data: {
        create_time: formatTime(new Date(Date.now() + (8 * 60 * 60 * 1000))),
        zan: 0,
        pnum:0,
        openid: wxContext.OPENID,
        content:event.content,
        image:event.image,
        type:event.type,
        status:0,
        update_time:formatTime(new Date(Date.now() + (8 * 60 * 60 * 1000)))
      }
    })
  } catch (e) {
    console.error(e)
  }
}