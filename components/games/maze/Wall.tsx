import React, {Component} from "react";
import {View , Image} from "react-native";
import {Constants} from './Constants';


export default class Node extends Component{
    constructor(props:any){
        super(props);
        this.props = props;
    }

    props:any;

    render(){
        
        

        let wallList = this.props.elements.map((el:any, idx:any) => {
           
            return <Image key = {idx} style = {{
                width: Constants.PSEUDO_PIXEL * 10,
                height: Constants.PSEUDO_PIXEL * 10 ,
                //backgroundColor: 'black',
                position: 'absolute',
                borderRadius : 100,
                left: el.x * Constants.PSEUDO_PIXEL - Constants.PSEUDO_PIXEL * 5,
                top: el.y * Constants.PSEUDO_PIXEL - Constants.PSEUDO_PIXEL * 5,
            }} 
            source={require('./assets/Bush.png')}
            />
            
        })

       
        return(
            <View style = {{}}>
                {wallList}
            </View>
        )

    }
}