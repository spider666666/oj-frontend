import router from "@/router";
import store from "@/store";
import ACCESSENUMS from "@/access/accessEnums";
import checkAccess from "@/access/checkAccess";
//你遇到的问题是因为在 Vue 组件外部使用了 useRouter() 这样的 Composition API 函数。useRouter()、useStore() 这类函数只能在 Vue 组件的 setup() 函数或 <script setup> 中使用，不能直接在普通的 JavaScript/TypeScript 文件中调用。
//在跳转路由之前进行权限的校验

router.beforeEach(async (to, from, next) => {
  //输出当前的用户信息
  console.log("当前用户信息", store.state.user.userLogin);
  const loginUser = store.state.user.userLogin;

  // // //如果用户之前没有登入，则实现自动登入
  // if (!loginUser || !loginUser.userRole) {
  //   //调用该方法实现用户的自动登入，使用await是为了让用户在登入之后开始调用
  //   await store.dispatch("user/getUserLogin");
  // }

  //接下来判断当前页面是否有登入的权限

  //首先获取登入当前页面的登入权限（这里不是直接调用路由，而是使用原页面）
  const access = (to.meta?.access as string) ?? ACCESSENUMS.NO_LOGIN;
  //如果页面不要求必须登入，登入了表示用户一定会有规则，否则不会登入;
  //如果要求必须登入，那么就必须进行权限的校验
  if (access !== ACCESSENUMS.NO_LOGIN) {
    //判断当前用户的状态(表明未登入)，

    //这里有个小bug,就是对于异步操作后状态未能及时更新的问题，直接调用store中的数据可保证每次访问数据的实时性
    const currentUser = store.state.user.userLogin;
    if (!currentUser || !currentUser.userRole) {
      //跳转到登入页面
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    //登入了查看权限
    if (!checkAccess(currentUser, access)) {
      next("/noAuth");
      return;
    }
  }
  //表明当前页面不需要任何权限就能登入
  next();
});

//统一进行权限的管理，通过拦截器实现
