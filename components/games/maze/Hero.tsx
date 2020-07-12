import React, {Component} from "react";
import {View} from "react-native";
import {Constants} from './Constants';


export default class Node extends Component{
    constructor(props:any){
        super(props);
        this.props = props;
    }

    props:any;

    render(){
        return(
            <View style = {{
                width: Constants.PSEUDO_PIXEL * 2 ,
                height: Constants.PSEUDO_PIXEL * 2,
                backgroundColor: 'red',
                position: 'absolute',
                borderRadius : 100,
                left: this.props.position.x * Constants.PSEUDO_PIXEL - Constants.PSEUDO_PIXEL,
                top: this.props.position.y * Constants.PSEUDO_PIXEL - Constants.PSEUDO_PIXEL
            }} />
        )

    }
}