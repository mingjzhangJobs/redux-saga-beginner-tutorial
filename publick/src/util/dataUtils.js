import moment from "moment";
import numeral from "numeral";

export const formatAxisNumber = number => {
  if (!number || parseInt(number) <= 1000) {
    return number;
  } else {
    if (1000 < parseInt(number) && parseInt(number) < 1000000) {
      console.log("k");
      return `${parseInt(number) / 1000}K`;
    } else {
      console.log("m");
      return `${parseInt(number) / 1000000}M`;
    }
  }
};

export const getPrevDay = date => {
  return moment(date)
    .subtract(1, "day")
    .format("YYYY-MM-DD");
};

const wiks = wh => {
  return wh * 1 < 10 ? "0" + wh : wh;
};

export const showTimeFunc = (s, dataM) => {
  if (dataM === "day") {
    return `${moment(s).format("YYYY年MM月DD日")} ${isDay(s)}`;
  } else if (dataM === "week") {
    let newS = s.split(" ")[0];
    return `${moment(newS).format("YYYY")}年 第${wiks(moment(newS).week())}周`;
  } else if (dataM === "month") {
    return `${moment(s).format("YYYY年MM月")}`;
  } else if (dataM === "RT") {
    return `${moment(s).format("YYYY年MM月DD日 HH:mm:ss")}`;
  } else {
    return `${s}`;
  }
};
export const isDateForm = s => {
  return moment(s, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");
};
/**
 * 数据格式化
 *
 */
export function formatNumber(type, value) {
  switch (type) {
    case 1: //1为整数加千位分隔符
      return value == null ||
        value == "-" ||
        value === undefined ||
        value === ""
        ? "-"
        : numeral(value).format("0,0");
    case 2: //保留两位小数千位分隔符
      return value == null ||
        value == "-" ||
        value === undefined ||
        value === ""
        ? "-"
        : numeral(value).format("0,0.00");
    case 3: //百分比千位分隔符
      return value == null ||
        value == "-" ||
        value === undefined ||
        value === ""
        ? "-"
        : numeral(value).format("0,0.00%");
    case 4:
      return value == null ||
        value == "-" ||
        value === undefined ||
        value === ""
        ? "-"
        : numeral(value).format("0,0.0000");
    case 5: //百分比千位分隔符
      return value == null ||
        value == "-" ||
        value === undefined ||
        value === ""
        ? "-"
        : numeral(value).format("0,0.0%");
    case 6:
      return value == null ||
        value == "-" ||
        value === undefined ||
        value === ""
        ? "-"
        : numeral(value).format("0,0.000%");
    default:
      return value == null ||
        value == "-" ||
        value === undefined ||
        value === ""
        ? "-"
        : value;
  }
}
/**
 * 排序
 */
export function sort(ops) {
  var str = "";
  if (ops === "ascend") {
    str = "asc";
  } else {
    str = "desc";
  }
  return str;
}
export const isDay = s => {
  let str = moment(s).day();
  if (str === 0) {
    return "星期日";
  } else if (str === 1) {
    return "星期一";
  } else if (str === 2) {
    return "星期二";
  } else if (str === 3) {
    return "星期三";
  } else if (str === 4) {
    return "星期四";
  } else if (str === 5) {
    return "星期五";
  } else if (str === 6) {
    return "星期六";
  }
};
//将对象转换为查询字符串
export function obj2SearchStr(obj) {
  var str = "";
  if (obj) {
    for (var i in obj) {
      str += "&" + i + "=" + obj[i];
    }
  }
  str = str.replace(/^&/, "?");
  return str;
}

//百分比转化
export const toPercent = n => {
  return n == null || n === undefined || n === ""
    ? "0%"
    : (Math.round(n * 10000) / 100).toFixed(2) + "%";
};

export function getSorter(data, key, type) {
  data.sort((a, b) => {
    return type == "asc" ? a[key] - b[key] : b[key] - a[key];
  });
  return data;
}

//去除前面符号
export const clqz = str => {
  return str != undefined ? String(str).replace(/-/, "") : "";
};

//字符串截取
export const handString = (str, len) => {
  len = len ? len : 20; //初始化长度
  if (str && str.length > len) {
    str = str.substring(0, len) + "...";
  }
  return str;
};

export const checkUrlIsExist = (menu, url) => {
  if (!menu || menu.length == 0) {
    return false;
  }
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].url.indexOf(url) > -1) {
      return true;
    } else {
      continue;
    }
  }
  return false;
};

//设置cookie
export const addCookie = (name, value, time = 1) => {
  if (time == 0) {
    document.cookie = name + "=" + escape(value) + ";path=/";
  } else {
    var Days = 1; //默认一天
    if (/.s|S$/.test(time)) {
      logs("秒");
      time = parseFloat(time);
      Days = time * 1000; //秒
    } else if (/.m|M$/.test(time)) {
      logs("分");
      time = parseFloat(time);
      Days = time * 60 * 1000; //分
    } else if (/.h|H$/.test(time)) {
      logs("时");
      time = parseFloat(time);
      Days = time * 60 * 60 * 1000; //时
    } else if (/.d|D$/.test(time)) {
      logs("天");
      time = parseFloat(time);
      Days = time * 24 * 60 * 60 * 1000; //天
    } else {
      Days = Days * 24 * 60 * 60 * 1000; //默认
    }
    var exp = new Date();
    exp.setTime(exp.getTime() + Days);
    document.cookie =
      name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  }
};
//获取cookie
export const getCookie = name => {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
};
export function getFormartResultByStatus(data) {
  const re = {
    status: -1,
    list: null
  };
  if (!data) {
    return {
      originData: {
        content: null,
        status: 500
      },
      data: re
    };
  }
  data.status = data && data.status ? data.status : 500; // 默认500

  switch (data.status) {
    case 200: // 成功
      re.status = 1;
      re.list = data.content;
      if (data.content === null) {
        re.status = -2;
        re.list = null;
      }
      break;
    case 101:
      re.status = -5;
      re.list = data.content;
      break;
    case 102:
      re.status = -6;
      re.list = data.content;
      break;
    case 390:
      re.status = -39;
      re.list = data.content;
      break;
    default:
      re.status = -1;
      re.list = null;
      break;
  }

  return {
    originData: data,
    data: re
  };
}

export const showTimeOps = s => {
  return moment(s)
    .subtract(1, "w")
    .format("YYYY-MM-DD");
};

export const upper = req => {
  switch (req) {
    case 1:
      return "一";
    case 2:
      return "二";
    case 3:
      return "三";
    case 4:
      return "四";
    case 5:
      return "五";
  }
};

export const typeEyeTName = req => {
  switch (req) {
    case "1":
      return "成交金额";
    case "2":
      return "在线SKU数";
    case "3":
      return "动销SKU数";
    case "4":
      return "动销率";
  }
};

export const typeEyeName = req => {
  switch (req) {
    case "1":
      return "一级类目";
    case "2":
      return "二级类目";
    case "3":
      return "三级类目";
    case "4":
      return "四级类目";
  }
};

/* 千位分隔符， 带2位小数 */
export const formatCurrencyData1Two = num => {
  if (null == num || typeof num == "undefined") {
    return "-";
  }

  num = num.toString().replace(/\$|\,/g, "");
  var isFloat = num.indexOf(".") > -1 ? true : false;
  if (isNaN(num)) num = "0";
  let sign = num == (num = Math.abs(num));
  num = Math.floor(num * 100 + 0.50000000001);
  let cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10) cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num =
      num.substring(0, num.length - (4 * i + 3)) +
      "," +
      num.substring(num.length - (4 * i + 3));
  if (!isFloat) {
    return (sign ? "" : "-") + num + ".00";
  }
  if (isFloat) {
    return (sign ? "" : "-") + num + "." + cents;
  }
};
//科学计算发
export const formatCurrencyData = num => {
  if (null == num || typeof num == "undefined") {
    return "-";
  }

  num = num.toString().replace(/\$|\,/g, "");
  var isFloat = num.indexOf(".") > -1;
  if (isNaN(num)) num = "0";
  let sign = num == (num = Math.abs(num));
  num = Math.floor(num * 100 + 0.50000000001);
  let cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10) cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num =
      num.substring(0, num.length - (4 * i + 3)) +
      "," +
      num.substring(num.length - (4 * i + 3));
  if (!isFloat) {
    return (sign ? "" : "-") + num;
  }
  if (isFloat) {
    return (sign ? "" : "-") + num + "." + cents;
  }
};

export const dateHandler = (dateMode, date) => {
  if (dateMode == "day") {
    return date;
  }
  if (dateMode == "week") {
    return moment(date.split(" ")[0], "YYYY-MM-DD")
      .endOf("week")
      .format("YYYY-MM-DD");
  }
  if (dateMode == "month") {
    return moment(date + "-01", "YYYY-MM-DD")
      .endOf("month")
      .format("YYYY-MM-DD");
  }
};

export const getCurrentMonthLastDay = date => {
  var date = new Date(date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  var day = new Date(year, month, 0);
  return year + "-" + month + "-" + day.getDate();
};

export const getImgPath=()=>{
  let _hostName = document.location.hostname,
  _prd_reg = /^\w*?.suning.com$/, // 一般生产环境的域名
  _xgpre_reg = /^\w*?xgpre.cnsuning.com$/,  // 新港pre环境的域名
  _pre_reg = /^\w*?pre.cnsuning.com$/,  // 一般pre环境的域名
  _sit_reg = /^\w*?sit.cnsuning.com$/,  // 一般sit环境的域名
  sa_ip = "";
  if(_prd_reg.test(_hostName)){
      sa_ip = "pcpsimage.suning.cn";
  } else if(_xgpre_reg.test(_hostName)){
      sa_ip = "10.242.178.182";
  }else if(_pre_reg.test(_hostName)){
      sa_ip = "10.37.87.24";
  } else if(_sit_reg.test(_hostName)){
      sa_ip = "10.47.145.133";
  } else {
      sa_ip = "pcpsimage.suning.cn";
  }
  return sa_ip;
}
