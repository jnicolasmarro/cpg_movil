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
import {AuthContext} from '../../context/AuthContext'
const Tab = createBottomTabNavigator();


function AsistenteCuentaScreen() {

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

function AsisInicioScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Asitente</Text>
        </View>
    );
}

const AsisInicioStack = createStackNavigator();

function AsisInicioStackScreen() {
    return (
        <AsisInicioStack.Navigator screenOptions={{ headerShown: false }}>
            <AsisInicioStack.Screen name="AsisInicio" component={AsisInicioScreen} />
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