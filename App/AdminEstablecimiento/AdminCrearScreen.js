import * as React from 'react';
import { View, Button, Text, Alert, useState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackView } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const createTwoButtonAlert = () =>
Alert.alert("Asistente Creado","Creado con éxito",
  [
    
    { text: "OK", onPress: () => console.log("OK") }
  ],
  { cancelable: false }
);

function AdminCrearScreen ({ navigation }) {
   
    return (
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Crear Asistente</Text>
         <Button title={"Crear Asistente"} onPress={createTwoButtonAlert} />
         </View>
       );
  }

 

  export default AdminCrearScreen;
