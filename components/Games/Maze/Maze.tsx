import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { GameEngine }                                    from 'react-native-game-engine';
import { Actions }                                       from "react-native-router-flux";
import React, {Component}                                from 'react';

import { Constants } from '../Constants';
import { GameLoop } from './GameLoop';
import Finish from './Finish';
import Walls from './Walls';
import Hero from './Hero';

import { clickAudioEffect } from "../../../endpoints/AudioEffects";

import { style } from "../ButtonStyle";


interface IMazeGame {
    position: {
        x: number,
        y: number
    }
}

export default class Maze extends Component<IMazeGame> {
    engine: any = null;
    state = {
        running: true
    };

    props: any;

    constructor(props: any) {
      super(props);

      this.props = props;
    }

    onEvent(e: any) {
        if (e.type === "game-over") {
            alert("Game Over");   
            this.setState({
                running: false
            });
        }
    }

    randomBetween(min: number, max: number) {
        return Math.floor(Math.random() *  (max - min + 1) + min);
    }

    render() {
        return (
            <ImageBackground source={require('./assets/Back.png')} style={{width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT}}>
                <View style = {{justifyContent: "center", width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT}}>
                    <GameEngine
                      ref = {(ref) => {this.engine = ref}}
                      systems = {[ GameLoop ]}
                      entities = {{
                          hero: { 
                              position: {x : 13, y : 76}, 
                              startPos: {x : 13, y : 76}, 
                              renderer:  <Hero/>
                          },
                          wall: { 
                              elements: [], 
                              length: 43, 
                              filled: false, el : -1, 
                              intersect: true, 
                              renderer: <Walls/> 
                          },
                          finish: {position: {x : 41, y : 83 }, 
                          renderer: <Finish/>
                        },
                            state: {win : false}
                        }}
                        onEvent  = {this.onEvent}
                        running = {this.state.running}
                      />
                    <TouchableOpacity onPress={() => {
                        Actions.pop();
                        clickAudioEffect();
                    }}
                                      style={style.button}
                                      activeOpacity={1}>
                        <Text style = {{ fontFamily: 'Montserrat-SemiBold', fontSize: 20, color: 'white' }}>Назад</Text>
                    </TouchableOpacity>
                </View>        
            </ImageBackground>
        );
    }
} 
