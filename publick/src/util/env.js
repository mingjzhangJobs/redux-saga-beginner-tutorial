import log from "./log";

const REQUEST_BASE_URL = {
  dev: "http://edao.suning.com/",
  pre: "https://sdaspre.cnsuning.com/",
  xgpre: "https://sdasxgpre.cnsuning.com/",
  sit: "http://sdassit.cnsuning.com",
  prd: "http://edao.suning.com"
};

const LOGIN_URLS = {
  dev: "http://edao.suning.com/",
  pre: "https://sdaspre.cnsuning.com/",
  xgpre: "https://sdasxgpre.cnsuning.com/",
  sit:"https://sdassit.cnsuning.com/",
  prd:"http://edao.suning.com/"
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
export const httpUrl = _env => {
  log("httpUrl", _env, REQUEST_BASE_URL[_env]);
  return REQUEST_BASE_URL[_env];
};

export const loginUrl = env => {
  log("loginUrl", LOGIN_URLS[env]);
  return LOGIN_URLS[env];
};
export const DEBUG = isLocalhost ? true : __DEBUG__;

