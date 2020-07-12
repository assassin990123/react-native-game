import React, {Component} from "react";
import {Image} from "react-native";
import {Constants} from './Constants';


export default class Finish extends Component{
    constructor(props:any){
        super(props);
        this.props = props;
    }

    props: any;

    render(){
        return(
            <Image style = {{
                width: Constants.PSEUDO_PIXEL * 5 ,
                height: Constants.PSEUDO_PIXEL * 5,
                position: 'absolute',
                left: this.props.position.x * Constants.PSEUDO_PIXEL - Constants.PSEUDO_PIXEL * 2.5,
                top: this.props.position.y * Constants.PSEUDO_PIXEL - Constants.PSEUDO_PIXEL * 2.5
            }} 
            source={require('./assets/Flag.png')}/>
        )

    }
}