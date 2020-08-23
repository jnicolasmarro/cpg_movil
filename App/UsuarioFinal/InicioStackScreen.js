
import * as React from 'react'
import {StatusBar} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import {HomeScreen} from './HomeScreen'
import {ExpUnoScreen} from './ExpUnoScreen'
import {ExpDosScreen} from './ExpDosScreen'
import {ExpTresScreen} from './ExpTresScreen'
import {ExpCuatroScreen} from './ExpCuatroScreen'
import {InfoExp} from './InfoExp'
import {CodigoQR} from './CodigoQR'

function InicioStackScreen() {

    const InicioStack = createStackNavigator();


    return (
      
      <InicioStack.Navigator screenOptions={{ headerShown: false }}>
        <InicioStack.Screen name="Inicio" component={HomeScreen} />
        <InicioStack.Screen name="ExpUnoScreen" component={ExpUnoScreen} />
        <InicioStack.Screen name="InfoExp" component={InfoExp} />
        <InicioStack.Screen name="QR" component={CodigoQR} />
        <InicioStack.Screen name="ExpDosScreen" component={ExpDosScreen} />
        <InicioStack.Screen name="ExpTresScreen" component={ExpTresScreen} />
        <InicioStack.Screen name="ExpCuatroScreen" component={ExpCuatroScreen} />
      </InicioStack.Navigator>
    );
  }

export {
    InicioStackScreen
}