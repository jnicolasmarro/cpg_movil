import * as React from 'react';
import { Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AdminInicioScreen from './AdminInicioScreen'
import QRReaer from '../QRReader';
import AdminCrearScreen from './AdminCrearScreen'
import { UserContext } from '../../context/UserContext'
import { getUser } from './getAdminEstablecimiento'
import { getUserToken } from '../../Storage/userToken'
import { ActivityIndicatorCPG } from '../ActivityIndicatorCPG'
import { InfoExp } from './InfoExp'
import { Estadisticas } from './Estadisticas'
import { RedencionesMes } from './RedencionesMes'
import { ClientesEstablecimiento } from './ClientesEstablecimiento'
import { AdminCuentaStackScreen } from './AdminCuentaStack'
import { FailConnectionCPG } from '../FailConnectionCPG'
import {Asistentes} from './Asistentes'

const Tab = createBottomTabNavigator();

const AdminInicioStack = createStackNavigator();

function AdminInicioStackScreen() {
  return (
    <AdminInicioStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminInicioStack.Screen name="AdminInicio" component={AdminInicioScreen} />
      <AdminInicioStack.Screen name="InfoExp" component={InfoExp} />
      {/* other screens */}
    </AdminInicioStack.Navigator>
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
const AdminCrearStack = createStackNavigator();

function AdminCrearStackScreen() {
  return (
    <AdminCrearStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminCrearStack.Screen name="AdminCrear" component={AdminCrearScreen} />
      {/* other screens */}
    </AdminCrearStack.Navigator>
  );
}

const AdminEstaStack = createStackNavigator();

function AdminEstaStackScreen() {
  return (
    <AdminEstaStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminEstaStack.Screen name="Estadisticas" component={Estadisticas} />
      <AdminEstaStack.Screen name="RedencionesMes" component={RedencionesMes} />
      <AdminEstaStack.Screen name="ClientesEstablecimiento" component={ClientesEstablecimiento} />
    </AdminEstaStack.Navigator>
  );
}


const Texto = ()=>{
  return(
  <Text  style={{fontSize: 9, fontWeight:'normal',color:'grey',textAlign:'center'}}>{`Crear \n Asistente`}</Text>
  )
}

function Admin({ navigation }) {
  const [isLoading, setLoading] = React.useState(true)
  const [userContext, setUserContext] = React.useState(null)
  const value = { userContext, setUserContext }
  const [failConnection, setFailConnection] = React.useState(false)

  React.useEffect(() => {
    const fetchUsuario = async () => {
      let token = await getUserToken()
      await getUser(token)
        .then((usuario) => {
          setUserContext(usuario)
          setLoading(false)
        })
        .catch(() => {
          setFailConnection(true)
          setLoading(false)
        })

    }
    fetchUsuario()
  }, [])

  return (
    isLoading ? (
      <ActivityIndicatorCPG />
    ) : (
        failConnection ? (
          <FailConnectionCPG />
        ) : (
            <UserContext.Provider value={value}>
              <Tab.Navigator activeColor="#59E811" style={{ backgroundColor: '#e91e63'}}  >
                <Tab.Screen name="AdminInicio" component={AdminInicioStackScreen} options={{
                  tabBarLabel: 'Inicio', tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />),
                }} />
                <Tab.Screen name="AdminQr" component={AdminQrStackScreen} options={{
                  tabBarLabel: 'Qr', tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="qrcode" color={color} size={26} />),
                }} />
                <Tab.Screen name="AdminCrear" component={AdminCrearStackScreen} options={{
                  tabBarLabel: Texto, tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account-multiple-plus" color={color} size={26} />),
                }} />
                <Tab.Screen name="Asistentes" component={Asistentes} options={{
                  tabBarLabel: 'Asistentes', tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account-group" color={color} size={26} />),
                }} />
                <Tab.Screen name="AdminEsta" component={AdminEstaStackScreen} options={{
                  tabBarLabel: 'Estadisticas', tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="chart-pie" color={color} size={26} />),
                }} />
                <Tab.Screen name="AdminCuenta" component={AdminCuentaStackScreen} options={{
                  tabBarLabel: 'Mi Cuenta', tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />),
                }} />
              </Tab.Navigator>
            </UserContext.Provider>
          )

      )

  );
}
export { Admin };