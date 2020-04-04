import React, { Component } from "react"
import { Dimensions ,StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';


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
                    <TouchableOpacity onPress = { () => {this.onClickHandler('Header')} } style = {styles.headerButton}/>
                </View>
    
                <View style = {styles.content}>
                    <View style = {styles.inputContainer}>
                        <TextInput style          = {styles.input}
                            placeholder           = "Username"
                            keyboardType          = "default"
                            underlineColorAndroid = 'transparent'

                            onChangeText = { (username) => this.setState({username}) } />
                    </View>

                    <View style = {styles.inputContainer}>
                        <TextInput style          = {styles.input}
                            placeholder           = "Password"
                            keyboardType          = "default"
                            secureTextEntry       = {true}
                            underlineColorAndroid = 'transparent'

                            onChangeText = { (password) => this.setState({password}) } />
                    </View>

                    <TouchableOpacity style = {styles.contentButton}
                                      onPress={ () => this.onClickHandler('login') }>
                        <Text style = {styles.logInText}>Log In</Text>
                    </TouchableOpacity>
                </View>

                <View style = {styles.links}>
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

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        width: width / 1.5,
        height: height / 15,
        marginLeft: width / 18,
        marginRight: width / 18,
        borderBottomColor: '#FFFFFF',
        flex: 1,

        fontSize: height / 50
    },

    header: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        top: height / 9
    },

    headerButton: {
        borderWidth: 1,
        borderColor: '#FBC9FF',
        alignItems: 'center',
        width: height / 7,
        height: height / 7,
        backgroundColor: '#FBC9FF',
        borderRadius: height,
    },

    contentButton: {
        zIndex: 7,
        top: height / 60,
        width: width / 3,
        height: height / 15,
        borderRadius: height,
        backgroundColor: "#FBC9FF",
        borderColor: '#FBC9FF',
        
        justifyContent: 'center',
        alignItems: 'center'
    },

    links: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: height / 300,
        backgroundColor: '#FFF',
    },

    socialLoginLink: {
        zIndex: 1,
        borderWidth: 1,
        borderColor: '#FBC9FF',
        width: height / 10,
        height: height / 10,
        backgroundColor: '#FBC9FF',
        borderRadius: height,
        marginLeft: 10,
        marginRight: 10
    },

    logInText: {
        fontSize: height / 50
    },

    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FBC9FF',
        borderRadius: height,
        borderBottomWidth: 1,
        width: width / 1.5,
        height: height / 15,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

