import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },

    selector: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
    },

    listView: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        marginBottom: 5
    },

    descriprionText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        marginBottom: 15
    },

    effectsText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 10,
    }, 

    priceText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
    }, 

    backButton: {
        backgroundColor: '#E76BC0', 
        borderRadius: 10,
        width: '90%', 
        height: '60%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 10, 
        marginLeft: 'auto', 
        marginRight: 'auto'
    },

    pressedSection: {
        width: '50%',
        height: '100%', 
        borderWidth: 1, 
        borderColor: 'black', 
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F57CFF'
    },

    defaultSection: {
        width: '16.6%', 
        height: '100%', 
        borderWidth: 1, 
        borderColor: 'black', 
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F57CFF'
    }
});
