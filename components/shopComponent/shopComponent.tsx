import React, { Component } from "react";
import { View, FlatList, Text, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { styles } from './styles';

const { width, height } = Dimensions.get('screen');

interface ShopItem {
    title: string,
    desc: string,
    buffs: number,
    debuf: number, 
    price: number
}

export default class ShopComponent extends Component {
    constructor(props: any) {
        super(props);
    }

    state = {
        clothesSection: true,
        puritySection: false,
        nutritionSection: false,
        gaietySection: false
    }

    someItesms: ShopItem[] = [  {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                                {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                                {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                                {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                                {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                                {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                                {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                                {title: 'Шаasdasdрик', desc: 'Шasdsadарик', buffs: 10, debuf: 10, price: 10},
                                {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                                {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                                {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                                {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                                {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                                {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                                {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                                {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                                {title: 'gfhjfghj', desc: 'Шарfhjghfjик', buffs: 10, debuf: 10, price: 10}, ];

    render() {
        return (
            <ImageBackground source={require('./assets/background.png')} style={styles.container}> 
                <View style={styles.selector}>
                    <TouchableOpacity style={styles.pressedSection}></TouchableOpacity>
                    <TouchableOpacity style={styles.defaultSection}></TouchableOpacity>
                    <TouchableOpacity style={styles.defaultSection}></TouchableOpacity>
                    <TouchableOpacity style={styles.defaultSection}></TouchableOpacity>
                </View>
                
                <View style={{height: '75%'}}>
                    <FlatList
                        data={this.someItesms}
                        contentContainerStyle={styles.listView}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => <View style={{flexDirection: 'row', width: '95%', height: height * 0.13, marginTop: 15, backgroundColor: '#F57CFF', borderRadius: 10}}> 
                                    <View style={{width: '20%', alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={require('./assets/balloon.png')}/>
                                    </View>
                                    <View style={{width: '50%', justifyContent: 'center'}}> 
                                        <Text style={styles.titleText}>{item.title}</Text>
                                        <Text style={styles.descriprionText}>{item.desc}</Text>
                                        <Text style={styles.effectsText}>{`-${item.debuf} чистота +${item.buffs} настроение`}</Text>
                                    </View>
                                    <View style={{width: '30%'}}>
                                        <View style={{height: '60%', alignItems: 'center', justifyContent: 'center'}}>
                                            <Text style={styles.priceText}>{`${item.price}P`}</Text>
                                        </View>

                                        <TouchableOpacity style={{backgroundColor: 'yellow', width: '100%', height: '40%', alignItems: 'center', justifyContent: 'center', borderBottomRightRadius: 10, borderTopLeftRadius: 10}}>
                                            <Text style={[styles.priceText, {fontSize: 16}]}>Купить</Text>
                                        </TouchableOpacity>
                                    </View>
                            </View>
                        }/>
                    </View>

                    <View style={{width: '100%', height: '15%', justifyContent: 'center', alignContent: 'center'}}>
                        <TouchableOpacity  onPress={() => { Actions.GameComponent(); }}
                                            style={styles.backButton}> 
                                <Text style={{color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 17}}>Назад</Text>
                        </TouchableOpacity>
                    </View>
                    
            </ImageBackground>
        );
    }
}
