import Global from './global_variable'
import http from '@/util/http'

export function login(data) {
    
    const url = Global.myURL+'api/user/login'
    //console.log('请求地址是：'+url);
    return http.postJava(url,data)
  }
  
  // 获取用户信息
  export function getUserInfo(token) {
    const url = Global.myURL+'api/user/getUserInfo'
    return http.get_by_token(url,null,token)
  }

  //用户注册信息
  export function regUser(data){
    const url = Global.myURL+'api/user/userReg'
    return http.postJava(url,data)
  }
  
  // 登出
  export function logout(token) {
    const url = Global.myURL+'api/user/logout'
    return http.post_by_token(url,null,token)
  }

  //获取用户列表
  export function getUserList(params){
    const url = Global.myURL+'api/user/getUserList'
    return http.get(url,params)
  }

  //获取用户的级别和 金币
  export function getUserLevel(userid){
    const url = Global.myURL+'api/systemconfig/student/student_info?userId='+userid
    return http.postJava(url,null)
  }

  //更新用户的 级别和 金币接口
  export function UpdateUserInfo(data){
    const url = Global.myURL+'api/systemconfig/student/update_student_levelgold'
    return http.postJava(url,data)
  }

  //添加正确的题目
  export function AddUserQuestionYes(uid,_id){
    const url = Global.myURL+'api/systemconfig/student/add_student_point_yes?userId='+uid+'&titleId='+_id
    return http.postJava(url,null)
  }

  //添加错误的题目
  export function AddUserQuestionNo(data){
    const url = Global.myURL+'api/systemconfig/student/add_student_point_no'
    return http.postJava(url,data)
  }

  //获取用户错题库
  export function GetUserQuestionNo(params){
    const url = Global.myURL+'api/systemconfig/student/student_point_no_Page'
    return http.get(url,params)
  }

  //更改用户信息
  export function SetUserGradeTemId(data){
    const url = Global.myURL+'api/systemconfig/student/update_student_info'
    return http.post(url,data)
  }

