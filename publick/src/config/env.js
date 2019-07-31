import ENV from "./environment";

// 请求头，不需要修改
const REQUEST_BASE_URL = {
    pre: "https://idaspre.cnsuning.com",
    xgpre: "https://idasgpre.cnsuning.com",
    sit: "https://idassit.cnsuning.com",
    prod: "https://zl.suning.com",
    local: "http://idasprecj.cnsuning.com"
  },
// 未登陆跳转用的URL, 不需要修改
LOGIN_URLS = {
    pre:
      "https://mpassportpre.cnsuning.com/ids/login?service=https%3A%2F%2Fidaspre.cnsuning.com%2Fauth%3FtargetUrl%3Dhttps%253A%252F%252Fidaspre.cnsuning.com%252FindexNew.htm&loginTheme=idas",
    xgpre:
      "https://mpassportxgpre.cnsuning.com/ids/login?service=https%3A%2F%2Fidasxgpre.cnsuning.com%2Fauth%3FtargetUrl%3Dhttp%253A%252F%252Fidasxgpre.cnsuning.com%252FindexNew.htm&loginTheme=idas",
    sit:
      "https://mpassportsit.cnsuning.com/ids/login?service=http%3A%2F%2Fidassit.cnsuning.com%2Fauth%3FtargetUrl%3Dhttp%253A%252F%252Fidassit.cnsuning.com%252FindexNew.htm&loginTheme=idas",
    prod:
      "https://mpassport.suning.com/ids/login?service=https%3A%2F%2Fedao.suning.com%2Fauth%3FtargetUrl%3Dhttps%253A%252F%252Fedao.suning.com%252FindexNew.htm&loginTheme=idas"
  };
export const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);
export const httpUrl = () => {
  return REQUEST_BASE_URL[ENV];
};

export const loginUrl = () => {
  return LOGIN_URLS[ENV];
};

// 默认本地，统一开启DEBUG, ajax 默认 jsonp
// 生产默认，关闭DEBUG， ajax 直接请求。
export const DEBUG = isLocalhost ? true : __DEBUG__;

