import { StyleSheet } from 'react-native';
import { Constants } from './Constants';

const colorSpectrum = {
    white: '#ffffff',
    pink:  '#FBC9FF',
    lightPink:  '#F57CFF',
    darkPink: '#C19AC5',
    alternativPink: '#B72FA9',
    black: '#000000',
    orange:'#FF7A00',
    red:'#C34A08'
}


export const styles = StyleSheet.create({
    content: {
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT,
        flex: 0
    }

})