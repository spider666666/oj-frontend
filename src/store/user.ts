// initial state
//记录需要保存的状态信息
import { StoreOptions } from "vuex";
import { UserControllerService } from "../../generated";
import ACCESSENUMS from "@/access/accessEnums";

export default {
  namespaced: true,
  state: () => ({
    //里面保存的是对象(默认数据)
    userLogin: {
      userName: "未登入",
    },
  }),
  // actions
  //执行异步操作
  actions: {
    //直接定义方法体，不需要考虑返回值的数据类型
    //todo改成从远程获取信息
    async getUserLogin({ commit, state }, payload): Promise<void> {
      //获取登入信息
      const ret = await UserControllerService.getLoginUserUsingGet();
      //如果响应成功
      if (ret.code === 0) {
        commit("updateUserLogin", ret.data); //直接返回信息即可
      } else {
        commit("updateUserLogin", {
          ...state.userLogin,
          userRole: ACCESSENUMS.NO_LOGIN,
        });
      }

      commit("updateUserLogin", payload);
    },
  },
  //声明增删查改的方法
  mutations: {
    //直接定义方法体
    updateUserLogin(state, payload) {
      state.userLogin = payload;
    },
  },
} as StoreOptions<any>;

//以上报错的原因均是未定义数据类型
