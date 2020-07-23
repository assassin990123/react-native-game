import React, {Component} from 'react';

import { GameEngine } from "react-native-game-engine";


import { Dimensions, StyleSheet, StatusBar,  Text, View , TouchableOpacity, Alert, Button, Image, ImageBackground, Animated, Swipese } from 'react-native';
import { Constants } from './Constants';
import { GameLoop } from './GameLoop';
import Projectile from './Projectile';
import Slingshot from './Slingshot'; 
import Duck from './Duck'; 

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
        <View>
          <ImageBackground source={require('./Back.png')} style={{width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT}}>
            <View style = {{justifyContent: "center"}}>
              <GameEngine
                ref = {(ref) => {this.engine = ref}}

                style={{width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT, flex: null}}

                systems = {[ GameLoop ]}

                entities = {{
                  projectile: {position: {x : 25, y : 75} , launch: false, speed: {x : 0, y : 0}, startPos:  {x : 0, y : 0}, endPos:  {x : 0, y : 0}, deg: 0, hited : false, missed : false , amount : 3, renderer :  <Projectile/>},
                  slingshot: {position: {x : 25, y : 75}, renderer :  <Slingshot/>},
                  duck: { position: {x : this.randomBetween(8,Constants.GRID_SIZE - 9),y : this.randomBetween(8,Constants.GRID_SIZE - 9)}, speed: {x : 0.3, y : 0.15},startPos: {x : 0, y :0, filled: false}, dir: {x : true, y : true}, renderer:  <Duck/>},
                  points: {score: 0, counting: true}  ,
                  //test : {  position: {x : 22, y : 25}, renderer :  <Test/>}                    
                }}

                onEvent  = {this.onEvent}
                running = {this.state.running}
              >
              
              </GameEngine> 
            </View>
          </ImageBackground>
          
        </View>
      </View> 
    )
        
    }
  } 
