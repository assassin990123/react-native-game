import React, { Component } from "react";
import {Dimensions,View,Text,StyleSheet,Animated,TouchableNativeFeedback,Image,TouchableOpacity} from 'react-native';
import SwipeTopMenu from './swipeTopMenu';
import SwipeLeftMenu from './swipeLeftMenu';

export default class Menu extends Component {

    render()
    {
        return(
            <View style={{flex:1}}>
            <Image  source={require('../assets/menu/Heart.png')}  style={style.Heart} />
            <SwipeLeftMenu/>
            <SwipeTopMenu/>
            </View>
        )

    }
    
}
const { width, height } = Dimensions.get('window');
const style=StyleSheet.create
(
    {
        Heart:
        {
            left: 246,
            top: 523,
           
        }
    }
)