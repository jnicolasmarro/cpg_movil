import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {CuentaScreen} from './CuentaScreen'

function CuentaStackScreen() {
  const CuentaStack = createStackNavigator();
    return (
      <CuentaStack.Navigator screenOptions={{ headerShown: false }}>
        <CuentaStack.Screen name="Cuenta" component={CuentaScreen} />
      </CuentaStack.Navigator>
    );
  }

  export {
      CuentaStackScreen
  }