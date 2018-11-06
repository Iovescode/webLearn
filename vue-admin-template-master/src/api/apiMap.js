export default {
  // 通用API
  'get@teacher_getDate': '/teacher/getDate', // 获取服务器当前时间
  'get@index_searchUser': '/index/searchUser', // 全局搜索
  'get@student_getListProvince': '/student/getListProvince', // 城市
  'get@student_getCity': '/student/getCity', // 市
  'get@student_getArea': '/student/getArea', // 区
  // 登录相关
  'post@passport_login': '/passport/login',
  'post@passport_logout': '/passport/logout',
  // 教师库
  'get@teacher_getList': '/teacher/getList', // 教师列表
  'get@teacher_selectInfo': '/teacher/selectInfo', // 教师列表筛选信息
  'get@teacher_changeAccount': '/teacher/changeAccount', // 教师账号变更
  'post@teacher_changeLesson': '/teacher/changeLesson', // 教师排课变更
  'get@verify_auditDetail': '/verify/auditDetail', // 审核编辑详情页
  'get@teaching_index': '/teaching/index', // 历史授课学员信息
  'get@teaching_statistics': '/teaching/statistics', // 获取教师排课筛选信息
  'get@teacher_lessonSelectInfo': '/teacher/lessonSelectInfo' // 教师信息统计
}
