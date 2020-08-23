import * as React from 'react'
import { View, StyleSheet, StatusBar,Text } from 'react-native';

function FailConnectionCPG(){

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
          <Text style={StylosCPG.texto}>Problema de conexión al servidor...</Text>
          <Text style={StylosCPG.texto}>Por favor valida tu conexión a la red</Text>
      </View>
      
    )
  
  }

  export {FailConnectionCPG}