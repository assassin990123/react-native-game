import React, {Component} from "react";
import {View} from "react-native";
import {Constants} from './Constants' 



export default class Block extends Component{


    constructor(props:any){
        super(props);
    }

 

    render(){

        //let blockList = [];
        //for (let i = 0; i < 3; i++){
            // let   blockList = this.props.elements[0].map((el, idx) => {
            //     //console.log(i);
            //     <View key = {idx + 0*5} style = {{ 
            //         width: el.width * 5,
            //         height: Constants.DART_SIZE * 2,
            //         position: 'absolute',
            //         backgroundColor: 'black',
            //         left: el.x * Constants.PSEUDO_PIXEL -  el.width * 2.5,
            //         top: el.y * Constants.PSEUDO_PIXEL -  Constants.PSEUDO_PIXEL * 2.5,
            //         zIndex: 3,                
            //     }}/>
            
            // })
        //}

        




















        let blockList = [];

        let i = 0;
 
        let list = [];
        for (let j = 0; j < this.props.elements[i].length; j++){
            list.push(this.props.elements[i][j]);
        }
    

        blockList = list.map((el, idx) => {
            {
            return(
                <View key = {idx + i*this.props.n} style = {{ 
                    width: el.width * 5,
                    height: Constants.DART_SIZE * 2,
                    position: 'absolute',
                    borderRadius: 10,
                    backgroundColor: 'rgb(' + (255 - (el.width - 8) / 20 * 255).toString() +',0,' + ((el.width - 8) / 20 * 255).toString() + ')',
                    left: el.x * Constants.PSEUDO_PIXEL -  el.width * 2.5,
                    top: el.y * Constants.PSEUDO_PIXEL -  Constants.PSEUDO_PIXEL * 2.5,
                    zIndex: 3,                
                }}/>
            )
            }
        }).concat(blockList); 

        i++;
        list = [];
        for (let j = 0; j < this.props.elements[i].length; j++){
            list.push(this.props.elements[i][j]);
        }
        

        blockList = list.map((el, idx) => {
            {
            return(
                <View key = {idx + i*this.props.n} style = {{ 
                    width: el.width * 5,
                    height: Constants.DART_SIZE * 2,
                    position: 'absolute',
                    borderRadius: 10,
                    backgroundColor: 'rgb(' + (255 - (el.width - 8) / 20 * 255).toString() +',0,' + ((el.width - 8) / 20 * 255).toString() + ')',
                    left: el.x * Constants.PSEUDO_PIXEL -  el.width * 2.5,
                    top: el.y * Constants.PSEUDO_PIXEL -  Constants.PSEUDO_PIXEL * 2.5,
                    zIndex: 3,                
                }}/>
            )
            }
        }).concat(blockList); 

        i++;
        list = [];
        for (let j = 0; j < this.props.elements[i].length; j++){
            list.push(this.props.elements[i][j]);
        }
        

        blockList = list.map((el, idx) => {
            {
            return(
                <View key = {idx + i*this.props.n} style = {{ 
                    width: el.width * 5,
                    height: Constants.DART_SIZE * 2,
                    position: 'absolute',
                    borderRadius: 10,
                    backgroundColor: 'rgb(' + (255 - (el.width - 8) / 20 * 255).toString() +',0,' + ((el.width - 8) / 20 * 255).toString() + ')',
                    left: el.x * Constants.PSEUDO_PIXEL -  el.width * 2.5,
                    top: el.y * Constants.PSEUDO_PIXEL -  Constants.PSEUDO_PIXEL * 2.5,
                    zIndex: 3,                
                }}/>
            )
            }
        }).concat(blockList); 
 
        



        return(
            <View style = {{ 
                // width: Constants.MAX_WIDTH,
                // height: Constants.MAX_HEIGHT,
            }}>
                {blockList}

            </View>
        )
        
        

    }
}