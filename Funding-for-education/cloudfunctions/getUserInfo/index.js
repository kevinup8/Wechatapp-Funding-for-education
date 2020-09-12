// cloudfunctions/saveUserInfo/index.js

// 引入云函数SDK
const cloud = require('wx-server-sdk')

// 初始化
cloud.init()

// 数据库链接
let db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  // 全局的工具类，在云函数中获取微信的调用上下文
  const wxContext = cloud.getWXContext()

  var openid = event.openid?event.openid:wxContext.OPENID
  // 云数据库操作
  try {
    // 实际注册功能时，应先检测该用户是否已经注册
    
    // 此处操作集合时，请预先在数据库中创建该集合users

    const res = await db.collection('users').where({openid:openid}).get()
    return res.data[0]
    
  } catch (e) {
    console.error(e)
  }
}