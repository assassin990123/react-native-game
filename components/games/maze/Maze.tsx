import React from 'react';

import { GameEngine } from "react-native-game-engine";

import { StyleSheet, View, ImageBackground} from 'react-native';
import { Constants } from './Constants';
import { GameLoop } from './GameLoop';
import Hero from './Hero';
import Wall from './Wall';
import Finish from './Finish';

import { styles } from './styles';

export default class Maze extends React.Component {


   // boardSize:any = Constants.GRID_SIZE * Constants.CELL_SIZE;
  engine:any = null;
  
  state = {
    running: true
  }

  constructor(props:any){
    super(props);
  }

  onEvent = (e:any) => {
    if (e.type === "game-over"){
      //Alert.alert("Game Over");
      alert("Game Over");   
      this.setState({
        running: false
      })   
    }
  }

  randomBetween = (min:any, max:any) => {
    return Math.floor(Math.random() *  (max - min + 1) + min);
  }

  render() {
    return (
      <ImageBackground source={require('./assets/Back.png')} style={{width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT}}>
        <View style = {{justifyContent: "center"}}>
          <GameEngine
            ref = {(ref) => {this.engine = ref}}

            style={styles.content}

            systems = {[ GameLoop ]}

            entities = {{
              hero: { position: {x : 13, y : 76}, startPos: {x : 13, y : 76}, renderer:  <Hero/>},
              wall: { elements: [], length : 43, filled : false, el : -1, intersect : true , renderer: <Wall/> },
              finish: {position: {x : 41, y : 83 }, renderer: <Finish/>},
              state: {win : false}
            }}

            onEvent  = {this.onEvent}
            running = {this.state.running}
            
          />
        </View>        
      </ImageBackground>
    );
        
    }
  } 

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000000',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
//   controls: {
//     width: 300,
//     height: 300,
//     flexDirection: 'column'
//   },
//   controlRow:{
//     width: 300,
//     height: 100,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   control:{
//     width: 100,
//     height: 100,
//     backgroundColor: 'blue'
//   },
//   NGbutton:{
//     width: 100,
//     height: 100,
//     backgroundColor: 'blue',
//     flexDirection: 'column'
//   }

// });
