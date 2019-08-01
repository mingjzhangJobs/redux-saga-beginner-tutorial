import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import RouterView from "./routers";

export default class RootContainer extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <RouterView />
      </Provider>
    );
  }
}