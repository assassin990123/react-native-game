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
        alignItems: 'center',
        justifyContent: 'center'
    },

    logoText: {
        fontWeight:'bold',
        fontSize: 50,
        color:colorSpectrum.black,
        bottom: height/15
    },

    backButton: {
        right:width/2.5,
    },

    basketButton:{
        left:width/2.5,
        bottom:height/25
    },

    buttonsText: {
        fontWeight:'bold',
        fontSize: 20,
        color:colorSpectrum.white,
        fontFamily: 'Montserrat-Regular'
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
        backgroundColor: colorSpectrum.alternativPink,
        borderRadius: 10,
        borderColor: colorSpectrum.alternativPink,
        borderWidth: 1,
        width: width / 1.2,
        height: height / 14,
        justifyContent: 'center',
        alignItems: 'center',
    },

    nameContaner:{
        zIndex: 7,
        backgroundColor: colorSpectrum.alternativPink,
        borderRadius: 10,
        borderColor: colorSpectrum.alternativPink,
        borderWidth: 1,
        width: width / 1.2,
        height: height / 14,
        justifyContent: 'center',
        alignItems: 'center',
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
        height: '45%', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    modalTitle: {
        fontFamily: 'Montserrat-SemiBold',
        textTransform: 'uppercase',
        fontSize: 20
    },
    
    modalText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16, 
        textAlign: 'center'
    },

    modalPadding: {
        paddingBottom: 20
    },

    modalButton: {
        marginLeft: 18, 
        marginRight: 18, 
        height: '100%', 
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, 
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },

    modalButtonGroup: {
        flexDirection: 'row', 
        height: '16%',
        width: '30%', 
        justifyContent: 'center', 
        marginTop: 10
    }
});