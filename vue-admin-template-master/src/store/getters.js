const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  xToken: state => state.user.xToken,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  bindPhone: state => state.user.bindPhone,
  isBind: state => state.user.isBind,
  sex: state => state.user.sex,
  phone: state => state.user.phone,
  isMobile: state => state.user.isMobile,
  userId: state => state.user.userId,
  roleId: state => state.user.roleId,
  rosterId: state => state.user.rosterId,
  callStatus: state => state.user.callStatus,
  canUseOc: state => state.user.canUseOc,
  passwordState: state => state.user.passwordState,
  departmentId: state => state.user.departmentId,
  visitGetTotal: state => state.user.visitGetTotal,
  studentInfo: state => state.student.studentInfo,
  studentId: state => state.student.studentId,
  roleCode: state => state.user.roleCode,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  getTime: state => state.utils.getTime,
  getPhone: state => state.phoneLog.getPhone,
  phoneStatus: state => state.phoneLog.phoneStatus,
  phoneStatusObj: state => state.phoneLog.phoneStatusObj,
}
export default getters
