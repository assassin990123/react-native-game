import React, {Component} from "react";
import {View, Image, Animated} from "react-native";
import { back } from "react-native/Libraries/Animated/src/Easing";
import {Constants} from './Constants'

export default class Aim extends Component{
    constructor(props){
        super(props);
    }

    


    render(){
        
       
        let renderState = this.props.renderState;
        const x = this.props.position[0];
        const y = this.props.position[1];
 
        return(
            <View>
                <View style = {{ 
                    width: Constants.DART_SIZE,
                    height: Constants.DART_SIZE,
                    backgroundColor: 'red',
                    position: 'absolute',
                    left: x*Constants.PSEUDO_PIXEL*0.9 - Constants.DART_SIZE/2,
                    top: y*Constants.PSEUDO_PIXEL*0.9 - Constants.DART_SIZE/2,
                    borderRadius: 100,
                    zIndex: 3
                    
                }}>
        
                </View>
            </View>
        )
        
        



        
    //}
    
    
    
        

    }
}