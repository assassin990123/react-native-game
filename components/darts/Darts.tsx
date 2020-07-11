import { View , TouchableOpacity, ImageBackground } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import React, {Component} from 'react';

import { Constants } from './Constants';
import { GameLoop } from './GameLoop'
import Aim from './Aim';
import Dart from './Dart';

export default class Darts extends Component {
  engine: any = null;
  
  state = {
    running: true,
  }

  constructor(props:any){
    super(props);
  }

  onEvent = (e:any) => {
    if (e.type === "game-over") {
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
          <TouchableOpacity onPress={() => { this.engine.dispatch({type: 'next-state'})}} activeOpacity = {1}>
            <ImageBackground source={require('./assets/Back.png')} style={{width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT}}>
              <View style = {{justifyContent: "center"}}>
                  <ImageBackground source={require('./assets/Board.png')} style={{flexDirection: 'column', width: Constants.MIN_SIDE *0.9, height: Constants.MIN_SIDE *0.9, left: Constants.MIN_SIDE * 0.05, top: Constants.MAX_HEIGHT * 0.2 }}>
                    <GameEngine
                      ref = {(ref) => {this.engine = ref}}
                      systems = {[ GameLoop ]}
                      entities = {{

                        aim: {position: [25,25], speed: 1, xDirection: true,  yDirection: true, state: 0 ,size: Constants.DART_SIZE, renderState: false , renderer: <Aim/>},
                        points: {score: 0, counting: true},
                        dart: {elements: [], renderer: <Dart/>}
                      }}

                      onEvent  = {this.onEvent}
                      running = {this.state.running}
                    />
                  </ImageBackground>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View> 
    );
  }
}
