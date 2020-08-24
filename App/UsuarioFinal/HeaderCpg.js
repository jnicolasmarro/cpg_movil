import * as React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import {UserContext} from '../../context/UserContext';
import {StylosFont} from '../FontTrajan';

function HeaderCpg({ navigation }) {
  
  
    const {userContext} = React.useContext(UserContext)
    const StylosCPG = StyleSheet.create({
      headercpg: {
        height: 50,
        backgroundColor:"#5fa39d",
        padding: 10,
      },
    });
    
    return (
      <View style={StylosCPG.headercpg}>
        <Text style={StylosFont.fuenteCentradaBlanco} >{userContext.nombre_usuario}</Text>
      </View>
    );
  }

  export {
      HeaderCpg
  }