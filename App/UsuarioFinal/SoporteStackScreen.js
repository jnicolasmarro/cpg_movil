import * as React from 'react'
import {SoporteScreen} from './SoporteScreen'
import { createStackNavigator } from '@react-navigation/stack';

function SoporteStackScreen() {
  const SoporteStack = createStackNavigator();
    return (
      <SoporteStack.Navigator screenOptions={{ headerShown: false }}>
        <SoporteStack.Screen name="Soporte" component={SoporteScreen} />
        {/* other screens */}
      </SoporteStack.Navigator>
    );
  }

  export {
      SoporteStackScreen
  }