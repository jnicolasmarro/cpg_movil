import * as React from 'react';
import { AsyncStorage, Text, View, StyleSheet, Alert, StatusBar, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Image, Input} from 'react-native-elements';
import {getUserToken} from '../Storage/userToken'
import * as Font from 'expo-font';
import { API_URL } from "@env"
import * as Linking from 'expo-linking';

// Screens
import {SplashScreen} from './SplashScreen'

import {TabUsuarioScreen} from './UsuarioFinal/TabUsuarioScreen'
import {Admin} from './AdminEstablecimiento/TabAdminScreen'
import Asis from './Asistente/Asis'

//

import {SignUpScreen} from './SignUpScreen'
 
import {AuthContext} from '../context/AuthContext'


const Stack = createStackNavigator();




function SignInScreen({ navigation }) {

  const StylosCPG = StyleSheet.create({
    container: {
      backgroundColor: '#111111',
      flex: 10,
      justifyContent: 'center',
      alignItems: 'stretch',
      flexDirection: 'column'
    },
    titulo: {
      fontSize: 20,
      textAlign: 'center',
      color: "#A99169",
      marginBottom: 20,
      marginTop: 20,
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
    margin: {
      marginBottom: 20,
      marginTop: 20,
    },
    colorBoton: {
      backgroundColor: "#A99169",
    },
    registro: {
      height: 50,
      backgroundColor: "#0B646A",
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: 10,
      alignItems: 'center'
    },
    padin20: {
      padding: 20,
    },
    colorVerde: {
      backgroundColor: "#0B646A"
    }
  });

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { signIn } = React.useContext(AuthContext);
  

  return (
    <View style={StylosCPG.container} >
      <View style={StylosCPG.padin20}>
        <View style={StylosCPG.centro}>
          <Image source={require('../src/img/logo_cpg.png')} style={StylosCPG.logoHome} PlaceholderContent={<ActivityIndicator />} />
        </View>
        <View style={{ marginBottom: 20, }}>
          <Text h1 style={StylosCPG.titulo}>INICIO DE SESIÓN</Text>
          <Input
            placeholder='EMAIL'
            inputStyle={StylosCPG.input}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder='CONTRASEÑA'
            inputStyle={StylosCPG.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            title="INICIAR SESIÓN"
            onPress={() => signIn({ email, password })}
            color="#A99169"
            buttonStyle={StylosCPG.colorBoton}
          />
        </View>
        
        <View>
      <Button
        title="Olvidé mi contraseña"
        type="clear"
        onPress={() => {
          Linking.openURL(`${API_URL}/auth/solicitar_cambio`);
        }}
      />
      </View>
      </View>
    </View>
  );
}



function Inicial({ navigation }) {

  const StylosCPG = StyleSheet.create({
    container: {
      backgroundColor: '#111111',
      flex: 1,
      padding: 20,
      justifyContent: 'center'
    },
    titulo: {
      fontSize: 20,
      textAlign: 'center',
      color: "#A99169",
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
      marginBottom: 50,
    },
    centro: {
      alignItems: 'center',
    },
    colorBoton: {
      backgroundColor: "#A99169",
    }
  });

  return (
    <View style={StylosCPG.container}>
      <StatusBar hidden={true} />
      <View style={StylosCPG.centro}>
        <Image source={require('../src/img/logo_cpg.png')} style={StylosCPG.logoHome} PlaceholderContent={<ActivityIndicator />} />
      </View>
      <View style={{ marginBottom: 20, }}>
        <Button
          title="INICIAR SESION"
          onPress={() => navigation.navigate('SignIn')}
          color="#A99169"
          buttonStyle={StylosCPG.colorBoton}
        />
      </View>
      <View>
        <Button
          title="REGISTRARSE"
          onPress={() => navigation.navigate('SingUp')}
          buttonStyle={StylosCPG.colorBoton}
        />
      </View>
      
    </View>
  );
}

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('userToken', jsonValue)
  } catch (e) {
    // saving error
  }
}


export default function App({ navigation }) {
  const [loaded] = Font.useFonts({
    Trajan: require('../assets/fonts/Trajan.ttf'),
  });
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  const selectViewRol = (rol)=>{
    if(rol == 2)
    return TabUsuarioScreen;
    if(rol == 3)
    return Admin
    if(rol == 4)
    return Asis

    return null;
  }

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await getUserToken();
      } catch (e) {
        // Restoring token failed
      }
      // After restoring token, we may need to validate it in production apps
      // TODO- GENERAR VALIDACION EN EL BACK
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();
  }, []);

  async function getToken(data) {
    try {
      let response = await fetch(`${API_URL}/auth/singin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });
      let json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }

  }

  const registro = (data) => {
    return fetch(`${API_URL}/auth/singup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre_usuario: data.nombre,
        numero_identificacion:data.numero_identificacion,
        email: data.email,
        numero_celular: data.celular,
        password: data.password,
        codigo: data.codigo
      })
    })
      .then((response) => response.json())
      .then((json) => {
        return json
      })
      .catch((error) => {
        throw Alert.alert('Error', 'Error de conexión')
      });
  }
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        let response = await getToken(data)
        if (response.error) {
          Alert.alert("Error", response.error)
        } else {
          
          storeData(response.token)
          dispatch({ type: 'SIGN_IN', token: response.token });
        }
      },
      signOut: () => {
        dispatch({ type: 'SIGN_OUT' });
        const removeValue = async () => {
          try {
            await AsyncStorage.removeItem('userToken')
          } catch (e) {
            // remove error
          }
          console.log('Done.')
        }
        removeValue();
      },
      signUp: async data => {

        if (!data.checked) {
          Alert.alert("Error", "No ha aceptado terminos y condiciones")
        } else {
          let response = await registro(data)
          if (response.error) {

            let errores = ""
            response.error.forEach(error => {
              errores = error + `\n` + errores

            });
            Alert.alert("Error", errores)
          } else {
            storeData(response.token)
            Alert.alert("Registro exitoso", "Te has registrado correctamente")
            dispatch({ type: 'SIGN_IN', token: response.token });
          }
        }
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <>
            
              <Stack.Screen
                name="Inicial"
                component={Inicial}
                options={{
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
              
              
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
              <Stack.Screen
                name="SingUp"
                component={SignUpScreen}
                options={{
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
            </>
          ) : (
                  <Stack.Screen name="Home" component={selectViewRol(state.userToken.rol)} />
              )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
