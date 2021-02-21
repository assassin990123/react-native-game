import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { Actions } from 'react-native-router-flux';
import React, { Component } from 'react';

import { Constants } from '../Constants';
import { GameLoop } from './GameLoop';

import Block from './Block';
import Axis from './Axis';

import { clickAudioEffect } from 'endpoints/AudioEffects';

import { style } from '../ButtonStyle';
import EndGameModal from "../EndGameModal";


export default class Tower extends Component {
    boardSize: number;
    engine: any;

    state = {
        running: true, win: false, scorePoints: 0, update: (points: number) => {
            this.setState({ ...this.state, win: true, scorePoints: points });
        }
    };

    constructor(props: any) {
        super(props);

        this.boardSize = Constants.MIN_SIDE;
        this.engine = null;
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
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    componentWillUnmount() {
        console.log(`[Tower game] -> Score := ${this.state.scorePoints}`);
        console.log(`[Tower game] -> Finish [${this.state.win}]`);
    }

    render() {
        return (<View>
                <View>
                    <EndGameModal money = {0} xp = {this.state.scorePoints} win = {this.state.win} />
                </View>
                <ImageBackground source = {require('./Back.png')}
                                 style = {{ width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT }}>
                    <View style = {{
                        justifyContent: "center", width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT
                    }}>
                        <GameEngine
                            ref = {(ref) => {
                                this.engine = ref
                            }}
                            systems = {[GameLoop]}
                            entities = {{
                                block: {
                                    elements: [[], [], []],
                                    n: 2,
                                    filled: false,
                                    startPos: { x: 0, y: 0 },
                                    ely: -1,
                                    elx: -1,
                                    renderer: <Block />
                                },

                                axis: { renderer: <Axis /> }, state: this.state
                            }}
                            onEvent = {this.onEvent}
                            running = {this.state.running}
                        />
                        <TouchableOpacity onPress = {() => {
                            Actions.pop();
                            clickAudioEffect();
                        }}
                                          style = {style.button}
                                          activeOpacity = {1}>
                            <Text style = {{
                                fontFamily: 'Montserrat-SemiBold', fontSize: 20, color: 'white'
                            }}>Назад</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>);
    }
}
  