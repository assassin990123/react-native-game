import React, {Component} from "react";
import {View} from "react-native";
import Svg, { Line } from "react-native-svg";

export default class Node extends Component{
    constructor(props: any){
        super(props);
    }

    render(){
        
        

        return(
            <View style = {{ 
                // width: Constants.MAX_WIDTH,
                // height: Constants.MAX_HEIGHT,
            }}>
                <Svg>
                    <Line x1="0" y1="0" x2="100" y2="100" stroke="red" strokeWidth="2" />
                </Svg>   
            </View>
        )

    }
}