import { ajaxInSameDomain,ajaxCrossDomainByUrl } from "util/passport";
import { industryR_brandF_table_url,industryR_brandF_table,industryR_brandF_brand,industryR_brandF_goods,industryR_brandF_shop,industryR_brandF_price,industryR_brandF_area } from "config/UrlPath";
import { INIT_STATE } from "config/Config";
import { getImgPath } from "util/dataUtils";
export const industryRBrandF = {
  state: {
    tableData: INIT_STATE,
    brand: INIT_STATE,
    goods: INIT_STATE,
    shop: INIT_STATE,
    price: INIT_STATE,
    area: INIT_STATE,
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
    async TableData(param) {
      return new Promise(async (resolve, reject) => {
        const datas = await ajaxInSameDomain({
          url: industryR_brandF_table,
          data: param
        });
        let data_new = {...datas};
        if( data_new && data_new.status===200 && data_new.content && data_new.content.list && data_new.content.list.length > 0 ){
          let arr = data_new.content.list;
          let arr_new = arr.concat();
          let string_req = '';
          for( var i = 0; i < arr.length; i++ ){
            let obj_this = arr[i];
            let gdsId = obj_this.GENERAL_GDS_CD?obj_this.GENERAL_GDS_CD:'';
            if( i == arr.length - 1 ){
              string_req = string_req + '0000000000-' + gdsId.padStart(18,'0') + '-0-1'
            }else{
              string_req = string_req + '0000000000-' + gdsId.padStart(18,'0') + '-0-1,'
            }
          }
          //请求图片地址
          let result = '';
          if( param.title === 'goods' ){
            result = await ajaxCrossDomainByUrl({
              url:document.location.protocol+'//' + getImgPath()+'/mainpicture/mpBatchCallback/batchGetByLocation/' + string_req + '.jsonp',
              callbackFunName:'mpBatchCallback'
            });
          }
          
          //生成新的结果
          if( result ){
            for( var i = 0; i < arr.length; i++ ){
              arr_new[i]['GDS_LOGO'] = '';
              let obj_this = result[i];
              if(obj_this&&obj_this.errCode==0 && obj_this.pictureUrl!="" && obj_this.pictureUrl!=null && obj_this.domain!="" && obj_this.domain!=null){
                arr_new[i]['GDS_LOGO'] = document.location.protocol+'//'+obj_this.domain+obj_this.pictureUrl+"_60w_60h";;
              }
            }
          }
          data_new.content.list = arr_new;
        }
        
        this.setValue({
          name: "tableData",
          data: data_new
        });
        resolve(data_new);
      });
    },
    async BrandSearch(param) {
      return new Promise(async (resolve, reject) => {
        const datas = await ajaxInSameDomain({
          url: industryR_brandF_brand,
          data: param
        });
        this.setValue({
          name: "brand",
          data: datas
        });
        resolve(datas);
      });
    },
    async GoodsSearch(param) {
      return new Promise(async (resolve, reject) => {
        const datas = await ajaxInSameDomain({
          url: industryR_brandF_goods,
          data: param
        });
        this.setValue({
          name: "goods",
          data: datas
        });
        resolve(datas);
      });
    },
    async ShopSearch(param) {
      return new Promise(async (resolve, reject) => {
        const datas = await ajaxInSameDomain({
          url: industryR_brandF_shop,
          data: param
        });
        this.setValue({
          name: "shop",
          data: datas
        });
        resolve(datas);
      });
    },
    async PriceRange(param) {
      return new Promise(async (resolve, reject) => {
        const datas = await ajaxInSameDomain({
          url: industryR_brandF_price,
          data: param
        });
        this.setValue({
          name: "price",
          data: datas
        });
        resolve(datas);
      });
    },
    async AreaRange(param) {
      return new Promise(async (resolve, reject) => {
        const datas = await ajaxInSameDomain({
          url: industryR_brandF_area,
          data: param
        });
        this.setValue({
          name: "area",
          data: datas
        });
        resolve(datas);
      });
    },
  }
};

