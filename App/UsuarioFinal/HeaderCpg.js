import * as React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import {UserContext} from '../../context/UserContext';
import {StylosFont} from '../FontTrajan';

function HeaderCpg({ navigation }) {
  
  
    const {userContext} = React.useContext(UserContext)
    const StylosCPG = StyleSheet.create({
      headercpg: {
        height: 50,
        backgroundColor: "#e95238",
        padding: 10,
      },
    });
    
    return (
      <View style={StylosCPG.headercpg}>
        <Text style={StylosFont.fuenteCentrada} >{userContext.nombre_usuario}</Text>
      </View>
    );
  }

  export {
      HeaderCpg
  }