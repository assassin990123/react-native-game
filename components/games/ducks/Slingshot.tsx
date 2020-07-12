import React, {Component } from "react";
import {Image} from "react-native";
import {Constants} from './Constants'




export default class Slingshot extends Component{
    constructor(props: any){
        super(props);

        this.props = props;
    }

    props: any;

    render(){

        const x = this.props.position.x;
        const y = this.props.position.y;
        
        return(
            <Image style = {{ 
                width: Constants.SLIGNSHOT_SIDE.x,
                height: Constants.SLIGNSHOT_SIDE.y,
                position: 'absolute',
                left: x * Constants.PSEUDO_PIXEL - Constants.SLIGNSHOT_SIDE.x/2,
                top: y * Constants.PSEUDO_PIXEL - Constants.SLIGNSHOT_SIDE.y/8,
                
            }}
            source={require('./assets/Slingshot.png')}
             />
    
        )
        
 

    }
}