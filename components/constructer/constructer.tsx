import React, { Component } from "react";
import { TextInput, Text, View, TouchableOpacity, KeyboardAvoidingView, Image, Dimensions } from 'react-native';

import { styles } from './styles';

/*
*
    @brief: Authentication component.
*
*/

const { width, height } = Dimensions.get('screen');

export default class StartMenu extends Component {
    constructor(props: any) {
        super(props);
    }

    state = {
        sprites: {
            titanda: {link: require('../../assets/hero_sprites/titanda/sprite_default.png')},
            asuna: {link: require('../../assets/hero_sprites/asuna/sprite_default.png')}
        },

        currentSprite: require('../../assets/hero_sprites/titanda/sprite_default.png'),
        characterName: String,
    };

    onClickHandler = (viewId: String) => {
        alert('Button pressed ' + viewId);
    }

    setDefaultSprite = () => {
        switch (this.state.currentSprite) {
            case this.state.sprites.titanda.link: {
                this.setState({currentSprite: this.state.sprites.asuna.link});
                break;
            }
            case this.state.sprites.asuna.link: {
                this.setState({currentSprite: this.state.sprites.titanda.link});
                break;
            }
        }
    };

    render() {
        return (
        <KeyboardAvoidingView
            behavior={'padding'}
            style={styles.content}
          >
            <View style = {styles.content}>

                <TouchableOpacity style   = {styles.backButton}
                                    onPress = { () => {} }>
                        <Image source={require("../../assets/arrow.png")}/>
                </TouchableOpacity>

                <View style = {styles.header}>
                    <Text style = {styles.headerText}>Настройте внешний вид {'\n'} вашего персонажа!</Text>
                </View>
                
                <View style = {styles.inputContainer}>
                        <TextInput style          = {styles.input}
                                   placeholder           = "Имя персонажа"
                                   keyboardType          = "default"
                                   underlineColorAndroid = 'transparent'

                                   onChangeText = { (characterName) => this.setState({characterName}) } />
                </View>

                <View style={{width: '100%', flexDirection: 'row', height: '70%'}}>
                    <View style={{width: '50%', marginTop: height * 0.05}}>
                        <TouchableOpacity style={{backgroundColor: '#E76BC0', borderRadius: 10, width: '90%', height: '13%', marginLeft: width * 0.085, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}> 
                            <Text style={{color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 17}}>Цвет глаз</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor: '#128949', borderRadius: 10, width: '90%', height: '13%', marginLeft: width * 0.085, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}> 
                            <Text style={{color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 17}}>Цвет кожи</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor: '#FCB712', borderRadius: 10, width: '90%', height: '13%', marginLeft: width * 0.085, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}> 
                            <Text style={{color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 17}}>Цвет волос</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '50%'}}>
                        <TouchableOpacity style={{width: '100%', justifyContent: 'center', alignItems:'center'}}
                                          onPress={() => { this.setDefaultSprite(); }}>
                            <Image source={this.state.currentSprite} style={{resizeMode: 'contain'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{position: 'absolute', top: width * 1.5, width: '100%', height: '100%'}}> 
                        <TouchableOpacity style={{backgroundColor: '#E76BC0', borderRadius: 10, width: '90%', height: '10%', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'}}> 
                            <Text style={{color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 17}}>Создать</Text>
                        </TouchableOpacity>
                    </View>
            </View>

        </KeyboardAvoidingView>
        );
    }
}
