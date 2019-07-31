import React from "react";
import { connect } from "react-redux";
import models from "../models";

// 公共state modles 名称
const APP_COMMON_SPACE_NAME = "newpublic";

/**
 * 生产state
 * @param {*} stateKeys state key 数组，从modles 中拿取
 * @param {*} modleName 模块名称
 * @param {*} state state 对象
 */
const genState = (stateKeys, modleName, state) => {
  const s = {};
  stateKeys.map(function(value) {
    s[value] = state[modleName][value];
  });
  return s;
};
/**
 * 生成 mapState
 * @param {*} pageName 页面名称, 挂载 props 形如 props[pageName]...
 * @param {*} modleName 模块名称
 */
const getMapState = (pageName, modleName) => {
  return state => {
    // 首先初始化公共state app空间, 所有的公共参数挂在到顶级props[xxx]
    const re = genState(
      Object.keys(models[APP_COMMON_SPACE_NAME].state),
      APP_COMMON_SPACE_NAME,
      state
    );
    if (modleName && modleName !== "" && pageName && pageName !== "") {
      // 每个页面的state 挂载到props[pageName][xx]下
      re[pageName] = genState(
        Object.keys(models[modleName].state),
        modleName,
        state
      );
    }
    return re;
  };
};

/**
 * 生成 action 来 dispatch
 * @param {*} action action 名称
 * @param {*} modleName modle 名称
 * @param {*} dispatch dispatch 对象
 */
const genAction = (action, modleName, dispatch) => {
  return ops => dispatch[modleName][action](ops);
};
/**
 *  生成MapDispatch
 * @param {*} modleName modle 名称
 */
const getMapDispatch = modleName => {
  return dispatch => {
    const re = {};
    // 首先导入app 里的action
    Object.keys(models[APP_COMMON_SPACE_NAME].effects).map(function(action) {
      re[action] = genAction(action, APP_COMMON_SPACE_NAME, dispatch);
    });
    if (modleName && modleName !== "") {
      Object.keys(models[modleName].effects).map(function(action) {
        re[action] = genAction(action, modleName, dispatch);
      });
    }

    return re;
  };
};

/** 统一封装挂在state 和 action
 * @param pageName 页面名称 页面名称用于绑定state 到props[pageName]
 * @param modleName modle名称 必须和 modles 下导出的文件名称一致
 * 不传 modleName 或者pageName 只会绑定公共方法和公共state,
 * 所以要生效同时传，而且不能为空
 */
const modles = (pageName, modleName) => wrappedComponent => {
  const mapState = getMapState(pageName, modleName);
  const apDispatch = getMapDispatch(modleName);
  return connect(
    mapState,
    apDispatch
  )(wrappedComponent);
};
export default modles;

