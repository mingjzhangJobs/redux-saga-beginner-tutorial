import React from "react";
import { connect } from "react-redux";
import "./index.less";
import fourZeroFour from "assets/images/img/fourZeroFour.png";

@connect(
  state => ({}),
  model => ({
    actions: {}
  })
)
export default class Notfound extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="FZF VerCenterA">
            <img src={fourZeroFour} />
      </div>
                              
    );
  }
}

