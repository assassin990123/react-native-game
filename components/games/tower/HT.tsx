import React from 'react';

import { GameEngine } from "react-native-game-engine";
import {  StyleSheet,  View, ImageBackground} from 'react-native';
import { Constants } from './Constants';
import { GameLoop } from './GameLoop';

import Block from './Block';
import Axis from './Axis';

import { styles } from './styles';


export default class DF extends React.Component {

  boardSize = Constants.MIN_SIDE;
  engine:any = null;
  
  state = {
    running: true,

  }

  constructor(props:any){
    super(props);
  }

  
  
  onEvent = (e:any) => {
    if (e.type === "game-over"){
      //Alert.alert("Game Over");
      alert("Game Over");   
      this.setState({
        running: false
      })   
    }
  }

  randomBetween = (min:any, max:any) => {
    return Math.floor(Math.random() *  (max - min + 1) + min);
  }
  

  render() {
    return (
      <View>
        <ImageBackground source={require('./assets/Back.png')} style={{width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT}}>

            <View style = {{justifyContent: "center"}}>
  
              <GameEngine
                ref = {(ref) => {this.engine = ref}}

                style={styles.content}

                systems = {[ GameLoop ]}



                entities = {{
                  block: {elements: [[],[],[]], n : 7, filled : false, startPos: {x : 0,y : 0} , ely : -1, elx : -1 , renderer: <Block/>},
                  axis: {renderer: <Axis/>},  
                  state: {win : false}
                }}

                onEvent  = {this.onEvent}
                running = {this.state.running}
              >
              
              </GameEngine> 

            </View>
          </ImageBackground>
      </View> 
    )
        
    }
  } 

  // const styles = StyleSheet.create({
  //   controls: {
  //     width: 300,
  //     height: 300,
  //     flexDirection: 'column'
  //   },
  //   controlRow:{
  //     top: Constants.MAX_HEIGHT * 0.2,
  //     width: 300,
  //     height: 100,
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'center'
  //   },
  //   control:{
  //     width: 100,
  //     height: 100,
  //     backgroundColor: 'blue'
  //   }
  
  // });
