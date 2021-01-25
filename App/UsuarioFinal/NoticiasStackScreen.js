import * as React from 'react'
import {NoticiasScreen} from './NoticiasScreen'
import {InfoNoticia} from './InfoNoticia'
import { createStackNavigator } from '@react-navigation/stack';

function NoticiasStackScreen() {
  const NoticiasStack = createStackNavigator();
    return (
      <NoticiasStack.Navigator screenOptions={{ headerShown: false }}>
        <NoticiasStack.Screen name="Noticias" component={NoticiasScreen} />
        <NoticiasStack.Screen name="InfoNoticia" component={InfoNoticia} />
        {/* other screens */}
      </NoticiasStack.Navigator>
    );
  }

  export{
      NoticiasStackScreen
  }