import React from 'react';

import { GameEngine } from "react-native-game-engine";


import {   View , TouchableOpacity, ImageBackground} from 'react-native';
import { Constants } from './Constants';
import { GameLoop } from './GameLoop'
import Aim from './Aim';
import Dart from './Dart';

export interface HandlDartProps{
  elements: any[],
}

export default class Darts extends React.Component<HandlDartProps> {  
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
        <View>
          <ImageBackground source={require('./Back.png')} style={{width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT}}>
            <View style = {{justifyContent: "center"}}>
            <TouchableOpacity onPress={() => { this.engine.dispatch({type: 'next-state'})}} activeOpacity = {1}>
              <ImageBackground source={require('./Board.png')} style={{flexDirection: 'column', width: Constants.MIN_SIDE *0.9, height: Constants.MIN_SIDE *0.9, left: Constants.MIN_SIDE * 0.05, top: Constants.MAX_HEIGHT * 0.2 }}>
                <GameEngine
                  ref = {(ref) => {this.engine = ref}}

                  style={{}}

                  systems = {[ GameLoop ]}

                  entities = {{

                    aim: {position: [25,25], speed: 1, xDirection: true,  yDirection: true, state: 0 ,size: Constants.DART_SIZE,renderState: false , renderer: <Aim/>},
                    points: {score: 0, counting: true},
                    dart: {elements: [], renderer: <Dart/>}
                  }}

                  onEvent  = {this.onEvent}
                  running = {this.state.running}
                >

                
                
                </GameEngine> 
              </ImageBackground>
              
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => { this.engine.dispatch({type: 'next-state'})}}>
              <View style={styles.control}/>
            </TouchableOpacity> */}
            </View>
          </ImageBackground>
        </View> 
      </View> 
    )
        
    }
  } 

// const styles = StyleSheet.create({

//   control:{
//     width: 100,
//     height: 100,
//     backgroundColor: 'blue'
//   }

// });
