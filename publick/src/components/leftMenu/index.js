import React from "react";
import { Link } from "react-router-dom";
import { menu, hoverName } from "util/menu";
import { leftMenuIcon } from "config/Config";
// import "../../assets/styles/fonts.less";
// import "./style";

export default class LeftMenu extends React.PureComponent {
  render() {
    let {
      location: { pathname },
      content
    } = this.props;
    let maplist = null,
      hoverNameOn = "",
      pathNames = pathname;

    if (pathname === "/shopver/esk/toKeyDetail") {
      pathNames = "/shopver/esk/toSearchKeyInfo";
    } else if (pathname === "/shopver/esk/detailOfCommoditySearch") {
      pathNames = "/shopver/esk/getCommoditySubjectAnalysis";
    } else {
      pathNames = pathname;
    }

    maplist = menu(content);
    hoverNameOn = hoverName(maplist, pathname);
    let menus =
      maplist === null
        ? ""
        : maplist.map((k, v) => {
            if (k.menuName === hoverNameOn) {
              return (
                <div className="leftMenu">
                  {k.children.map((k1, v1) => {
                    return (
                      <div>
                        {k1.url === "" ? (
                          <h3 className="h3">
                            <i
                              className={`leftMenu_icon ${
                                leftMenuIcon[k1.menuName]
                              }`}
                            />
                            <span className="leftMenu_one">{k1.menuName}</span>
                          </h3>
                        ) : (
                          <p className="dd_two">
                            <a
                              href={k1.url}
                              className={
                                k1.url.indexOf(pathNames) === -1 ? "" : "on"
                              }
                            >
                              {k1.menuName}
                            </a>
                          </p>
                        )}
                        {k1.children.map((k2, v2) => {
                          if (k2.children.length > 0) {
                            return (
                              <div>
                                <p className="dd_two">
                                  <span>{k2.menuName}</span>
                                </p>
                                {k2.children.map((k3, v3) => {
                                  return (
                                    <p className="dd_thress">
                                      <a
                                        href={k3.url}
                                        className={
                                          k3.url.indexOf(pathNames) === -1
                                            ? ""
                                            : "on"
                                        }
                                      >
                                        {k3.menuName}
                                      </a>
                                    </p>
                                  );
                                })}
                              </div>
                            );
                          } else {
                            return (
                              <p className="dd_two">
                                <a
                                  href={k2.url}
                                  className={
                                    k2.url.indexOf(pathNames) === -1 ? "" : "on"
                                  }
                                >
                                  {k2.menuName}
                                </a>
                              </p>
                            );
                          }
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            }
          });
    return <div>{menus}</div>;
  }
}

