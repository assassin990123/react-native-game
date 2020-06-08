import React, {Component} from 'react';
    import {
        AppRegistry,
        StyleSheet,
        Text,
        View,
        TouchableHighlight
    } from 'react-native';

    let randomHex = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    export default class randomBackground extends Component {

        state={
          currentColor:"#FF7A00"
        }
    
        onClick() {
          let letters = '0123456789ABCDEF';
          let color = '#';
          for (let i = 0; i < 6; i++ ) {
             color += letters[Math.floor(Math.random() * 16)];
          }
          this.setState({currentColor:color})
        }
        render() {
            return (
                <TouchableHighlight onPress={ this.onClick.bind(this) } style={[styles.container, {backgroundColor: this.state.currentColor}]}>
                    <View>
                        <Text style={styles.instructions}>
                            Tap to change the background
                        </Text>
                    </View>
                </TouchableHighlight>
            );
        }
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        instructions: {
            color: "white"
        }
    });
    AppRegistry.registerComponent('randomBackground', () => randomBackground);