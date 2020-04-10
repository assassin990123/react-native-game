import React, { Component } from "react";
import {View,Text,StyleSheet,Animated,TouchableNativeFeedback,Image} from 'react-native';
import {AntDesign,Entypo} from "@expo/vector-icons"
import { Colors } from "react-native/Libraries/NewAppScreen";

/*
    * Поправь код нейминг, а именно pin1 и тд. 
      Тк сейчас не понятно какой пин за что отвечает
*/

export default class SwipeTopMenu extends Component {
    animation = new Animated.Value(0)
    private open: boolean = true // idk нужно ли это или нет, но старнно что этого нет, тк ниже есть проверки на откртость меню

    toggleMenu = () => 
    {
        const toValue = this.open ? 0: 1;
        Animated.spring(this.animation,
            {toValue,
        friction:5}).start()

        // FIXME (glazunov): for what?
          this.open=!this.open 
    };
    
    private pinStyleConsrtuctor = (newOutputRange: [number, number]) => {
        return([ { scale: this.animation },
                 { translateY: this.animation.interpolate({inputRange:[0,1],outputRange:newOutputRange}) } ])       
    }

    render()
    {
    const pinStyle = { transform : this.pinStyleConsrtuctor([0, -90])}
    //     transform:
    // [
    //     {scale:this.animation},
    //     {
    //         translateY:this.animation.interpolate
    //         (
    //             {inputRange:[0,1],outputRange:[0,-90]}
    //         )
    //     }
    // ]
    //}
    const pinStyle1 = { transform:  this.pinStyleConsrtuctor([0, -180])}
    // [
    //     {scale:this.animation},
    //     {
    //         translateY:this.animation.interpolate
    //         (
    //             {inputRange:[0,1],outputRange:[0,-180]}
    //         )
    //     }
    // ]
    // }
    const pinStyle2 = { transform:  this.pinStyleConsrtuctor([0, -270])}
    // [
    //     {scale:this.animation},
    //     {
    //         translateY:this.animation.interpolate
    //         (
    //             {inputRange:[0,1],outputRange:[0,-270]}
    //         )
    //     }
    // ]
    // }
    const pinStyle3 = { transform:  this.pinStyleConsrtuctor([0, -360])}
    // [
    //     {scale:this.animation},
    //     {
    //         translateY:this.animation.interpolate
    //         (
    //             {inputRange:[0,1],outputRange:[0,-360]}
    //         )
    //     }
    // ]
    // }
    const pinStyle4 = { transform:  this.pinStyleConsrtuctor([0, -450])}
    // [
    //     {scale:this.animation},
    //     {
    //         translateY:this.animation.interpolate
    //         (
    //             {inputRange:[0,1],outputRange:[0,-450]}
    //         )
    //     }
    // ]
    // }

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
                    <Image  source={require('../assets/menu/Home.png')}  style={{height:60,width:60,tintColor:"#BD00FF" }} />
                    </Animated.View>
                </TouchableNativeFeedback> 
                  <TouchableNativeFeedback>
                    <Animated.View style={[styles.button,styles.secondary,pinStyle3]}> 
                    <Image  source={require('../assets/menu/Vat.png')}  style={{height:60,width:60,tintColor:"#BD00FF" }} />
                    </Animated.View>
                </TouchableNativeFeedback> 
                
                <TouchableNativeFeedback>
                    <Animated.View style={[styles.button,styles.secondary,pinStyle2]}> 
                    <Image  source={require('../assets/menu/Cat.png')}  style={{height:60,width:60,tintColor:"#BD00FF" }} />
                    </Animated.View>
                </TouchableNativeFeedback>  
                <TouchableNativeFeedback>
                    <Animated.View style={[styles.button,styles.secondary,pinStyle1]}> 
                    <Image  source={require('../assets/menu/Hat.png')}  style={{height:60,width:60,tintColor:"#rgba(87, 93, 243, 0.85)" }} />
                    </Animated.View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                    <Animated.View style={[styles.button,styles.secondary,pinStyle]}> 
                      <Image  source={require('../assets/menu/Dirt.png')}  style={{height:76,width:76,tintColor:"#rgba(87, 93, 243, 0.85)" }} />
                    </Animated.View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={this.toggleMenu }>
                    <Animated.View style={[styles.button,styles.menu,rotation]}> 
                    <Image  source={require('../assets/menu/ArrowUp.png')}  style={{height:100,width:20, }} />
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
            left:        150,
            position:   'absolute',
            alignItems: 'center',
            bottom:      110,
        },

        button: {
            position:        'absolute',
            width:           100,
            height:          100,
            borderRadius:    100/2,
            alignItems:     'center',
            justifyContent: 'center',
            shadowRadius:    10,
            shadowColor:    '#F02A4B',
            shadowOpacity:   0.3,
        },
        
        menu: {
            backgroundColor:"#EE8AF0",
        },
        
        secondary: {
            width:           80,
            height:          80,
            borderRadius:    80/2,
            backgroundColor: "#EE8AF0",
        }
    }
)