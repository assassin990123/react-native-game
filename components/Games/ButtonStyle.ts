import { Dimensions, StyleSheet } from 'react-native';

export const style = StyleSheet.create({
    button: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: (Dimensions.get('screen').height - Dimensions.get('window').height >= 25 ? 50 : 30),
        borderRadius: 10,
        width: '90%',
        height: 70,
        backgroundColor: '#EE8AF0',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
