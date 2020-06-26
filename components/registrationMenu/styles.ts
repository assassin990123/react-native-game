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
        //top: height / 10,
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
       // top: height / 1.7,
        backgroundColor: colorSpectrum.alternativPink,
        borderRadius: 10,
        borderColor: colorSpectrum.alternativPink,
        borderWidth: 1,
        width: width / 1.2,
        height: height / 14,
        //marginBottom: 10,
       // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    continueButton: {
        zIndex: 7,
       // top: height / 1.7,
        backgroundColor: colorSpectrum.alternativPink,
        borderRadius: 10,
        borderColor: colorSpectrum.alternativPink,
        borderWidth: 1,
        width: width / 1.2,
        height: height / 14,
        //marginBottom: 10,
       // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: height/20
    },

    backButton: {
        //marginBottom: 10,
        //flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        right:width/2.5,
        top: height/8
    },

    logoText: {
        fontWeight:'bold',
        fontSize: 50,
        color:colorSpectrum.black,
        //flex: 1,
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
       // alignItems: 'stretch' 
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
       // alignItems: 'stretch' 
        bottom: height/20  
    },
    
    buttonsText: {
        fontWeight:'bold',
        fontSize: 20,
        color:colorSpectrum.white,
        fontFamily: 'Montserrat-Regular'
        //fontFamily: 
    },

    modalOkButton: {
        backgroundColor: 'white', 
        width: '85%', 
        height: '20%', 
        justifyContent: 'center', 
        alignItems:'center', 
        borderColor:'#F37052', 
        borderRadius: 10, 
        borderWidth: 1, 
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },

    modalOkButtonText: {
        color: '#F37052',
        fontFamily: 'Montserrat-Medium',
        fontSize: 20, 
        textAlign: 'center'
    },

    modalContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(52, 52, 52, 0.8)', 
        width: '100%', 
        height: '100%'
    },

    modalView: {
        borderRadius: 10,
        backgroundColor: 'white',
        width: '80%',
        height: '35%', 
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 30, 
        marginBottom: 15,
        textAlign: 'center'
    },

    modalErrorText: {
        width: '48%', 
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: 16, 
        textAlign: 'center',
        height: '40%'
    },

});