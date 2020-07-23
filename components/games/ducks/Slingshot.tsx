import React, {Component } from "react";
import {Image} from "react-native";
import {Constants} from './Constants'

interface Interface {
    position: {
        x: number,
        y: number
    },
    deg: number
}

export default class Slingshot extends Component<Interface> {
    props: any;

    constructor(props: any){
        super(props);

        this.props = props;
    }

 

    render(){

        const x = this.props.position.x;
        const y = this.props.position.y;

        //console.log(x);
        
        return(
            <Image style = {{ 
                width: Constants.SLIGNSHOT_SIDE.x,
                height: Constants.SLIGNSHOT_SIDE.y,
                position: 'absolute',
                left: x * Constants.PSEUDO_PIXEL - Constants.SLIGNSHOT_SIDE.x/2,
                top: y * Constants.PSEUDO_PIXEL - Constants.SLIGNSHOT_SIDE.y/8,
                
            }}
            source={require('./Slingshot.png')}
             />
    
        )
    }
}