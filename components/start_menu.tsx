import React from "react"
import { Dimensions ,StyleSheet, Text, View,TouchableOpacity, Platform,StatusBar } from 'react-native';

export const StartMenu = () => {
    return (
        <View style = {styles.container}>
            <View style = {styles.header}> 
                <TouchableOpacity onPress = {handleOnPress} style = {styles.header_button}></TouchableOpacity>
            </View>

            <View style = {styles.content}>
                <TouchableOpacity style = {styles.contentButton1}></TouchableOpacity>
                <TouchableOpacity style = {styles.contentButton2}></TouchableOpacity>
                <TouchableOpacity style = {styles.contentButton3}></TouchableOpacity>
            </View>

            <View style = {styles.links}>
                <TouchableOpacity style = {styles.linksButton1}></TouchableOpacity>
                <TouchableOpacity style = {styles.linksButton2}></TouchableOpacity>
                <TouchableOpacity style = {styles.linksButton3}></TouchableOpacity>
            </View>

        </View>
    );
}

const handleOnPress = () => { console.log(1) };

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

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
        paddingHorizontal: screenWidth,
        top: screenHeight / 9
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
        top: screenHeight / 6,
        alignItems: 'center',
        paddingHorizontal: screenWidth,
    },

    contentButton1: {
        borderWidth: 1,
        width: 220,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#FBC9FF',
        borderColor: '#FBC9FF',
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
        
      
    },

    links: {
        zIndex: 1,
        flex: 3,
        alignItems: 'center',
        top: screenHeight / 4,
        paddingHorizontal: screenWidth,
        backgroundColor: '#FFF',
    },

    linksButton1: {
        zIndex: 1,
        borderWidth: 1,
        borderColor: '#FBC9FF',
        width: 70,
        height: 70,
        backgroundColor: '#FBC9FF',
        borderRadius: 50,
    },

    linksButton2: {
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

    linksButton3: {
        zIndex: 1,
        borderWidth: 1,
        borderColor: '#FBC9FF',
        width: 70,
        height: 70,
        backgroundColor: '#FBC9FF',
        borderRadius:5 0,
        left: -130,
        bottom: 140
    }
});

