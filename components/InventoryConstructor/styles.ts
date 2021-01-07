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
    },

    notchPadding: {
        paddingTop: 25,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#543731',
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
        width: '85%',
        height: '35%', 
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
    },

    modalExitButton: {
        backgroundColor: 'white', 
        width: '85%', 
        height: '10%', 
        justifyContent: 'center', 
        alignItems:'center', 
        borderColor:'#F37052', 
        borderRadius: 10, 
        borderWidth: 1, 
        marginTop: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },

    modalExitButtonText: {
        color: '#F37052',
        fontFamily: 'Montserrat-Medium',
        fontSize: 20, 
        textAlign: 'center'
    },

    modalStatePropName: {
        width: '48%', 
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: 16, 
        textAlign: 'left'
    },

    modalStatePropNumber: {
        width: '35%', 
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: 16, 
        textAlign: 'right'
    }
});
