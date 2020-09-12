// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
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
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
try {
  let result
  const signuptotal = await db.collection('signup').where({openid:wxContext.OPENID,signup_id:event.signup_id}).count()

  if(signuptotal.total >0){
    result={
      success:false,
      error:'你已经报名了'
    }
    return result
  }else{
    return await db.collection('signup').add({
      data:{
        openid:wxContext.OPENID,
        createtime: formatTime(new Date(Date.now() + (8 * 60 * 60 * 1000))),
        college:event.college,
        signup_id:event.signup_id,
        phoneNum:event.mobile,
        notes:event.notes,
        stu_Num:event.xh,
        realName:event.rn,
        sex:event.sex,
        class:event.class
      }
    }).then(res=>{
      
      if(res.errMsg == 'collection.add:ok'){
          return result = {
            success:true
          }
      }
    })
  }
  
} catch (error) {
  return error
}

}