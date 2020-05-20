import React, { Component } from "react";
import { Dimensions ,StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';

import { Font } from 'expo';

/*
*
    @brief: Authentication component.
*
*/

export default class StartMenu extends Component {
    constructor(props: any) {
        super(props);
        
        this.state = {
          username: String,
          password: String,
        }

        this.state = {
            fontLoaded: false
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Montserrat-Regular':require('../assets/fonts/Montserrat-Regular.ttf'),
            'Montserrat-Black':require('../assets/fonts/Montserrat-Black.ttf'),
            'Montserrat-Medium':require('../assets/fonts/Montserrat-Medium.ttf'),
            'Montserrat-Light':require('../assets/fonts/Montserrat-Light.ttf'),
            'Montserrat-Italic':require('../assets/fonts/Montserrat-Italic.ttf'),
            'Montserrat-Thin':require('../assets/fonts/Montserrat-Thin.ttf')
        });

        this.setState( { fontLoaded: true } );
    }

    onClickHandler = (viewId: String) => {
        alert('Button pressed ' + viewId);
    }

    render() {
        return (

            <View style = {styles.content}>
                <View style = {styles.header}> 
                    { /* TODO: There should be logo. */ }
                    <TouchableOpacity onPress = { () => {this.onClickHandler('Header')} } 
                                      style = {styles.headerButton}/>
                    <Text style = {styles.logoText}>PEDO</Text> 
                </View>

               
                
                <View style = {styles.content}>
                    { /* Login panel. */ }
                    <View style = {styles.inputContainer}>
                        <TextInput style          = {styles.input}
                                   placeholder           = "Номер телефона"
                                   keyboardType          = "default"
                                   underlineColorAndroid = 'transparent'

                                   onChangeText = { (username) => this.setState({username}) } />
                    </View>

                    <View style = {styles.inputContainer}>
                        <TextInput style                 = {styles.input}
                                   placeholder           = "Пароль"
                                   keyboardType          = "default"
                                   secureTextEntry       = {true}
                                   underlineColorAndroid = 'transparent'

                                   onChangeText = { (password) => this.setState({password}) } />
                    </View>

                    <TouchableOpacity style   = {styles.logButton}
                                      onPress = { () => this.onClickHandler('login') }>
                        <Text style = {styles.buttonsText}>Войти</Text>
                    </TouchableOpacity>
                    
                    <Text style = {styles.agitText}>У вас еще нету аккаунта в нашей потрясающей аниме игре?????</Text>

                    <TouchableOpacity style   = {styles.regButton}
                                      onPress = { () => this.onClickHandler('registration') }>
                        <Text style = {styles.buttonsText}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                </View>

                <View style = {styles.donation}>
                    <TouchableOpacity style   = {styles.donatButton}
                                      onPress = { () => this.onClickHandler('registration') }>
                        <Text style = {styles.donatButtonsText}>Поддержать нас!</Text>
                    </TouchableOpacity>
                </View>

              { /* <View style = {styles.links}>

                   // { /* Login usin' soical media.  }

                    <TouchableOpacity style   = {styles.socialLoginLink}
                                      onPress = { () => this.onClickHandler('login') }/>
                   
                    <TouchableOpacity style   = {styles.socialLoginLink}
                                      onPress = { () => this.onClickHandler('login') }/>

                    <TouchableOpacity style   = {styles.socialLoginLink}
                                      onPress = { () => this.onClickHandler('login') } />
        </View>}*/}
            </View>
        );
    }
}

const { width, height } = Dimensions.get('window');
const colorSpectrum = {
    white: '#ffffff',
    pink:  '#FBC9FF',
    lightPink:  '#F57CFF',
    darkPink: '#C19AC5',
    alternativPink: '#B72FA9',
    black: '#000000',
    orange:'#FF7A00',
    red:'#C34A08'
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: colorSpectrum.white,
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    logoText: {
        fontWeight:'bold',
        fontSize: 50,
        color:colorSpectrum.black,
        flex: 1,
        bottom: height/15
    },

    input: {
        width: width / 1.5,
        height: height / 15,
        marginLeft: width / 18,
        marginRight: width / 18,
        borderBottomColor: colorSpectrum.pink,
        flex: 1,

        fontSize: height / 50
    },

    header: {
        backgroundColor: colorSpectrum.white,
        flex: 1,
        top: height / 9,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    headerButton: {
        borderWidth: 1,
        borderColor: colorSpectrum.pink,
        borderEndWidth: 30,
        borderBottomWidth: 30,
        borderLeftWidth: 30,
        borderTopWidth: 30,
        shadowColor: colorSpectrum.black,
        shadowOpacity: 200,
        alignItems: 'center',
        width: height / 7,
        height: height / 7,
        backgroundColor: colorSpectrum.white,
        borderRadius: height
    },

    logButton: {
        zIndex: 7,
       // top: height / 60,
        backgroundColor: colorSpectrum.lightPink,
        borderRadius: 10,
        borderColor: colorSpectrum.lightPink,
        borderWidth: 1,
        width: width / 1.2,
        height: height / 14,
        //marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Montserrat-Regular'
    },

    regButton: {
        zIndex: 7,
       // top: height / 60,
        backgroundColor: colorSpectrum.alternativPink,
        borderRadius: 10,
        borderColor: colorSpectrum.alternativPink,
        borderWidth: 1,
        width: width / 1.2,
        height: height / 14,
        //marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    donatButton:{
        zIndex: 7,
    // top: height / 60,
        backgroundColor: colorSpectrum.white,
        borderRadius: 10,
        borderColor: colorSpectrum.orange,
        borderWidth: 1,
        width: width / 1.2,
        height: height / 14,
        //marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    donatButtonsText: {
        fontWeight:'normal',
        fontSize: 15,
        color:colorSpectrum.red
    },

    buttonsText: {
        fontWeight:'bold',
        fontSize: 20,
        color:colorSpectrum.white,
        //fontFamily: 
    },

    agitText:{
        fontWeight:'normal',
        fontSize: 14,
        color:colorSpectrum.alternativPink,
        width: width / 1.2,
        height: height / 14,
        marginBottom: 10,
        marginTop: 10,
       // flexDirection: 'row',
        //justifyContent: 'center',
        //alignItems: 'center',
        textAlign: 'center',
        textAlignVertical:'center'
    },

    donation: {
        flexDirection: 'row',
        flex: 0.4,
        //alignItems: 'center',
        //justifyContent: 'center',
        //top: height / 300,
        backgroundColor: colorSpectrum.white,
    },

    socialLoginLink: {
        zIndex: 1,
        borderWidth: 1,
        borderColor: colorSpectrum.pink,
        width: height / 10,
        height: height / 10,
        backgroundColor: colorSpectrum.pink,
        borderRadius: height,
        marginLeft: 10,
        marginRight: 10
    },

    logInText: {
        fontSize: height / 50
    },

    inputContainer: {
        backgroundColor: colorSpectrum.white,
        borderRadius: 10,
        borderColor: colorSpectrum.darkPink,
        borderWidth: 1,
        width: width / 1.2,
        height: height / 14,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'stretch'
         
    }
});

