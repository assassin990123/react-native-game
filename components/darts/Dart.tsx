import React, {Component} from "react";
import {View, Image} from "react-native";
//import { back } from "react-native/Libraries/Animated/src/Easing";
import {Constants} from './Constants';

export default class Dart extends Component{
    constructor(props:any){
        super(props);
    }

    render(){
        let dartList = this.props.elements.map((el:any, idx:any) => {
            // return <View key = {idx} style = {{
            //     width: 2*Constants.PSEUDO_PIXEL,
            //     height: 7*Constants.PSEUDO_PIXEL,
            //     backgroundColor: '#888888',
            //     position: 'absolute',
            //     left: el[0] * Constants.PSEUDO_PIXEL*0.9 - Constants.DART_SIZE/2,
            //     top: el[1] * Constants.PSEUDO_PIXEL*0.9 - Constants.DART_SIZE/2
            // }} />
            return  <Image 
                key = {idx}
                style={{
                    width: 2*Constants.PSEUDO_PIXEL,
                    height: 7*Constants.PSEUDO_PIXEL,
                    position: 'absolute',
                    left: el[0] * Constants.PSEUDO_PIXEL * 0.9 -  Constants.PSEUDO_PIXEL,
                    top: el[1] * Constants.PSEUDO_PIXEL * 0.9
                }}
                source={require('./Dart.png')}  
            />
        })

        return(
            <View style = {{ 
                // width: Constants.MIN_SIDE *0.9, 
                // height: Constants.MIN_SIDE *0.9
            }}>
                {dartList}
            </View>
        )

    }
}