import React, { Component } from "react";
import { Dimensions ,StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';

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
    }

    onClickHandler = (viewId: String) => {
        alert('Button pressed ' + viewId);
    }

    render() {
        return (
            <View style = {styles.content}>
                <View style = {styles.header}> 
                    { /* TODO: There should be logo. */ }
                    <TouchableOpacity onPress = { () => {this.onClickHandler('Header')} } style = {styles.headerButton}/>
                </View>

                <View style = {styles.content}>

                    { /* Login panel. */ }

                    <View style = {styles.inputContainer}>
                        <TextInput style          = {styles.input}
                                   placeholder           = "Username"
                                   keyboardType          = "default"
                                   underlineColorAndroid = 'transparent'

                                   onChangeText = { (username) => this.setState({username}) } />
                    </View>

                    <View style = {styles.inputContainer}>
                        <TextInput style                 = {styles.input}
                                   placeholder           = "Password"
                                   keyboardType          = "default"
                                   secureTextEntry       = {true}
                                   underlineColorAndroid = 'transparent'

                                   onChangeText = { (password) => this.setState({password}) } />
                    </View>

                    <TouchableOpacity style   = {styles.contentButton}
                                      onPress = { () => this.onClickHandler('login') }>
                        <Text style = {styles.logInText}>Log In</Text>
                    </TouchableOpacity>
                </View>

                <View style = {styles.links}>

                    { /* Login usin' soical media. */ }

                    <TouchableOpacity style   = {styles.socialLoginLink}
                                      onPress = { () => this.onClickHandler('login') }/>
                   
                    <TouchableOpacity style   = {styles.socialLoginLink}
                                      onPress = { () => this.onClickHandler('login') }/>

                    <TouchableOpacity style   = {styles.socialLoginLink}
                                      onPress = { () => this.onClickHandler('login') } />
                </View>
            </View>
        );
    }
}

const { width, height } = Dimensions.get('window');
const colorSpectrum = {
    white: '#ffffff',
    pink:  '#FBC9FF'
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: colorSpectrum.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        width: width / 1.5,
        height: height / 15,
        marginLeft: width / 18,
        marginRight: width / 18,
        borderBottomColor: colorSpectrum.white,
        flex: 1,

        fontSize: height / 50
    },

    header: {
        backgroundColor: colorSpectrum.white,
        flex: 1,
        top: height / 9
    },

    headerButton: {
        borderWidth: 1,
        borderColor: colorSpectrum.pink,
        alignItems: 'center',
        width: height / 7,
        height: height / 7,
        backgroundColor: colorSpectrum.pink,
        borderRadius: height,
    },

    contentButton: {
        zIndex: 7,
        top: height / 60,
        width: width / 3,
        height: height / 15,
        borderRadius: height,
        backgroundColor: colorSpectrum.pink,
        borderColor: colorSpectrum.pink,
        
        justifyContent: 'center',
        alignItems: 'center'
    },

    links: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: height / 300,
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
        borderBottomColor: colorSpectrum.pink,
        backgroundColor: colorSpectrum.pink,
        borderRadius: height,
        borderBottomWidth: 1,
        width: width / 1.5,
        height: height / 15,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

