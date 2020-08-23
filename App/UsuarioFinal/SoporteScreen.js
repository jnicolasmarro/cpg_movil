import * as React from 'react';
import { View, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackView } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons';


function SoporteScreen() {
    return (
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text> Pagina de Soporte</Text>
       </View>
       );
  }

  export  {SoporteScreen};