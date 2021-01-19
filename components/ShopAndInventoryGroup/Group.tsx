import React, { Component } from 'react';
import { View, TouchableOpacity,  Image } from 'react-native';

import { Actions } from 'react-native-router-flux';

import { clickAudioEffect } from 'endpoints/AudioEffects';

import { styles } from './styles';


export default class ButtonGroup extends Component {
    constructor(props: any) {
        super(props);
    }
 
        
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    onPress={ () => {
                        clickAudioEffect();
                        Actions.Inventory();
                    } } 
                    style={styles.topButton}
                >
                    <Image source={require('./assets/inv.png')} style={styles.iconImage}/>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    onPress={ () => {
                        clickAudioEffect();
                        Actions.Shop();
                    } } 
                    style={styles.button}
                >
                    <Image source={require('./assets/shop.png')} style={styles.iconImage}  />
                </TouchableOpacity>
            </View>
        );
    }
}
