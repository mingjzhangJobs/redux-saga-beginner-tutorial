import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Affix } from "antd";
import { menu, hoverName } from "util/menu";
import logo from "assets/images/icon/newlogo2.png";
import "./style";

export default class HeaderMenu extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      content,
      shopinfo,
      location: { pathname }
    } = this.props;
    let sname = "",
      surl,
      shopName = "",
      maplist = null,
      name_s = "";
    if (shopinfo.status == 200) {
      sname = shopinfo.content.shopTypeName;
      surl = shopinfo.content.exit_url;
      shopName = shopinfo.content.shopName;
    }
    if (content) {
      maplist = menu(content);
      name_s = hoverName(maplist, pathname);
    }
   
    return (
      <Affix style={{"zIndex":"20"}}>
        <div className="app-header">
          <Row type="flex" justify="space-between">
            <Col span={12}>
              <a className="logo" href="javascript:void(0);">
                <img src={logo}  />
                <span className="header_line">|</span>
                <span className="edaoVersion">极智版</span>
              </a>
              
            </Col>
            <Col span={12} className="text-r">
                <span className="header_right_a ml_15">{shopName}</span>
                <span className="ri_link ml_15">|</span>
                  {
                    maplist==null?'':maplist.map((e,i)=>{
                      if(e.menuName === "订购"){
                          return <a className="header_right_a ml_15" href={e.newurl}>
                                  <span>订购</span>
                                  </a>
                      }
                    })
                  }
                  
                  {/* <a className="header_right_a" href={surl}><span><img src="" style={{verticalAlign: 'middle'}} />消息</span></a> */}
                  <a className="header_right_a ml_15" href={surl}><span >退出</span></a>
            </Col>
          </Row>
          <div className="emenuArea">
              {maplist === null
                ? ""
                : maplist.map((e, i) => {
                    if (e.menuName === "订购") {
                      return false;
                    }
                    return (
                      <a
                      className={
                          e.menuName === name_s ? "on header_a" : "header_a"
                        }
                        href={e.newurl}
                      >
                        <span className="header_aon">{e.menuName}</span>
                      </a>
                    );
                  })}
            </div>
        </div>
      </Affix>
    );
  }
}

