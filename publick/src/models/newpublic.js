import { ajaxInSameDomain } from "util/passport";
import { getMemberInfo, findMenus } from "config/UrlPath";
import { INIT_STATE } from "config/Config";

export const newpublic = {
  state: {
    menu: INIT_STATE,
    userinfo: INIT_STATE
  },
  reducers: {
    setValue(state, payload) {
      const data = {
        ...state
      };
      data[payload.name] = payload.data;
      return data;
    }
  },
  effects: {
    async getMenu() {
      return new Promise(async (resolve, reject) => {
        const datas = await ajaxInSameDomain({
          url: findMenus
        });

        this.setValue({
          name: "menu",
          data: datas
        });
        resolve(datas);
      });
    },
    async getUserinfo() {
      return new Promise(async (resolve, reject) => {
        const datas = await ajaxInSameDomain({
          url: getMemberInfo
        });

        this.setValue({
          name: "userinfo",
          data: datas
        });
        resolve(datas);
      });
    }
  }
};

