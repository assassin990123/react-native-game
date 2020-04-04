import React from "react"
import { Dimensions ,StyleSheet, TextInput, Text, View, TouchableOpacity, Platform, StatusBar } from 'react-native';

export const StartMenu = () => {
    return (
        <View style = {styles.container}>
            <View style = {styles.header}> 
                <TouchableOpacity onPress = {handleOnPress} style = {styles.header_button}></TouchableOpacity>
            </View>

            <View style = {styles.content}>
                <TouchableOpacity style = {styles.contentButton1}>
                    <Text style = {styles.logInText}>Username</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.contentButton2}>
                    <Text style = {styles.logInText}>Passwor</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.contentButton3}>
                    <Text style = {styles.logInText}>Log In</Text>
                </TouchableOpacity>
            </View>

            <View style = {styles.links}>
                <TouchableOpacity style = {styles.socialLoginLink1}></TouchableOpacity>
                <TouchableOpacity style = {styles.socialLoginLink2}></TouchableOpacity>
                <TouchableOpacity style = {styles.socialLoginLink3}></TouchableOpacity>
            </View>
        </View>
    );
}

const handleOnPress = () => { console.log(1) };

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight
                                              : 0
    },
    
    header: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingHorizontal: width,
        top: height / 9
    },

    header_button: {
        borderWidth: 1,
        borderColor: '#FBC9FF',
        alignItems: 'center',
        width: 100,
        height: 100,
        backgroundColor: '#FBC9FF',
        borderRadius: 50,
    },
    
    content: {
        backgroundColor: '#FFF',
        flex: 2,
        top: height / 6,
        alignItems: 'center',
        paddingHorizontal: width,
    },

    contentButton1: {
        borderWidth: 1,
        width: 220,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#FBC9FF',
        borderColor: '#FBC9FF',
        top: height / 6,
    },
  
    contentButton2: {
        top: 30,
        width: 220,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#FBC9FF',
        borderColor: '#FBC9FF',
    },
    
    contentButton3: {
        top: 60,
        width: 120,
        height: 50,
        borderRadius: 30,
        backgroundColor: "#FBC9FF",
        borderColor: '#FBC9FF',
        
        justifyContent: 'center',
        alignItems: 'center'
    },

    links: {
        zIndex: 1,
        flex: 3,
        alignItems: 'center',
        top: height / 4,
        paddingHorizontal: width,
        backgroundColor: '#FFF',
    },

    socialLoginLink1: {
        zIndex: 1,
        borderWidth: 1,
        borderColor: '#FBC9FF',
        width: 70,
        height: 70,
        backgroundColor: '#FBC9FF',
        borderRadius: 50,
    },

    socialLoginLink2: {
        zIndex: 1,
        borderWidth: 1,
        borderColor: '#FBC9FF',
        width: 70,
        height: 70,
        backgroundColor: '#FBC9FF',
        borderRadius: 50,
        left: 130,
        bottom: 70
    },

    socialLoginLink3: {
        zIndex: 1,
        borderWidth: 1,
        borderColor: '#FBC9FF',
        width: 70,
        height: 70,
        backgroundColor: '#FBC9FF',
        borderRadius: 50,
        left: -130,
        bottom: 140
    }, 

    logInText: {

    }
});

