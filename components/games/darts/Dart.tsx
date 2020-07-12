import React, { Component } from "react";
import {View, Image} from "react-native";

import { Constants } from './Constants';

export default class Dart extends Component {
    constructor(props:any){
        super(props);

        this.props = props;
    }

    props: any;

    render(){
        let dartList = this.props.elements.map((el:any, idx:any) => {
            return  <Image 
                key = {idx}
                style={{
                    width: 2*Constants.PSEUDO_PIXEL,
                    height: 7*Constants.PSEUDO_PIXEL,
                    position: 'absolute',
                    left: el[0] * Constants.PSEUDO_PIXEL * 0.9 -  Constants.PSEUDO_PIXEL,
                    top: el[1] * Constants.PSEUDO_PIXEL * 0.9
                }}
                source={require('./assets/Dart.png')}
            />
        })

        return(
            <View>
                {dartList}
            </View>
        )
    }
}
