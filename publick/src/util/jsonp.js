/**
 * url 中指定callback参数
 */

/**
 * Module dependencies
 */

var debug = require("debug")("jsonp");

/**
 * Module exports.
 */

module.exports = jsonp;

/**
 * Callback index.
 */

// var count = 0;

/**
 * Noop function.
 */

function noop() {}

/**
 * JSONP handler
 *
 * Options:
 *  - param {String} qs parameter (`callback`)
 *  - prefix {String} qs parameter (`__jp`)
 *  - name {String} qs parameter (`prefix` + incr)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */

function jsonp(url, opts, fn) {
  if ("function" == typeof opts) {
    fn = opts;
    opts = {};
  }
  if (!opts) opts = {};

  var callbackFunName = opts.callbackFunName || "callback";
  var timeout = null != opts.timeout ? opts.timeout : 60000;
  var enc = encodeURIComponent;
  var target = document.getElementsByTagName("script")[0] || document.head;
  var script;
  var timer;

  if (timeout) {
    timer = setTimeout(function() {
      cleanup();
      if (fn) fn(new Error("Timeout"));
    }, timeout);
  }

  function cleanup() {
    if (script.parentNode) script.parentNode.removeChild(script);
    window[callbackFunName] = noop;
    if (timer) clearTimeout(timer);
  }

  function cancel() {
    if (window[callbackFunName]) {
      cleanup();
    }
  }

  window[callbackFunName] = function(data) {
    debug("jsonp got", data);
    cleanup();
    if (fn) fn(null, data);
  };

  // add qs component
  //   url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
  //   url = url.replace('?&', '?');

  debug('jsonp req "%s"', url);

  // create script
  script = document.createElement("script");
  script.src = url;
  target.parentNode.insertBefore(script, target);

  return cancel;
}

