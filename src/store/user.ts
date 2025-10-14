// initial state
//记录需要保存的状态信息
import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    //里面保存的是对象(默认数据)
    userLogin: {
      userName: "未登入",
      role: "noAdmin",
    },
  }),
  // actions
  //执行异步操作
  actions: {
    //直接定义方法体，不需要考虑返回值的数据类型
    //todo改成从远程获取信息
    async getUserLogin({ commit }) {
      commit("updateUserLogin", { userName: "CN" });
    },
  },
  //声明增删查改的方法
  mutations: {
    //直接定义方法体
    updateUserLogin(state, pyload) {
      state.userLogin = pyload;
    },
  },
} as StoreOptions<any>;

//以上报错的原因均是未定义数据类型
