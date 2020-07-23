import React, {Component} from "react";
import {View, Image} from "react-native";
import {Constants} from './Constants'   

interface Interface {
    position: {
        x: number,
        y: number
    },
    deg: number
}

export default class Projectile extends Component<Interface>{
    props: any;
    constructor(props: any) {
        super(props);
        this.props = props;
    }

    render(){

        const x = this.props.position.x;
        const y = this.props.position.y;
        let deg = this.props.deg;
        deg = deg.toString() + "deg";
       
        
        if (!this.props.hited){
            return(
                <Image style = {{ 
                    width: Constants.DART_SIZE * 2.5,
                    height: Constants.DART_SIZE * 2,
                    position: 'absolute',
                    left: x * Constants.PSEUDO_PIXEL -  Constants.PSEUDO_PIXEL * 3,
                    top: y * Constants.PSEUDO_PIXEL -  Constants.PSEUDO_PIXEL * 3,
                    zIndex: 3,                
                    transform: [{ rotate: deg }]
                }}
                
                source={require('./Bread.png')}/>
            )
        }
        else{
            return(
                <View/>
            )
        }
    }
}