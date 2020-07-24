import React, {Component} from 'react';

import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";

import { Dimensions, StyleSheet, StatusBar,  Text, View , TouchableOpacity, Alert, Button, Image, ImageBackground, Animated, Swipese } from 'react-native';

import { Constants } from './Constants';

import { GameLoop } from './GameLoop';

import Block from './Block'
import Axis from './Axis';



const engine = Matter.Engine.create({ enableSleeping: false });


const Physics = (entities, { time }) => {
  let engine = entities["physics"].engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};




export default class DF extends React.Component {

  constructor(props){
    super(props);
    this.boardSize = Constants.MIN_SIDE;
    this.engine = null;
    this.state = {
      running: true,

    }
    
  }

  onEvent = (e) => {
    if (e.type === "game-over"){
      //Alert.alert("Game Over");
      alert("Game Over");   
      this.setState({
        running: false
      })   
    }
  }

  randomBetween = (min, max) => {
    return Math.floor(Math.random() *  (max - min + 1) + min);
  }
  

  render() {
    return (
      <View>
 

          <ImageBackground source={require('./Back.png')} style={{width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT}}>

            <View style = {{justifyContent: "center"}}>
  
              <GameEngine
                ref = {(ref) => {this.engine = ref}}

                style={{width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT, flex: null}}

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

  const styles = StyleSheet.create({
    controls: {
      width: 300,
      height: 300,
      flexDirection: 'column'
    },
    controlRow:{
      top: Constants.MAX_HEIGHT * 0.2,
      width: 300,
      height: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    control:{
      width: 100,
      height: 100,
      backgroundColor: 'blue'
    }
  
  });
