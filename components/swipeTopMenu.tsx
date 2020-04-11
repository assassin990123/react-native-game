import React, { Component } from "react";
import {View,Text,StyleSheet,Animated,TouchableNativeFeedback,Image,TouchableOpacity} from 'react-native';


export default class SwipeTopMenu extends Component {
    animation = new Animated.Value(0)
    private open: boolean = false 
    toggleMenu = () => 
    {
        const toValue = this.open ? 0: 1;
        Animated.spring(this.animation,
            {toValue,
        friction:5}).start()
          this.open=!this.open 
    };
    
    private _pinStyleConsrtuctorY = (newInputRange: [number, number], newOutputRange: [number, number]) => {
        return([ { scale: this.animation },
                 { translateY: this.animation.interpolate({inputRange:newInputRange, outputRange:newOutputRange}) } ])       
    }
   

    render()
    {
    const pinStyle = { transform : this._pinStyleConsrtuctorY([0, 1], [0, -240])}
    const pinStyle1 = { transform:  this._pinStyleConsrtuctorY([0, 1], [0, -330])}
    const pinStyle2 = { transform:  this._pinStyleConsrtuctorY([0, 1], [0, -420])}
    const pinStyle3 = { transform:  this._pinStyleConsrtuctorY([0, 1], [0, -510])}
    const pinStyle4 = { transform:  this._pinStyleConsrtuctorY([0, 1], [0, -600])}


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
                    <Image  source={require('../assets/menu/Home.png')}  style={{tintColor:"#BD00FF" }} />
                    </Animated.View>
                </TouchableNativeFeedback> 
                  <TouchableNativeFeedback>
                    <Animated.View style={[styles.button,styles.secondary,pinStyle3]}> 
                    <Image  source={require('../assets/menu/Vat.png')}  style={{tintColor:"#BD00FF" }} />
                    </Animated.View>
                </TouchableNativeFeedback> 
                
                <TouchableNativeFeedback>
                    <Animated.View style={[styles.button,styles.secondary,pinStyle2]}> 
                    <Image  source={require('../assets/menu/Cat.png')}  style={{tintColor:"#BD00FF" }} />
                    </Animated.View>
                </TouchableNativeFeedback>  
                <TouchableNativeFeedback>
                    <Animated.View style={[styles.button,styles.secondary,pinStyle1]}> 
                    <Image  source={require('../assets/menu/Hat.png')}  style={{tintColor:"#rgba(87, 93, 243, 0.85)" }} />
                    </Animated.View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                    <Animated.View style={[styles.button,styles.secondary,pinStyle]}> 
                      <Image  source={require('../assets/menu/Dirt.png')}  style={{tintColor:"#rgba(87, 93, 243, 0.85)" }} />
                    </Animated.View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={this.toggleMenu } >
                    <Animated.View style={[styles.button,styles.menu,rotation]}> 
                    <Image  source={require('../assets/menu/ArrowUp.png')}  />
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
            width:           70,
            height:          70,
            borderRadius:    60/2,
            alignItems:     'center',
            justifyContent: 'center',
            top:10,
            left:150
        },
        shadow:{
            
        },
        
        menu: {
        
        },
        
        secondary: {
            top:150,
            width:           60,
            height:          60,
            borderRadius:    60/2,
            backgroundColor: "#EE8AF0",
        }
    }
)