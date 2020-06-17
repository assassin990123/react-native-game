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
        top: height/10
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
    
    header: {
        backgroundColor: colorSpectrum.white,
        flex: 2,
        //top: height / 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    logoText: {
        fontWeight:'bold',
        fontSize: 50,
        color:colorSpectrum.black,
        //flex: 1,
        bottom: height/15
    },

    backButton: {
        //marginBottom: 10,
        //flexDirection: 'column',
      //  justifyContent: 'flex-end',
      //  alignItems: 'flex-start',
        right:width/2.5,
       // top: height/8
    },

    basketButton:{
      //  justifyContent: 'flex-end',
        //alignItems: 'flex',
        left:width/2.5,
        bottom:height/25
    },

    buttonsText: {
        fontWeight:'bold',
        fontSize: 20,
        color:colorSpectrum.white,
        fontFamily: 'Montserrat-Regular'
        //fontFamily: 
    },

    descriptionContaner:{
        zIndex: 7,
        borderRadius: 10,
        borderColor: colorSpectrum.alternativPink,
        borderWidth: 1,
        width: width / 1.2,
        height: height / 3,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },

    playButton:{
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
        //top: height/2
    },

    nameContaner:{
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
        //top: height/2
    }
});