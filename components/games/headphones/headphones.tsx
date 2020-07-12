import React from 'react';

import { GameEngine } from "react-native-game-engine";


import {StyleSheet, View, ImageBackground,} from 'react-native';
import { Constants } from './Constants';
import { GameLoop } from './GameLoop';
import Node from './Node';

import { styles } from './styles';

export default class UH extends React.Component {

  boardSize:any = 500;
  engine:any = null;
  
  state = {
    running: true
  }


  constructor(props: any){
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
          <ImageBackground source={require('./assets/Back.png')} style={{width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT}}>
            <View style = {{justifyContent: "center"}}>
              <GameEngine
                ref = {(ref) => {this.engine = ref}}

                style={styles.content}

                systems = {[ GameLoop ]}

                entities = {{

                  node: {elements: [], length : 15, filled : false, el : -1, intersect : true , renderer: <Node/>},
                  state: {win : false}

                  
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

// const styles = StyleSheet.create({

//   control:{
//     width: 100,
//     height: 100,
//     backgroundColor: 'blue'
//   }

// });
