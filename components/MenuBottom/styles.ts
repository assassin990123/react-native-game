import { Dimensions, StyleSheet} from 'react-native';

const { height } = Dimensions.get('window');

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
        tintColor: '#575DF3'
    },

    imagePressedColor: {
        tintColor: '#BD00FF'
    },

    defaultButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '15%',
        height: '90%',
        borderRadius: 200,
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: '1%',
        backgroundColor: '#EE8AF0'
    },

    pressedButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '15%',
        height: '90%',
        borderRadius: 100,
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: '1%',
        backgroundColor: 'rgba(251, 201, 255, 0.85)'
    },
});