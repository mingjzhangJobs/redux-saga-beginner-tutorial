import React from "react";
import modles from "util/modles";
import { Layout,ConfigProvider,Empty,LocaleProvider  } from "antd";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { menu as newMenu } from "util/menu";
import { HeaderMenu, FooterContent, LeftMenu,PageLoading } from "components";
import ErrorBoundary from "components/errorBoundary/index";
import routers from "../routers/routers";
import ErrorFallBack from "components/errorBoundary/ErrorFallBack";
import Notfound from './notfound';
import "../assets/styles/app";
const {Content, Sider } = Layout;
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const customizeRenderEmpty = () => (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" />
  );
@modles()
export default class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.props.getUserinfo();
        this.props.getMenu();
    }

    /**
     * 检测前端路由
     */
    checkPathUrl=(pathName)=>{
        for (let index = 0; index < routers.length; index++) {
            const element = routers[index];
            if(pathName==element.path){
                return true;
            }
        }
        return false;
    }

    /**
     * 检查菜单url
     */
    cheackMenuUrl=(pathName,list)=>{
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            if(element.url.indexOf(pathName)!=-1){
                return true;
            }else {
                return this.cheackMenuUrl(pathName,element.children)
            }
        }
        return false;
    }

    render() {
        const { children, renderProps,userinfo,menu } = this.props;
        
        let appView;
        if(menu.status===200 && menu.content!=null){
           
            let menuUrl = this.checkPathUrl(renderProps.location.pathname);
            if(menuUrl){
                appView = <Layout>
                            <HeaderMenu location={renderProps.location} shopinfo={userinfo} content={menu.content} />
                            
                            <Layout >
                                <Sider className="app-sider" width={"190"}>
                                    <LeftMenu
                                        content={menu.content}
                                        location={renderProps.location}
                                    />
                                </Sider >
                                <Layout className="app-content">
                                    <ErrorBoundary >
                                        <Content >{children}</Content>
                                    </ErrorBoundary>
                                </Layout>
                            </Layout>
                            <FooterContent />
                        </Layout>
            }else{
                appView = <Layout>
                    <HeaderMenu location={renderProps.location} shopinfo={userinfo} content={menu.content} />
                    <Content >
                        <Notfound />
                    </Content>
                    <FooterContent />
                </Layout>
            }
        }else{
            appView =<PageLoading />
        }
      
        return (
            <ConfigProvider renderEmpty={customizeRenderEmpty}>
                <LocaleProvider locale={zh_CN}>
                    <ErrorFallBack>{appView}</ErrorFallBack> 
                </LocaleProvider>
            </ConfigProvider>
        );
  }
}

