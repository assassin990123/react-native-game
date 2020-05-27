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
       // flexDirection: 'column',
       // top:10
    },

    logoText: {
        fontWeight:'bold',
        fontSize: 50,
        color:colorSpectrum.black,
       // flex: 1,
        bottom: height/15
    },

    input: {
        width: width / 1.5,
        height: height / 15,
        marginLeft: width / 18,
        marginRight: width / 18,
        borderBottomColor: colorSpectrum.pink,
       // flex: 2,

        fontSize: height / 50
    },

    header: {
        backgroundColor: colorSpectrum.white,
        flex: 1,
        top: height / 9,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    middle: {
        backgroundColor: colorSpectrum.white,
        //flex: 2,
        //top: height / 9,
      //  alignItems: 'center',
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

    logButton: {
        //zIndex: 7,
       // top: height / 60,
        backgroundColor: colorSpectrum.lightPink,
        borderRadius: 10,
        borderColor: colorSpectrum.lightPink,
        borderWidth: 1,
        width: width / 1.2,
        height: height / 14,
        //marginBottom: 10,
       // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Montserrat-Regular',
        bottom: height/8
    },

    regButton: {
        zIndex: 7,
       // top: height / 60,
        backgroundColor: colorSpectrum.alternativPink,
        borderRadius: 10,
        borderColor: colorSpectrum.alternativPink,
        borderWidth: 1,
        width: width / 1.2,
        height: height / 14,
        bottom: height/8,
        //marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    donatButton:{
        zIndex: 7,
    // top: height / 60,
        backgroundColor: colorSpectrum.white,
        borderRadius: 10,
        borderColor: colorSpectrum.orange,
        borderWidth: 1,
        width: width / 1.2,
        height: height / 14,
        //marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    donatButtonsText: {
        fontWeight:'normal',
        fontSize: 15,
        color:colorSpectrum.red
    },

    buttonsText: {
        fontWeight:'bold',
        fontSize: 20,
        color:colorSpectrum.white,
        //fontFamily: 
    },

    agitText:{
        fontWeight:'normal',
        fontSize: 14,
        color:colorSpectrum.alternativPink,
        width: width / 1.2,
        height: height / 14,
        marginBottom: 10,
        marginTop: 10,
        bottom: height/8,
       // flexDirection: 'row',
        //justifyContent: 'center',
        //alignItems: 'center',
        textAlign: 'center',
        textAlignVertical:'center'
    },

    donation: {
        flexDirection: 'row',
        flex: 0.3,
        //alignItems: 'center',
        //justifyContent: 'center',
        //top: height / 300,
        backgroundColor: colorSpectrum.white,
    },

    socialLoginLink: {
        zIndex: 1,
        borderWidth: 1,
        borderColor: colorSpectrum.pink,
        width: height / 10,
        height: height / 10,
        backgroundColor: colorSpectrum.pink,
        borderRadius: height,
        marginLeft: 10,
        marginRight: 10
    },

    logInText: {
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
        bottom: height/7
        //flexDirection: 'row',
        //alignItems: 'stretch'
         
    }
});