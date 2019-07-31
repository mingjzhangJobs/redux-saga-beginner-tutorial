import { init } from "@rematch/core";
import logger from "redux-logger";
import models from "../models";
import { DEBUG } from "util/env";
const middlewares = [];
if (DEBUG) {
  // 日志插件
  middlewares.push(logger);
}
function createStore(initialState) {
  const store = init({
    models,
    redux: {
      initialState,
      middlewares: [...middlewares],
      rootReducers: {}
    },
    plugins: []
  });
  return store;
}

const initialState = window.__INITIAL_STATE__ || {};
const store = createStore(initialState);
/** 默认导出 store
 *  getState, 全局的getState 对象
 *  dispatch 全局的dispatch 对象
 */
export const { getState, dispatch } = store;
export default store;

