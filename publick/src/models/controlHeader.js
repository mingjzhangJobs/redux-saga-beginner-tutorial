import { ajaxInSameDomain } from "util/passport";
import { industryR_brandF_auth,industryR_brandF_Time,industryR_brandF_deptCategory,industryR_brandF_bizModel,industryR_brandF_chnlTer,industryR_brandF_place } from "config/UrlPath";
import { INIT_STATE } from "config/Config";
export const controlHeader = {
  state: {
    auth: INIT_STATE,
    time: INIT_STATE,
    deptCategory: INIT_STATE,
    bizModel: INIT_STATE,
    place: INIT_STATE,
    chnlTer: INIT_STATE
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
    async Auth(param) {
      return new Promise(async (resolve, reject) => {
        const datas = await ajaxInSameDomain({
          url: industryR_brandF_auth,
          data: param
        });
        this.setValue({
          name: "auth",
          data: datas
        });
        resolve(datas);
      });
    },
    async DeptCategory(param) {
      return new Promise(async (resolve, reject) => {
        const datas = await ajaxInSameDomain({
          url: industryR_brandF_deptCategory,
          data: param
        });
        this.setValue({
          name: "deptCategory",
          data: datas
        });
        resolve(datas);
      });
    },
    async BizModel(param) {
      return new Promise(async (resolve, reject) => {
        const datas = await ajaxInSameDomain({
          url: industryR_brandF_bizModel,
          data: param
        });
        this.setValue({
          name: "bizModel",
          data: datas
        });
        resolve(datas);
      });
    },
    async ChnlTer(param) {
      return new Promise(async (resolve, reject) => {
        const datas = await ajaxInSameDomain({
          url: industryR_brandF_chnlTer,
          data: param
        });
        this.setValue({
          name: "chnlTer",
          data: datas
        });
        resolve(datas);
      });
    },
    async PlaceRange(param) {
      return new Promise(async (resolve, reject) => {
        const datas = await ajaxInSameDomain({
          url: industryR_brandF_place,
          data: param
        });
        this.setValue({
          name: "place",
          data: datas
        });
        resolve(datas);
      });
    },
    async getTime(param) {
      return new Promise(async (resolve, reject) => {
        const datas = await ajaxInSameDomain({
          url: industryR_brandF_Time,
          data: param
        });
        this.setValue({
          name: "time",
          data: datas
        });
        resolve(datas);
      });
    },
  }
};

