
import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {BuscarScreen} from './BuscarScreen'

function BuscarStackScreen() {

  const BuscarStack = createStackNavigator();
    return (
      <BuscarStack.Navigator screenOptions={{ headerShown: false }}>
        <BuscarStack.Screen name="Buscar" component={BuscarScreen} />
        {/* other screens */}
      </BuscarStack.Navigator>
    );
  }

export {
    BuscarStackScreen
}