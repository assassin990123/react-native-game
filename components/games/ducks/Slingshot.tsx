import React, {Component } from "react";
import {View, Image} from "react-native";
import {Constants} from './Constants'




export default class Slingshot extends Component{


    constructor(props){
        super(props);
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