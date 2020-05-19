import React, { Component } from 'react';
import { StyleSheet, View,  Image, TouchableNativeFeedback,Animated,Dimensions } from 'react-native';

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }
  animation = new Animated.Value(0)
 

  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
    const toValue = this.open ? 0: 1;
      Animated.spring(this.animation,
          {toValue,
      friction:5}).start()
        this.open=!this.open 
  };
  onClickHandler = () => {
    alert('Button pressed');
    
}

  render() {
    const rotation =
    {
     transform:[{rotate:this.animation.interpolate(
                    { inputRange:[0,1],outputRange:["0deg","180deg"]}  )         
                         
                }
                 
             ]  
    }
    return (
      <View style={{flex:1}}>
        <Image  source={require('../assets/menu/Heart.png')}  style={styles.Heart} />
      <View style={styles.MainContainer}>
      <View style={styles.buttonContainer}>
      
        {this.state.show ? (
          <TouchableNativeFeedback onPress={this.onClickHandler}>
            <View style={styles.imageBorder}>
          <Image
          source={require('../assets/menu/Home.png')}   style={styles.Image_Home}  
            
          />
          </View>
           </TouchableNativeFeedback>
        ) : null}
       
        {this.state.show ? (
           <TouchableNativeFeedback onPress={this.onClickHandler}>
             <View style={styles.imageBorder}>
          <Image
          source={require('../assets/menu/Vat.png')}       style={styles.Image_Vat}  
          />
          </View>
          </TouchableNativeFeedback>
        ) : null}
        {this.state.show ? (
           <TouchableNativeFeedback onPress={this.onClickHandler}>
             <View style={styles.imageBorder}>
          <Image
          source={require('../assets/menu/Cat.png')}  style={styles.Image_Cat}  
          />
          </View>
          </TouchableNativeFeedback> 
        ) : null}
        {this.state.show ? (
           <TouchableNativeFeedback onPress={this.onClickHandler}>
             <View style={styles.imageBorder}>
          <Image
          source={require('../assets/menu/Hat.png')}      style={styles.Image_Hat}   
          />
          </View>
          </TouchableNativeFeedback>
        ) : null}

        {this.state.show ? (
           <TouchableNativeFeedback onPress={this.onClickHandler} >
             <View style={{margin:20,bottom:60}}>
          <Image
          source={require('../assets/menu/Dirt.png')}      style={{backgroundColor:"#575DF3",borderRadius:60,alignItems: 'center',}}   
          />
          </View>
          </TouchableNativeFeedback>
        ) : null}
        {this.state.show ? (
           <TouchableNativeFeedback onPress={this.onClickHandler}>
             <View style={styles.imageBorder_Shop}>
          <Image
          source={require('../assets/menu/Shop.png')}      style={styles.Image_Shop}   
          />
          </View>
          </TouchableNativeFeedback>
        ) : null}
      </View>

    
        <View style={styles.buttonUp}>
        <TouchableNativeFeedback  onPress={this.ShowHideComponent } >
            <Animated.View style={rotation}>
            <Image  source={require('../assets/menu/ArrowUp.png')} style={{tintColor:"#99CE78"}}     />
            </Animated.View>
        </TouchableNativeFeedback>
        </View>

        <View style={styles.buttonLeft}>
        <TouchableNativeFeedback  onPress={this.ShowHideComponent } >
            <Animated.View style={rotation}>
            <Image  source={require('../assets/menu/ArrowLeft.png')} style={{tintColor:"#99CE78"}}     />
            </Animated.View>
        </TouchableNativeFeedback>
        </View>
      </View>
      </View>
    );
  }
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    
    
  },
  buttonContainer:{
   
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    left:width/2.5,
 
   
    
            
            
  },
  Image_Home:{
    tintColor:"#575DF3",
    alignItems: 'center',
    left:14,
    top:11,
    
    
  },
  Image_Vat:{
    tintColor:"#575DF3",
    alignItems: 'center',
    left:10,
    top:10,
  },
  Image_Cat:{
    tintColor:"#575DF3",
    alignItems: 'center',
    left:5,
    top:15,
  },
  Image_Hat:{
    tintColor:"#575DF3",
    alignItems: 'center',
    left:10,
    top:10,
  },
  Image_Shop:{
    tintColor:"#575DF3",
    alignItems: 'center',
    left:80,
    
    
    
  },
  imageBorder_Shop:
  {
    
    width:249,
    height:51,
    margin:17,
    borderRadius:65,
    borderColor:"rgba(238, 138, 240, 0.85)",
    backgroundColor:"rgba(238, 138, 240, 0.85)",
    bottom:0,
    right:190,
  },
  imageBorder:
  {
    
    width:65,
    height:65,
    margin:17,
    borderRadius:65,
    borderColor:"rgba(238, 138, 240, 0.85)",
    backgroundColor:"rgba(238, 138, 240, 0.85)",
    bottom:40,
  },
  
  buttonUp:{
    
  left:width/2.5,
  bottom:height/10,
  
  },
  buttonLeft:{
    
    left:width/3.2,
    bottom:height/30,
    
    },
 Heart:
    {
        left: 246,
        top: 523,
       
    }
  
});