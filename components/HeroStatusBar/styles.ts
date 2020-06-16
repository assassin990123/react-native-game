import { Dimensions, StyleSheet} from 'react-native';

const { width, height } = Dimensions.get('screen');
console.log(width);

export const styles = StyleSheet.create({
    StatusBar: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: '100%', 
        height: height * 0.08, 
        backgroundColor: '#EE8AF0', 
        justifyContent: 'center', 
        alignItems: 'center',
        top: 0,
        flexDirection: 'row',
        display: 'flex'
    },

    StatusBarSubMenu: {
        backgroundColor: '#B72FA9',
        borderRadius: 100,
        width: '60%', 
        height: 50, 
        justifyContent: 'center', 
        alignItems: 'center',
        top: 0,
        flexDirection: 'row',
        display: 'flex',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },

    iconStyleSubMenu: {
        borderRadius: 100, 
        height: width * 0.1,
        width: width * 0.1, 
        marginLeft: '4.8%', // MAGIC 4.8 )000))
        marginRight: '4.8%',
        justifyContent: 'center', 
        alignItems: 'center',
        borderColor: 'white', 
        borderWidth: 1
    },

    iconStyle: {
        borderRadius: 100, 
        backgroundColor: '#B72FA9',
        height: width * 0.13, // MAGIC 0.13 )000))
        width: width * 0.13, 
        marginLeft: '1%',
        marginRight: '1%',
        justifyContent: 'center', 
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 11,
    },

    defaultMargin: {
        marginLeft: '1.5%',
        marginRight: '1.5%'
    }, 

    levelText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 24, 
        color: 'white'
    }
});