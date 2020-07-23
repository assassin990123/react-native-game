import React, {Component} from "react";
import {View, Image} from "react-native";
import {Constants} from './Constants';



export default class Projectile extends Component{


    constructor(props){
        super(props);
    }

 

    render(){

        const x = this.props.position.x;
        const y = this.props.position.y;
        
        return(
            <Image style = {{ 
                width: Constants.DART_SIZE * 4,
                height: Constants.DART_SIZE * 4,
                position: 'absolute',
                left: x * Constants.PSEUDO_PIXEL -  Constants.PSEUDO_PIXEL * 4,
                top: y * Constants.PSEUDO_PIXEL -  Constants.PSEUDO_PIXEL * 4,
                zIndex: 3,                
            }}
            
            source={require('./Duck.png')}/>
        )

    }
}