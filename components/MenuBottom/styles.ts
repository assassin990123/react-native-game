import { Dimensions, StyleSheet} from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    BottomMenu: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%', 
        height: 77, 
        backgroundColor: '#EE8AF0', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        top: height - 77
    },

    Menu: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap', 
    },

    imageDefaultColor: {
        tintColor: '#B72FA9'
    },

    imagePressedColor: {
        tintColor: '#FFFFFF'
    },

    defaultButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.155,
        height: width * 0.155,
        borderRadius: 100,
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: '1%',
        backgroundColor: '#EE8AF0'
    },

    pressedButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.155,
        height: width * 0.155,
        borderRadius: 100,
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: '1%',
        backgroundColor: '#B72FA9'
    },
});
