import React, { Component } from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet, Dimensions, Modal } from 'react-native';

import {styles} from './styles';

/*
*
    @brief: Status bar to display characters needs, such as sleep, food, lvl and etc.
*
*/

interface IHeroStatusBar {
    handler: Function,
}

export default class HeroStatusBar extends Component<IHeroStatusBar> {
    constructor (props: any) {
        super(props);
        props.handler();
    }

    state = {
        _icons: {
            satietly:  { link: require('./assets/satiety.png'),   currentState: 100 },
            sleep:     { link: require('./assets/sleep.png'),     currentState: 100 },
            cleanness: { link: require('./assets/cleanness.png'), currentState: 100 },
            mood:      { link: require('./assets/mood.png'),      currentState: 100 }
        },

        modalVisible: false
    };

    getCurrentColor = (currntStateNum: number) => {
        if (currntStateNum < 50) {
            return StyleSheet.create( { color: {backgroundColor: '#E23535'}} );
        } else if (currntStateNum > 50 && currntStateNum < 80) {
            return StyleSheet.create( { color: {backgroundColor: '#FCB712'}} );
        } else {
            return StyleSheet.create( { color: {backgroundColor: '#4EB734'}} );
        }
    };

    render(): JSX.Element {
        let StatusBarItems: JSX.Element[] = [];

        for (let [key, value] of Object.entries(this.state._icons)) {
            StatusBarItems.push(<TouchableOpacity onPress={() => {}} 
                                               style={[styles.iconStyleSubMenu, this.getCurrentColor(value.currentState).color]}
                                               activeOpacity={1}
                                               key={key}>
                                    <Image source={value.link} />
                            </TouchableOpacity>);
        }
        
        return (
            <View style = {Dimensions.get('screen').height - Dimensions.get('window').height > 25 ? styles.notchPadding : null}>
                <Modal animationType='fade'
                       transparent={true}
                       visible={this.state.modalVisible}
                       onRequestClose={() => {this.setState({modalVisible: false})}}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={[styles.modalTitle]}>Настройки</Text>

                            <View style={styles.modalSettingItem}>
                                <View style={styles.modalSettingsTitleBox}> 
                                    <Text style={[styles.modalSettingsTitle]}>Громкость музыки</Text>
                                </View>
                                <View style={{flexDirection: 'row', height: '50%', justifyContent: 'center', alignItems: 'center'}}> 
                                    <TouchableOpacity style={styles.modalSettingArrow}><Image source={require('./assets/modalFiles/arrow-left.png')}/></TouchableOpacity>
                                    <Text style={styles.modalSettingNumber}>5</Text>
                                    <TouchableOpacity style={styles.modalSettingArrow}><Image source={require('./assets/modalFiles/arrow-right.png')}/></TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.modalSettingItem}>
                                <View style={styles.modalSettingsTitleBox}> 
                                    <Text style={[styles.modalSettingsTitle]}>Громкость музыки</Text>
                                </View>
                                <View style={{flexDirection: 'row', height: '50%', justifyContent: 'center', alignItems: 'center'}}> 
                                    <TouchableOpacity style={styles.modalSettingArrow}><Image source={require('./assets/modalFiles/arrow-left.png')}/></TouchableOpacity>
                                    <Text style={styles.modalSettingNumber}>5</Text>
                                    <TouchableOpacity style={styles.modalSettingArrow}><Image source={require('./assets/modalFiles/arrow-right.png')}/></TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.modalSettingItem}>
                                <View style={styles.modalSettingsTitleBox}> 
                                    <Text style={[styles.modalSettingsTitle]}>Громкость музыки</Text>
                                </View>
                                <View style={{flexDirection: 'row', height: '50%', justifyContent: 'center', alignItems: 'center'}}> 
                                    <TouchableOpacity style={styles.modalSettingArrow}><Image source={require('./assets/modalFiles/arrow-left.png')}/></TouchableOpacity>
                                    <Text style={styles.modalSettingNumber}>5</Text>
                                    <TouchableOpacity style={styles.modalSettingArrow}><Image source={require('./assets/modalFiles/arrow-right.png')}/></TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity style={{backgroundColor: 'white', width: '85%', height: '10%', justifyContent: 'center', alignItems:'center', borderColor:'#F37052', borderRadius: 10, borderWidth: 1, marginTop: 40}}><Text style={{color: '#F37052'}}>кароче типа выйти</Text></TouchableOpacity>
                        </View>   
                    </View>
                </Modal>

                <View style={styles.StatusBar}>
                    <TouchableOpacity style={[styles.iconStyle, styles.defaultMargin]}>
                        <Text style={styles.levelText}>12</Text>
                    </TouchableOpacity>

                    <View style={[styles.StatusBarSubMenu, styles.defaultMargin]}>
                        {StatusBarItems}
                    </View>

                    <TouchableOpacity style={[styles.iconStyle, styles.defaultMargin]} onPress={() => {
                        this.setState({modalVisible: true});
                    }}>
                        <Image source={require('./assets/settings.png')} />
                    </TouchableOpacity>              
                </View>
            </View>
        );
    }
}
