import React, { Component } from "react";
import {View,Text,StyleSheet,Animated,TouchableNativeFeedback,Image,TouchableOpacity} from 'react-native';
import {AntDesign,Entypo} from "@expo/vector-icons"
import { Colors } from "react-native/Libraries/NewAppScreen";

/*
    * Поправь код нейминг, а именно pin1 и тд. 
      Тк сейчас не понятно какой пин за что отвечает
*/

export default class SwipeTopMenu extends Component {
    animation = new Animated.Value(0)
    private open: boolean = false // idk нужно ли это или нет, но старнно что этого нет, тк ниже есть проверки на откртость меню

    toggleMenu = () => 
    {
        const toValue = this.open ? 0: 1;
        Animated.spring(this.animation,
            {toValue,
        friction:5}).start()

        // FIXME (glazunov): for what?
          this.open=!this.open 
    };
    
    private _pinStyleConsrtuctor = (newInputRange: [number, number], newOutputRange: [number, number]) => {
        return([ { scale: this.animation },
                 { translateX: this.animation.interpolate({inputRange:newInputRange, outputRange:newOutputRange}) } ])       
    }

    render()
    {
   
        const pinStyle4 = { transform:  this._pinStyleConsrtuctor([0, 1], [0, -670])}


    const rotation =
    {
     transform:[{rotate:this.animation.interpolate(
                    { inputRange:[0,1],outputRange:["0deg","180deg"]}  )         
                         
                }
                 
             ]  
    }
    

            return(
                <View style={styles.container}>
                    <TouchableNativeFeedback>
                    <Animated.View style={[styles.button,styles.secondary,pinStyle4]}> 
                    <Image  source={require('../assets/menu/Shop.png')}  style={{tintColor:"#BD00FF" }} />
                    </Animated.View>
                </TouchableNativeFeedback> 
                  

                <TouchableNativeFeedback onPress={this.toggleMenu } >
                    <Animated.View style={[styles.button,styles.menu,rotation]}> 
                    <Image  source={require('../assets/menu/ArrowLeft.png')}   />
                    </Animated.View>
                </TouchableNativeFeedback>
            </View>
            
            );
    }
}

const styles = StyleSheet.create
(
    {
        container: {
            left:        300,
            position:   'absolute',
            alignItems: 'center',
            bottom:      110,
        },

        button: {
            position:        'absolute',
            alignItems:     'center',
            justifyContent: 'center',
            top:80,
            left:-25
        },
        shadow:{
            
        },
        
        menu: {
            backgroundColor:"#FFF",
        },
        
        secondary: {
            
            left:382,
            width:           249,
            height:          51,
            borderRadius:    80/2,
            backgroundColor: "#EE8AF0",
            top:50,
        }
    }
)