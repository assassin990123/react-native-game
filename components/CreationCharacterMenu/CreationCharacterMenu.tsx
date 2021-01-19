import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { clickAudioEffect } from 'endpoints/AudioEffects';

import { styles } from './styles';

const DescriptionText: string = 'some text';
const CharacterName: string ='Name';

export default class CreationCharacterMenu extends Component {
    constructor(props: any) {
        super(props);
        
        this.state = {
          username: String,
          password: String,
        }
    }

    onClickHandler = (viewId: String) => {
        alert('Button pressed ' + viewId);
    }

    render() {
        return (
            <View style = {styles.content}>
                <TouchableOpacity style   = {styles.backButton}
                                    onPress = { () => {
                                        Actions.LogIn();
                                        clickAudioEffect();
                                    } }>
                        <Image source={require("../../assets/arrow.png")}/>
                </TouchableOpacity>

                <TouchableOpacity style   = {styles.refreshButton}
                                    onPress = { () => {} }>
                        <Image source={require("../../assets/refresh.png")}/>
                </TouchableOpacity>

                <TouchableOpacity onPress = { () => {this.onClickHandler('Header'); clickAudioEffect();} }
                                    style = {styles.headerButton}/>
                <Text style = {styles.logoText}>PEDO</Text> 

                <View style = {styles.nameContaner}>
                    <Text style = {styles.buttonsText}>{CharacterName}</Text>
                </View>  

                <View style = {styles.descriptionContaner}>
                    <Text>{DescriptionText}</Text>
                </View>  
                

                <TouchableOpacity style   = {styles.playButton}
                                  onPress = { () => { Actions.GameComponent(); clickAudioEffect(); } }>
                    <Text style = {styles.buttonsText}>Играть!</Text>
                </TouchableOpacity>
                    
            </View>
        );
    }
}
