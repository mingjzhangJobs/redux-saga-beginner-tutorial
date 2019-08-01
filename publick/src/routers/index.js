import React, { Fragment } from "react";

import { Router, Route, Switch, Redirect } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import App from "../view/App";
import Loadable from "react-loadable";
import routers from "./routers";
const history = createHistory();

export default class RouterView extends React.Component {
  constructor(props) {
    super(props);
  }

  // onEnter(Component, props) {
  //   const LoadComponent = Loadable({
  //     loader: Component,
  //     loading: PageLoading
  //   });
  //   return <LoadComponent {...props} />;
  // }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <Route
            render={renderProps => {
              return (
                  <App renderProps={renderProps}>
                    <div>mingjzhang</div>
                  </App>
              );
            }}
          />
        </Router>
      </Fragment>
    );
  }
}

