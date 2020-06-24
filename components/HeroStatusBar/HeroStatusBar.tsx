import React, { Component } from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet, Dimensions, Modal, BackHandler  } from 'react-native';

import {styles} from './styles';

import VisualEffectsController from '../../endpoints/VisualEffecrsController';

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

        modalVisible: false,
        currentBrightness: VisualEffectsController.getInstance().currentBrightness()
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
                                    <Text style={[styles.modalSettingsTitle]}>Яркость</Text>
                                </View>
                                <View style={{flexDirection: 'row', height: '50%', justifyContent: 'center', alignItems: 'center'}}> 
                                    <TouchableOpacity style={styles.modalSettingArrow} onPress={() => {
                                        VisualEffectsController.getInstance().lowerBrightness();
                                        this.setState({currentBrightness: VisualEffectsController.getInstance().currentBrightness()})
                                    }}>
                                        <Image source={require('./assets/modalFiles/arrow-left.png')}/>
                                    </TouchableOpacity>
                                    <Text style={styles.modalSettingNumber}>{this.state.currentBrightness}</Text>
                                    <TouchableOpacity style={styles.modalSettingArrow} onPress={() => {
                                        VisualEffectsController.getInstance().raiseBrightness();
                                        this.setState({currentBrightness: VisualEffectsController.getInstance().currentBrightness()})
                                    }}>
                                        <Image source={require('./assets/modalFiles/arrow-right.png')}/>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.modalSettingItem}>
                                <View style={styles.modalSettingsTitleBox}> 
                                    <Text style={[styles.modalSettingsTitle]}>Громкость эффектов</Text>
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

                            <TouchableOpacity style={styles.modalExitButton} onPress={() => {BackHandler.exitApp(); VisualEffectsController.getInstance().setDefaultParams(); } }>
                                <Text style={styles.modalExitButtonText}>кароче типа выйти</Text>
                            </TouchableOpacity>
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
