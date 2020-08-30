import * as React from 'react';
import { View, Button, Text, StyleSheet, StatusBar,Alert } from 'react-native';
import { Input } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackView } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AdminInicioScreen from './AdminInicioScreen'
import QRReaer from '../QRReader';
import AdminCrearScreen from './AdminCrearScreen'
import { UserContext } from '../../context/UserContext'
import { getUser } from './getAdminEstablecimiento'
import { getUserToken } from '../../Storage/userToken'
import { ActivityIndicatorCPG } from '../ActivityIndicatorCPG'
import {AuthContext} from '../../context/AuthContext'
import {setUser} from './setUser'
import {InfoExp} from './InfoExp'
import {Estadisticas} from './Estadisticas'
import {RedencionesMes} from './RedencionesMes'
import {ClientesEstablecimiento} from './ClientesEstablecimiento'

const Tab = createBottomTabNavigator();


function AdminCuentaScreen() {

  const ActualizarAdminEsta = async ()=>{

    let token = await getUserToken()
    let user ={
      nombre,
      email,
      celular,
      contraseñaActual,
      contraseñaNueva
    }
      await setUser(token,user)
      .then(async response=>{
        if (response.error) {
  
          let errores = ""
          response.error.forEach(error => {
            errores = error + `\n` + errores
    
          });
          Alert.alert("Error", errores)
        } else {
          Alert.alert("Usuario actualizado", response.success)
          setContraseñaActual("")
          setContraseñaNueva("")
          let usuario = await getUser(token)
          setUserContext(usuario)
          setActualizado(true)
        }

      })
      .catch(()=>{

        throw Alert.alert('Error','Error de conexión al servidor \n Valida tu conexión a la red')

      })
  



  }
  const { signOut } = React.useContext(AuthContext);
  const { userContext, setUserContext } = React.useContext(UserContext);
  const [nombre, setNombre] = React.useState(userContext.nombre_usuario);
  const [email, setEmail] = React.useState(userContext.email);
  const [celular, setCelular] = React.useState(userContext.numero_celular);
  const [establecimiento, setEstablecimiento] = React.useState(userContext.establecimiento.nombre_empresa)
  const [contraseñaActual, setContraseñaActual] = React.useState("");
  const [contraseñaNueva, setContraseñaNueva] = React.useState("");
  const [actualizado, setActualizado] = React.useState(false);
  React.useEffect(() => {
  }, [actualizado])
  const StylosCPG = StyleSheet.create({
    container: {
      backgroundColor: '#111111',
      flex: 1,
      padding: 20,
      justifyContent: 'center'
    },
    input: {
      color: "#A99169",
      marginBottom: 1,
      paddingRight: 10,
      paddingLeft: 10,
      fontSize: 15,
    },
    logoHome: {
      width: 187,
      height: 105,
      justifyContent: 'center',
      marginBottom: 15,
    },
    centro: {
      alignItems: 'center',
    },
    colorBoton: {
      backgroundColor: "#A99169",
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 20,
    },
    titulo: {
      fontSize: 20,
      textAlign: 'center',
      color: "#A99169",
      marginBottom: 45
    }
  });
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar hidden={true} />
      <Text style={StylosCPG.titulo}>MI CUENTA DE ADMINISTRADOR</Text>
      <Text>{establecimiento}</Text>
      <Input
        placeholder='NOMBRE'
        inputStyle={StylosCPG.input}
        value={nombre}
        onChangeText={setNombre}
      />
      <Input
        placeholder='EMAIL'
        inputStyle={StylosCPG.input}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder='NUMERO CELULAR'
        inputStyle={StylosCPG.input}
        value={celular}
        onChangeText={setCelular}
        keyboardType="numeric"
      />
      <Input
        placeholder='CONTRASEÑA ACTUAL'
        inputStyle={StylosCPG.input}
        containerStyle={{ marginTop: 35 }}
        value={contraseñaActual}
        onChangeText={setContraseñaActual}
        secureTextEntry
      />
      <Input
        placeholder='NUEVA CONTRASEÑA'
        inputStyle={StylosCPG.input}
        value={contraseñaNueva}
        onChangeText={setContraseñaNueva}
        secureTextEntry
      />
      <View style={StylosCPG.buttonsContainer}>
        <Button
          title="ACTUALIZAR"
          icon={{
            name: 'rotate-right',
            type: 'fonawesomet-',
            size: 15,
            color: 'white',
          }}
          iconContainerStyle={{ marginRight: 0 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: 'rgba(90, 154, 230, 1)',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
          }}
          onPress={ActualizarAdminEsta}

        />
        <Button
          title="CERRAR SESIÓN"
          icon={{
            name: 'close',
            type: 'font-awesome',
            size: 15,
            color: 'white',
          }}
          iconRight
          iconContainerStyle={{ marginLeft: 0 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: 'rgba(199, 43, 98, 1)',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{ width: 150 }}
          onPress={signOut}

        />
      </View>
    </View>
  );
}

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

const AdminCuentaStack = createStackNavigator();

function AdminCuentaStackScreen() {
  return (
    <AdminCuentaStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminCuentaStack.Screen name="AdminCuenta" component={AdminCuentaScreen} />
      {/* other screens */}
    </AdminCuentaStack.Navigator>
  );
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
        <UserContext.Provider value={value}>
          <Tab.Navigator activeColor="#59E811" style={{ backgroundColor: '#e91e63' }}  >
            <Tab.Screen name="AdminInicio" component={AdminInicioStackScreen} options={{
              tabBarLabel: 'Inicio', tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />),
            }} />
            <Tab.Screen name="AdminQr" component={AdminQrStackScreen} options={{
              tabBarLabel: 'Qr', tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="qrcode" color={color} size={26} />),
            }} />
            <Tab.Screen name="AdminCrear" component={AdminCrearStackScreen} options={{
              tabBarLabel: 'Crear Asistente', tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account-multiple-plus" color={color} size={26} />),
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

  );
}
export { Admin };