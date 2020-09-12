// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let pageIndex = event.pageIndex ? event.pageIndex : 1; //分页页码，默认1
  let pageSize = event.pageSize ? event.pageSize : 10; //分页数量，默认10
  let filter = event.filter ? event.filter : null; //筛选条件, 格式{_id:12345} 
try {
 
  const TotalResultNumber =  await db.collection('signup').count();
  const total = TotalResultNumber.total
  let totalPage = Math.ceil(total/10);
  let hasMore;
if(pageIndex > totalPage || pageIndex == totalPage){
  hasMore = false
}else{
  hasMore = true
}
let result = {data:[]}
const rows = await db.collection('signup').orderBy('sort','desc').orderBy('createtime','desc').skip((pageIndex-1) * pageSize).limit(pageSize).get().then(res => {
  result.hasMore = hasMore;
  result.data = res.data
  
 })
 for(let i=0;i<result.data.length;i++){
  const signup = await db.collection('station').where({_id:result.data[i].signup_id}).get().then(res=>{
    result.data[i].stationinfo = res.data[0]
  })

 }

 return result
} catch (error) {
  console.log(error)
}
}