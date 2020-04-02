import React from "react"
import { Dimensions ,StyleSheet, Text, View,TouchableOpacity, Platform,StatusBar } from 'react-native';

/*  тут очень полезый текст */

const SM = () =>  
(
<View style={styles.container}>
<View style={styles.header} > 


<TouchableOpacity  onPress={handleOnPress} style={styles.header_button }> 

  </TouchableOpacity>
</View>


<View style={styles.content}>
    <TouchableOpacity style={styles.content_button1}>

    </TouchableOpacity>
    <TouchableOpacity style={styles.content_button2}>

    </TouchableOpacity>
    <TouchableOpacity style={styles.content_button3}>

</TouchableOpacity>
</View>
<View style={styles.links}>
<TouchableOpacity style={styles.links_button1}></TouchableOpacity>
<TouchableOpacity style={styles.links_button2}></TouchableOpacity>
<TouchableOpacity style={styles.links_button3}></TouchableOpacity>


</View>

</View>
)






const handleOnPress = () => { console.log(1)};
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width)
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        paddingTop: Platform.OS==='android' ? StatusBar.currentHeight:0,
        
    
    },
    
    header:{
        backgroundColor: '#FFF',
        flex:1,
        paddingHorizontal:screenWidth,
        top:screenHeight/9
      

    },
    header_button:{
        borderWidth:1,
        borderColor:'#FBC9FF',
        alignItems:'center',
       
        width:100,
        height:100,
        backgroundColor:'#FBC9FF',
        borderRadius:50,
      
        
        
    
    },
   
    
    content:{

        backgroundColor: '#FFF',
        flex:2,
        top:screenHeight/6,
        alignItems: 'center',
        paddingHorizontal:screenWidth,
      
   
        
    },

    content_button1:{
        borderWidth:1,
        
        width:220,
        height:50,
        borderRadius:30,
        backgroundColor:"#FBC9FF",
        borderColor:'#FBC9FF',
        
        
        
    },
  
    content_button2:{
        top:30,
        width:220,
        height:50,
        borderRadius:30,
        backgroundColor:"#FBC9FF",
        borderColor:'#FBC9FF',
        
    
        
    },
    
    content_button3:{
        
        top:60,
        width:120,
        height:50,
        borderRadius:30,
        backgroundColor:"#FBC9FF",
        borderColor:'#FBC9FF',
        
      
    },
    links:
    {
        zIndex:1,
        flex:3,
        alignItems: 'center',
        top:screenHeight/4,
        
        paddingHorizontal:screenWidth,
        backgroundColor:"#FFF",
        
        
        
    },
    links_button1:{
        zIndex:1,
        borderWidth:1,
        borderColor:'#FBC9FF',
        width:70,
        height:70,
        backgroundColor:'#FBC9FF',
        borderRadius:50,
        
        
    },
    links_button2:{
        zIndex:1,
        borderWidth:1,
        borderColor:'#FBC9FF',
        width:70,
        height:70,
        backgroundColor:'#FBC9FF',
        borderRadius:50,
        left:130,
        bottom:70
        
        
    },
    links_button3:{
        zIndex:1,
        borderWidth:1,
        borderColor:'#FBC9FF',
        width:70,
        height:70,
        backgroundColor:'#FBC9FF',
        borderRadius:50,
        left:-130,
        bottom:140
        
        
    }

  });

export default SM


