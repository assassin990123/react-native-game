import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Actions }                                       from "react-native-router-flux";
import React, { Component }                              from 'react';

import { GameEngine }            from 'react-native-game-engine';
import { Constants }             from '../Constants';
import { GameLoop }              from './GameLoop';
import Node                      from './Node';

import { clickAudioEffect } from 'endpoints/AudioEffects';

import { style } from "../ButtonStyle";
import EndGameModal from "../EndGameModal";


export default class Headphones extends Component {
    engine: any = null;
    state = {
        running: true,
        entities: {
            node: {
                elements: [],
                length: 15,
                filled: false,
                el: -1,
                intersect: true ,
                // @ts-ignore
                renderer: <Node/>
            },
            state: { win : false },
            update: () => { this.setState({entities: { state: { win: true } }}); }
        }
    }

    constructor(props: any) {
        super(props);
    }

    onEvent(e: any) {
        console.log(e.type);
        if (e.type === "game-over") {
            console.log("Game Over");
            alert("Game Over");
            this.setState({
                running: false,
                win: true
            })
        }
    }

    randomBetween(min: number, max: number) {
        return Math.floor(Math.random() *  (max - min + 1) + min);
    }

    componentWillUnmount() {
        console.log(this.state.entities.state.win)
    }

    render() {
        console.log(123);
        return (
            <View>
                <View>
                    <EndGameModal xp={100} money={100} win={this.state.entities.state.win}/>
                </View>
                <View>
                    <ImageBackground source={require('./assets/Back.png')} style={{width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT}}>
                        <View style = {{justifyContent: "center", width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT}}>
                            <GameEngine
                                ref = {(ref) => {this.engine = ref}}
                                systems = {[ GameLoop ]}
                                entities = {this.state.entities}
                                onEvent = {this.onEvent}
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
                </View>
            </View>
        );
    }
}
