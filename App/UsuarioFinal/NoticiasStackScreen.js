import * as React from 'react'
import {NoticiasScreen} from './NoticiasScreen'
import { createStackNavigator } from '@react-navigation/stack';

function NoticiasStackScreen() {
  const NoticiasStack = createStackNavigator();
    return (
      <NoticiasStack.Navigator screenOptions={{ headerShown: false }}>
        <NoticiasStack.Screen name="Noticias" component={NoticiasScreen} />
        {/* other screens */}
      </NoticiasStack.Navigator>
    );
  }

  export{
      NoticiasStackScreen
  }