import React from "react";
import P from "prop-types";
import {SelectTime} from 'components'
import moment  from "moment";
import 'moment/locale/zh-cn'
import "./style";


let date = {
    "DAY" : {
        "CONTRAST": {
            "RANGE_LIST": [
                {
                    "RANGE_END": ["2018-09-01"],
                    "RANGE_START": ["2018-03-01"]
                },
                {
                    "RANGE_END": ["2019-07-01"],
                    "RANGE_START": ["2019-03-01"]
                }
            ],
            "DEFAULT_DATE": ["2018-09-01"]
        },
        "RANGE_ENABLE": false,
        "CURRENT": {
            "RANGE_END": ["2019-07-01"],
            "RANGE_START": ["2019-03-01"],
            "DEFAULT_DATE": ["2019-07-01"]
        }
    },
  "MONTH" : {
        "CONTRAST": {
            "RANGE_LIST": [
                {
                    "RANGE_END": ["2018-09-01","2018-09-30"],
                    "RANGE_START": ["2018-03-01","2018-03-31"]
                },
                {
                    "RANGE_END": ["2019-07-01","2019-07-31"],
                    "RANGE_START": ["2019-03-01","2019-03-31"]
                }
            ],
            "DEFAULT_DATE": ["2018-09-01","2019-03-31"]
        },
        "RANGE_ENABLE": true,
        "CURRENT": {
            "RANGE_END": ["2019-07-01"],
            "RANGE_START": ["2019-03-01"],
            "DEFAULT_DATE": ["2019-07-01","2019-07-31"]
        }
    },
    "ACCOUNT_ENABLE": true
  }

export default class homePage extends React.Component {
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
                 <SelectTime 
                 date={date}
                 callBack={this.callBack}
                 />
            </div>
        );
    }
}

