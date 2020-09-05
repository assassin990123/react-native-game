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
    },

    header: {
        backgroundColor: colorSpectrum.white,
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '5%'
    },

    input: {
        width: width / 1.5,
        height: height / 15,
        marginLeft: width / 18,
        marginRight: width / 18,
        borderBottomColor: colorSpectrum.pink,
    },

    inputContainer: {
        backgroundColor: colorSpectrum.white,
        borderRadius: 10,
        borderColor: colorSpectrum.darkPink,
        borderWidth: 1,
        width: width / 1.2,
        height: height / 14,
        margin: 10,
    },

    headerText: {fontWeight:'normal',
        fontSize: 16,
        color:colorSpectrum.black,
        width: width / 1.2,
        height: height / 14,
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center',
        textAlignVertical:'center',
        fontFamily: 'Montserrat-SemiBold'
    },

    backButton: {
        justifyContent: 'flex-end',
        right:width/2.5,
    },

    selectButton: {
        borderRadius: 10, 
        width: '90%', 
        height: '13%',
        marginLeft: width * 0.085, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 10
    },

    agreeButton: {
        backgroundColor: '#E76BC0', 
        borderRadius: 10,
        width: '90%', 
        height: '10%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginLeft: 'auto', 
        marginRight: 'auto'
    }
})