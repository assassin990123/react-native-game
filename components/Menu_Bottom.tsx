import React, { Component } from "react";
import { Dimensions ,StyleSheet, Image, View, TouchableOpacity } from 'react-native';

/*

    @brief: 

*/

export default class MenuBottom extends Component {
    constructor(props:any) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    state = { button: true };

    handleClick = (): void => {
        console.log('IDK WTF');
        this.setState({
            button: !this.state.button
        });
    };

    render(): JSX.Element {
        return (
            <View style = {styles.BottomMenu} >
                 <View style = {styles.Menu} >
                    <TouchableOpacity onPress = {this.handleClick} style={this.state.button ? styles.Home_true:styles.Home_false}>
                        <Image source={require('../assets/menu/Home.png')} style={this.state.button ? styles.images_Home_true:styles.images_Home_false} />
                    </TouchableOpacity >

                    <TouchableOpacity onPress={this.handleClick} style={this.state.button ? styles.Vat_true:styles.Vat_false}>
                        <Image  source={require('../assets/menu/Vat.png')} style={this.state.button ? styles.images_Vat_true:styles.images_Vat_false}/>
                    </TouchableOpacity >
                    
                    <TouchableOpacity onPress={this.handleClick} style={this.state.button ? styles.Cat_true:styles.Cat_false}>
                        <Image  source={require('../assets/menu/Cat.png')}  style={this.state.button ? styles.images_Cat_true:styles.images_Cat_false} />
                    </TouchableOpacity >

                    <TouchableOpacity onPress={this.handleClick} style={this.state.button ? styles.Cat_true:styles.Cat_false}>
                        <Image  source={require('../assets/menu/Hat.png')}style={this.state.button ? styles.images_Hat_true:styles.images_Hat_false}  />
                    </TouchableOpacity >

                    <TouchableOpacity onPress={this.handleClick} style={this.state.button ? styles.Dirt_true:styles.Dirt_false}>
                        <Image  source={require('../assets/menu/Dirt.png') }   style={this.state.button ? styles.images_Dirt_true:styles.images_Dirt_false}/>
                    </TouchableOpacity >
                </View>
            </View>
        );
    }
}

const { height } = Dimensions.get('window');


const styles = StyleSheet.create({
 
    BottomMenu:
    {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%', 
        height: 77, 
        backgroundColor: '#EE8AF0', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        top: height - 77
    },
    Menu:
    {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap', 
    },
    images_Dirt_true:
    {
        backgroundColor:"#575DF3",

        borderRadius:100,
    },
    images_Dirt_false:
    {
        backgroundColor:"#BD00FF",

        borderRadius:100,
    },
    images_Hat_true:
    {
        tintColor:"#575DF3",
       
    },
    images_Hat_false:
    {
        tintColor:"#BD00FF",
       
    },
    images_Cat_true:
    {
        tintColor:"#575DF3",
       
    },
    images_Cat_false:
    {
        tintColor:"#BD00FF"
       
    },
    images_Vat_true:
    {
        tintColor:"#575DF3",
        
    },
    images_Vat_false:
    {
        tintColor:"#BD00FF"
        
    },
    images_Home_true:
    {
        tintColor:"#575DF3",
        
    },
    images_Home_false:
    {
        tintColor:"#BD00FF",
        
    },

    defaultButton: {
        justifyContent: 'center',
        alignItems:"center",
        width:59,
        height:59,
        borderRadius:200,
        marginLeft:15,
        marginTop:11,
        backgroundColor:"#EE8AF0"
    },

    pressedButton: {
        justifyContent: 'center',
        alignItems:"center",
        width:59,
        height:59,
        borderRadius:200,
        marginLeft:15,
        marginTop:11,
        backgroundColor:"rgba(251, 201, 255, 0.85)"
    },

    Vat_true:
    {
        justifyContent: 'center',
        alignItems:"center",
        width:59,
        height:59,
        borderRadius:200,
        marginLeft:15,
        marginTop:11,
        backgroundColor:"#EE8AF0"
    },
    Vat_false:
    {
        justifyContent: 'center',
        alignItems:"center",
        width:59,
        height:59,
        borderRadius:200,
        marginLeft:15,
        marginTop:11,
        backgroundColor:"rgba(251, 201, 255, 0.85)",
        tintColor:"#BD00FF",
    },
    Home_true:
    {
        justifyContent: 'center',
        alignItems:"center",
        width:59,
        height:59,
        borderRadius:200,
        marginLeft:10,
        marginTop:11,
        backgroundColor:"#EE8AF0"
    },
    Home_false:
    {
        justifyContent: 'center',
        alignItems:"center",
        width:59,
        height:59,
        borderRadius:200,
        marginLeft:10,
        marginTop:11,
        backgroundColor:"rgba(251, 201, 255, 0.85)"
    },
    
    Cat_true:
    {
        justifyContent: 'center',
        alignItems:"center",
        width:59,
        height:59,
        borderRadius:200,
        marginLeft:15,
        marginTop:11,
        backgroundColor:"#EE8AF0"
    },
    Cat_false:
    {
        justifyContent: 'center',
        alignItems:"center",
        width:59,
        height:59,
        borderRadius:200,
        marginLeft:15,
        marginTop:11,
        backgroundColor:"rgba(251, 201, 255, 0.85)"
    },
    Hat_true:
    {
        justifyContent: 'center',
        alignItems:"center",
        width:59,
        height:59,
        borderRadius:200,
        marginLeft:15,
        marginTop:11,
        backgroundColor:"#EE8AF0"
    },
    Hat_false:
    {
        justifyContent: 'center',
        alignItems:"center",
        width:59,
        height:59,
        borderRadius:200,
        marginLeft:15,
        marginTop:11,
        backgroundColor:"rgba(251, 201, 255, 0.85)"
    },

    Dirt_true:
    {
        justifyContent: 'center',
        alignItems:"center",
        width:59,
        height:59,
        borderRadius:200,
       marginLeft:5,
       marginTop:11,
        backgroundColor:"#EE8AF0",
    },
    Dirt_false:
    {
        justifyContent: 'center',
        alignItems:"center",
        width:59,
        height:59,
        borderRadius:200,
       marginLeft:5,
       marginTop:11,
       backgroundColor:"rgba(251, 201, 255, 0.85)"
    },

    
    });