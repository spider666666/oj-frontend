import ACCESSENUMS from "@/access/accessEnums";

/**
 * 判断当前用户是否有权限访问某个页面
 *
 * @param loginUser 当前用户的登入信息
 * @param access 当前路由需要的权限
 */
const checkAccess = (loginUser: any, access = ACCESSENUMS.NO_LOGIN) => {
  //获取用户的登入权限,这里会设置一个默认值，防止访问不到，同时也约定好，在更新role的时候以该字段作为具有的权限
  const userLoginAcess = loginUser?.userRole ?? ACCESSENUMS.NO_LOGIN;
  //如果需要的权限是为登入状态，那么直接放行即可
  if (access === ACCESSENUMS.NO_LOGIN) {
    return true;
  }
  //如果当前的状态是用户状态，需要登入才能放行
  if (access === ACCESSENUMS.USER) {
    //如果为登入，则不放行
    if (userLoginAcess === ACCESSENUMS.NO_LOGIN) {
      return false;
    }
    return true;
  }
  //如果要求是管理权限，同样的操作执行
  if (access === ACCESSENUMS.ADMIN) {
    //如果不是管理员权限，则不能访问
    if (userLoginAcess !== ACCESSENUMS.ADMIN) {
      return false;
    }
    return true;
  }
};

export default checkAccess;
