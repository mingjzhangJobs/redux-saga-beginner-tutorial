import React from "react";
import P from "prop-types";
import {SelectTime} from 'components'
import moment  from "moment";
import 'moment/locale/zh-cn'
import "./style";

export default class Ming_e extends React.Component {
    static propTypes = {
        location: P.any,
        history: P.any,
        actions: P.any
    };
    constructor(props) {
        super(props);
        _saPageViewInit()
    }

    callBack=(objs)=>{
        console.log(objs)
    }
   
    render() {
        const {props,state} = this
        
           
        return (
            <div className="home mt15">
                 Ming_e
            </div>
        );
    }
}

