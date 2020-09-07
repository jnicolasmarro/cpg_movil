import * as React from 'react';
import { View, Button, Text,StyleSheet,StatusBar } from 'react-native';
import { Input } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackView } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import QRReaer from '../QRReader';
import { getUser } from './getAsistenteEstablecimiento'
import { UserContext } from '../../context/UserContext'
import { ActivityIndicatorCPG } from '../ActivityIndicatorCPG'
import { getUserToken } from '../../Storage/userToken'
import AdminInicioScreen from '../AdminEstablecimiento/AdminInicioScreen'
import {InfoExp} from '../AdminEstablecimiento/InfoExp'

import {AsistenteCuentaScreen} from './AsistenteCuentaScreen'
const Tab = createBottomTabNavigator();



const AsisInicioStack = createStackNavigator();

function AsisInicioStackScreen() {
    return (
        <AsisInicioStack.Navigator screenOptions={{ headerShown: false }}>
            <AsisInicioStack.Screen name="AdminInicio" component={AdminInicioScreen} />
            <AsisInicioStack.Screen name="InfoExp" component={InfoExp} />
            {/* other screens */}
        </AsisInicioStack.Navigator>
    );
}

const AdminQrStack = createStackNavigator();

function AdminQrStackScreen() {
    return (
        <AdminQrStack.Navigator screenOptions={{ headerShown: false }}>
            <AdminQrStack.Screen name="AdminQr" component={QRReaer} />
            {/* other screens */}
        </AdminQrStack.Navigator>
    );
}

const AsistenteCuentaStack = createStackNavigator();

function AsistenteCuentaStackScreen() {
  return (
    <AsistenteCuentaStack.Navigator screenOptions={{ headerShown: false }}>
      <AsistenteCuentaStack.Screen name="AsistenteCuenta" component={AsistenteCuentaScreen} />
      {/* other screens */}
    </AsistenteCuentaStack.Navigator>
  );
}


function Asis({ navigation }) {

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
        <ActivityIndicatorCPG />
      ):(
        <UserContext.Provider value={value}>
        <Tab.Navigator activeColor="#59E811" style={{ backgroundColor: '#e91e63' }}  >
          <Tab.Screen name="Inicio" component={AsisInicioStackScreen} options={{
                 tabBarLabel: 'Inicio', tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />),
            }} />
            <Tab.Screen name="AdminQr" component={AdminQrStackScreen} options={{
                tabBarLabel: 'Qr', tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="qrcode" color={color} size={26} />),
            }} />
            <Tab.Screen name="AsistenteCuenta" component={AsistenteCuentaStackScreen} options={{
              tabBarLabel: 'Mi Cuenta', tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />),
            }} />
        </Tab.Navigator>


        </UserContext.Provider>
      )
        


    );
}
export default Asis;