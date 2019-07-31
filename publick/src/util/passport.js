import axios from "axios";
import qs from "qs";
import jsonp from "jsonp";
import jsonpByUrl from "./jsonp";
import { httpUrl, DEBUG, loginUrl } from "config/env";
import log from "./log";
let baseUrl = "/";
const redirectLoginUrl = loginUrl();
const TIME_OUT_VALUE = 5000;
const ApiHttpError = (code, msg) => {
  log("ApiHttpError", code, msg);
};
let loginStatus = null;
/**
 * 判断登陆接口为 baseUrl + authStatus
 * 必须callback,
 * {"authStatusResponse":true,
 * "hasLogin":false, // 是否登陆
 * "principal":"null"} // 用户编号
 */
const checkIsLogin = () => {
  return new Promise((resolve, reject) => {
    try {
      jsonp(
        baseUrl + "authStatus",
        {
          param: "callback",
          timeout: TIME_OUT_VALUE
        },
        (err, data) => {
          if (err) {
            log("error----->", "登陆状态判断失败", err.message);
            resolve({ hasLogin: false });
          } else {
            loginStatus = data; // 缓存登陆信息，防止多次请求
            resolve(data);
          }
        }
      );
    } catch (err) {
      log("error----->", "登陆状态判断失败", err.message);
      resolve({ hasLogin: false });
    }
  });
};

const instance = axios.create({
  method: "POST",
  baseURL: baseUrl,
  responseType: "json",
  timeout: TIME_OUT_VALUE,
  url: "",
  data: {},
  params: {},
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});
instance.interceptors.request.use(
  async config => {
    const data = await checkIsLogin();
    if (!data.hasLogin) {
      window.location.href = redirectLoginUrl;
    }
    log("请求信息-->", config);
    return config;
  },
  error => {
    log("请求错误信息-->", error.message);
    // hack 当Timeout 时尝试重新拿用户状态.
    loginStatus = null;
    return Promise.reject(new ApiHttpError(400, error.message));
  }
);

instance.interceptors.response.use(
  response => {
    log("返回成功信息-->", response.status);
    return response;
  },
  error => {
    log("返回失败信息-->", error.message);
    if (error.response) {
      let { status, statusText } = error.response;
      return Promise.reject(new ApiHttpError(status, statusText));
    } else {
      if (error.message.startsWith("timeout of ")) {
        return Promise.reject(new ApiHttpError(408, "请求超时"));
      } else {
        return Promise.reject(new ApiHttpError(500, error.message));
      }
    }
  }
);

export function param(data, encode = true) {
  let url = "";
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : "";
    url += "&" + k + "=";
    url += encode ? encodeURIComponent(value) : value;
  }
  return url ? url.substring(1) : "";
}

/**
 * ajax同域请求
 * @param {object} config 请求参数集合
 */
export const ajaxInSameDomain = config => {
  if (DEBUG) {
    baseUrl = httpUrl();
    config.url = config.url.replace(".htm", "Test.htm");
    config.url += "?" + param(config.data);
    log("ajax同域请求--->config", config);
    return new Promise((resolve, reject) => {
      try {
        jsonp(
          baseUrl + config.url,
          {
            param: "jsonpCallback",
            timeout: TIME_OUT_VALUE
          },
          (err, data) => {
            if (err) {
              log("error----->", err.message);
              reject(null);
            } else {
              log("获取成功信息---->", data);
              resolve(data);
            }
          }
        );
      } catch (err) {
        log("error----->", err.message);
        reject(err);
      }
    });
  } else {
    
    config.data = qs.stringify(config.data);
    return instance
      .request(config)
      .then(
        async response => {
          const result = response.data;
            log("获取成功信息---->", response);
            if (result == null) {
              return { status: 200, content: null };
            } else {
              return result;
            }
          // if (response.idsIntercepted) {
          //   const logindata = await checkIsLogin();
          //   //如果当前资源在网关策略中且当前状态未知，先检测状态，没有状态跳转页面
          //   if (response.policy == "GATEWAY" && response.status == "UNKNOWN") {
          //     log("policy:", policy, ",status:", status);

          //     if (!logindata.hasLogin) {
          //       window.location.href = redirectLoginUrl;
          //     }
          //   }
          //   //如果当前资源受限,
          //   if ((response.policy = "RESTRICTED")) {
          //     //且当前状态为unlogin，没有登录跳转页面
          //     if (response.status == "ANONYMOUS") {
          //       log("policy:", policy, ",status:", status);
          //       if (!logindata.hasLogin) {
          //         window.location.href = redirectLoginUrl;
          //       }
          //     } else if (response.status == "UNKNOWN") {
          //       //且当前状态未知，那么首先要检测hasLogin的状态，没有登录跳转页面
          //       log("policy:", policy, ",status:", status);
          //       if (!logindata.hasLogin) {
          //         window.location.href = redirectLoginUrl;
          //       }
          //     }
          //   }
          //   log("非法状态");
          // } else {
            
          // }
        },
        err => {
          log("error----->", err);
          
          return err;
        }
      )
      .catch(err => {
        log("catch----->", err);
        
        return err;
      });
  }
};
/**
 * ajax跨域请求
 *
 * callback 名称是在参数也就是 ?后面里指定的用这个
 * @param {object} config 请求参数集合
 *
 * callbackParam  定制callback  param
 */
export const ajaxCrossDomain = (config) => {
  if (!config.data) {
    config.data = {};
  }
  if(config.encode === undefined){
      config.encode = true
  }

  // config.data.crossDomainJsonpRequest = true
  config.url += "?" + param(config.data, config.encode);
  return new Promise((resolve, reject) => {
    try {
      jsonp(
        config.url,
        {
          timeout: TIME_OUT_VALUE
        },
        (err, data) => {
          log("ajaxCrossDomain", err, data);
          if (err) {
            log("error----->", err.message);
            reject(data);
          } else {
            log("获取成功信息---->", data);
            resolve(data);
          }
        }
      );
    } catch (err) {
      log("error----->", err.message);
      reject(err);
    }
  });
};

/**
 * ajax跨域请求, callback 名称是在url 里指定的用这个
 * @param {object} config 请求参数集合
 *
 * callbackFunName  定制callback 回来的function 内容
 */
export const ajaxCrossDomainByUrl = config => {
  // if(!config.data){
  //     config.data = {}
  // }
  // config.data.crossDomainJsonpRequest = true
  // config.url += '?' + param(config.data)
  config.callbackFunName = config.callbackFunName || "callback";
  return new Promise((resolve, reject) => {
    try {
      jsonpByUrl(
        config.url,
        {
          callbackFunName: config.callbackFunName,
          timeout: TIME_OUT_VALUE
        },
        (err, data) => {
          if (err) {
            log("error----->", err.message);
            resolve(data);
          } else {
            log("获取成功信息---->", data);
            resolve(data);
          }
        }
      );
    } catch (err) {
      log("error----->", err.message);
      reject(err);
    }
  });
};
export default ajaxInSameDomain;

