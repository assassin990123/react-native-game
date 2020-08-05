import React, { Component }      from 'react';
import { View, ImageBackground } from 'react-native';
import { GameEngine }            from 'react-native-game-engine';

import { Constants }             from './Constants';
import { GameLoop }              from './GameLoop';
import Node                      from './Node';

export default class Headphones extends Component {
    engine: any = null;
    state = {
        running: true
    }

    constructor(props: any) {
        super(props);
    }

    onEvent(e: any) {
        if (e.type === "game-over") {
            alert("Game Over");
            this.setState({
                running: false
            })
        }
    }

    randomBetween(min: number, max: number) {
        return Math.floor(Math.random() *  (max - min + 1) + min);
    }

    render() {
        return (
            <View>
                <View>
                    <ImageBackground source={require('./assets/Back.png')} style={{width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT}}>
                        <View style = {{justifyContent: "center", width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT}}>
                            <GameEngine
                                ref = {(ref) => {this.engine = ref}}
                                systems = {[ GameLoop ]}
                                entities = {{
                                    node: {
                                        elements: [],
                                        length: 15,
                                        filled: false,
                                        el: -1,
                                        intersect: true ,
                                        renderer: <Node/>
                                    },
                                    state: { win : false }
                                }}

                                onEvent = {this.onEvent}
                                running = {this.state.running}
                            />
                        </View>
                    </ImageBackground>
                </View>
            </View>
        );
    }
}
