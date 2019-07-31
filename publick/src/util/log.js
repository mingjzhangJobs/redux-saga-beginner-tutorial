import { DEBUG } from "config/env";
const isChrome = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const ua = window.navigator.userAgent.toLowerCase();
  return ua.match(/chrome\/([\d\.]+)/);
};
const log = (...opt) => {
  if (DEBUG) {
    if (isChrome()) {
      console.log("%c DEBUG: ", "background:#000;color:#00ef14", ...opt);
    } else {
      console.log(" DEBUG: ", ...opt);
    }
  }
};

export default log;

