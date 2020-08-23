import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {ActivityIndicatorCPG} from '../ActivityIndicatorCPG'
import { getUserToken } from '../../Storage/userToken'
import {UserContext} from '../../context/UserContext'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {InicioStackScreen} from './InicioStackScreen'
import {BuscarStackScreen} from './BuscarStackScreen'
import {SoporteStackScreen} from './SoporteStackScreen'
import {NoticiasStackScreen} from './NoticiasStackScreen'
import {CuentaStackScreen} from './CuentaStackScreen'
import {getUser} from './getUsuario'
import {FailConnectionCPG} from '../FailConnectionCPG'



function TabUsuarioScreen({ navigation }) {
    const Tab = createBottomTabNavigator();
    const [isLoading,setLoading] = React.useState(true)
    const [userContext,setUserContext] = React.useState(null)
    const value = {userContext,setUserContext}
    const [failConnection,setFailConnection] = React.useState(false)
    
  
    
   React.useEffect(()=>{
    const fetchUsuario = async () =>{
      let token=await getUserToken()
      await getUser(token)
      .then((usuario)=>{
        setUserContext(usuario)
        setLoading(false)
      })
      .catch(()=>{
        setFailConnection(true)
        setLoading(false)
      })
      
    }
    fetchUsuario()
   },[])
  
    return (
  
      isLoading ?(
        <ActivityIndicatorCPG/>
      ):
      (
        failConnection ?(
          <FailConnectionCPG/>
        ):(
          <UserContext.Provider value={value}>
        <Tab.Navigator tabBarOptions={{ activeTintColor: '#111111', activeBackgroundColor: '#e5e5e5', inactiveTintColor: '#a5a5a5', inactiveBackgroundColor: '#e5e5e5' }}>
        <Tab.Screen name="Inicio" component={InicioStackScreen} options={{
          tabBarLabel: 'Inicio', tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={26} />),
        }} />
        <Tab.Screen name="Buscar" component={BuscarStackScreen} options={{
          tabBarLabel: 'Buscar', tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />),
        }} />
        <Tab.Screen name="Soporte" component={SoporteStackScreen} options={{
          tabBarLabel: 'Soporte', tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message" color={color} size={26} />),
        }} />
        <Tab.Screen name="Noticias" component={NoticiasStackScreen} options={{
          tabBarLabel: 'Noticias', tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cloud" color={color} size={26} />),
        }} />
        <Tab.Screen name="Cuenta" component={CuentaStackScreen} options={{
          tabBarLabel: 'Cuenta', tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />),
        }} />
      </Tab.Navigator>
      </UserContext.Provider>
        )
      )
    );
  }

  export {
      TabUsuarioScreen
  }