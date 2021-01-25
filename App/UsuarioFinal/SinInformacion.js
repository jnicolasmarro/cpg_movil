import * as React from 'react'
import { View, StyleSheet, StatusBar,Text } from 'react-native';


function SinInformacion(props){

    const StylosCPG = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        textAlign: 'center'
      },
      texto:{
        textAlign: 'center',
        color: '#A99169',
        fontWeight: 'bold',
        paddingBottom:10
      }
    });
    
  
    return(
      
      <View style={StylosCPG.container}>
        <StatusBar hidden={true} />
    <Text style={StylosCPG.texto}>{props.informacion}</Text>
      </View>
      
    )
  
  }

  export {SinInformacion}