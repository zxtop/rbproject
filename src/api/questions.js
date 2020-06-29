import Global from './global_variable'
import http from '@/util/http'

// 查询所有老师题库出卷在线作题
export function GetPageQuestion(data){
    const url = Global.baseURL+'/api/v1/teacher-questions/error/query'
    return http.post(url,data)
}
