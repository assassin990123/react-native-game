import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        position: 'absolute', 
        zIndex: 1, 
        left: width * 0.83, 
        top: height * 0.09,
    },

    topButton: {
        backgroundColor: '#EE8AF0', 
        borderRadius: 100,
        alignItems: 'center', 
        justifyContent: 'center', 
        width: width * 0.13, 
        height: width * 0.13, 
        marginBottom: 16, 
        marginTop: 10
    }, 

    button: {
        backgroundColor: '#EE8AF0', 
        borderRadius: 100,
        alignItems: 'center', 
        justifyContent: 'center', 
        width: width * 0.13, 
        height: width * 0.13,
        marginBottom: 16, 
    },

    iconImage: {
        width: width * 0.08, 
        resizeMode: 'contain'
    }
});
