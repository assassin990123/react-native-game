import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

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
        backgroundColor: colorSpectrum.white,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: height/30
    },

    header: {
        backgroundColor: colorSpectrum.white,
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerButton: {
        borderWidth: 1,
        borderColor: colorSpectrum.pink,
        borderEndWidth: 30,
        borderBottomWidth: 30,
        borderLeftWidth: 30,
        borderTopWidth: 30,
        shadowColor: colorSpectrum.black,
        shadowOpacity: 200,
        alignItems: 'center',
        width: height / 7,
        height: height / 7,
        backgroundColor: colorSpectrum.white,
        borderRadius: height
    },
    
    sendButton: {
        zIndex: 7,
        bottom:height/10,
        backgroundColor: colorSpectrum.alternativPink,
        borderRadius: 10,
        borderColor: colorSpectrum.alternativPink,
        borderWidth: 1,
        width: width / 1.2,
        height: height / 14,
        justifyContent: 'center',
        alignItems: 'center'
    },

    continueButton: {
        zIndex: 7,
        backgroundColor: colorSpectrum.alternativPink,
        borderRadius: 10,
        borderColor: colorSpectrum.alternativPink,
        borderWidth: 1,
        width: width / 1.2,
        height: height / 14,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: height/20
    },

    backButton: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        right:width/2.5,
        top: height/8
    },

    logoText: {
        fontWeight:'bold',
        fontSize: 50,
        color:colorSpectrum.black,
        bottom: height/15
    },

    input: {
        width: width / 1.5,
        height: height / 15,
        marginLeft: width / 18,
        marginRight: width / 18,
        borderBottomColor: colorSpectrum.pink,
        flex: 1,
        fontSize: height / 50
    },

    inputContainer: {
        backgroundColor: colorSpectrum.white,
        borderRadius: 10,
        borderColor: colorSpectrum.darkPink,
        borderWidth: 1,
        width: width / 1.2,
        height: height / 14,
        marginBottom: 10,
        flexDirection: 'row',
        bottom: height/10  
    },

    inputSmsContainer: {
        backgroundColor: colorSpectrum.white,
        borderRadius: 10,
        borderColor: colorSpectrum.darkPink,
        borderWidth: 1,
        width: width / 1.2,
        height: height / 14,
        marginBottom: 10,
        flexDirection: 'row',
        bottom: height/20  
    },
    
    buttonsText: {
        fontWeight:'bold',
        fontSize: 20,
        color:colorSpectrum.white,
        fontFamily: 'Montserrat-Regular'
    },

});
