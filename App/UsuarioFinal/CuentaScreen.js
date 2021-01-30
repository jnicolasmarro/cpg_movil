
import * as React from 'react';
import {  Text, View, StyleSheet, Alert, StatusBar } from 'react-native';
import { Button,  Input} from 'react-native-elements';
import {AuthContext} from '../../context/AuthContext'
import { API_URL } from "@env"
import {UserContext} from '../../context/UserContext'
import {getUserToken} from '../../Storage/userToken'
import {getUser} from './getUsuario'
import {StylosFont} from '../FontTrajan';





function CuentaScreen({ navigation }) {

    
    const {userContext,setUserContext} = React.useContext(UserContext)

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
        paddingRight: 15,
        paddingLeft: 15,
        fontSize: 15,
        backgroundColor:'#E0E0E0',
        borderRadius:10,
        

      },
    
      colorBoton: {
        backgroundColor: "#A99169",
      },
      colorBotonDos: {
        backgroundColor: "#279A92",
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
      },
      noBorde:{
        borderBottomWidth:0.
    },
    });
  
  
    const { signOut } = React.useContext(AuthContext);
    const [nombre, setNombre] = React.useState(userContext.nombre_usuario);
    const [numero_identificacion, setNumero_identificacion] = React.useState(userContext.numero_identificacion.toString());
    const [email, setEmail] = React.useState(userContext.email);
    const [celular, setCelular] = React.useState(userContext.numero_celular);
    const [contraseñaActual, setContraseñaActual] = React.useState("");
    const [contraseñaNueva, setContraseñaNueva] = React.useState("");
    const [actualizado, setActualizado] = React.useState(false);
    React.useEffect(() => {
      console.log(userContext)
    }, [actualizado])
  
   
  
    const actualizarUsuario = async () => {
      let token = await getUserToken()
      await setUser(token)
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

        Alert.alert('Error','Error de conexión al servidor \n Valida tu conexión a la red')

      })
  


      
    }
  
    const setUser = async (token) => {
      return fetch(`${API_URL}/user/actualizarUsuarioFinalMovil/` + token.header_id_user, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.token,
          id_user: token.header_id_user
        },
        body: JSON.stringify({
          nombre_usuario: nombre,
          numero_identificacion: numero_identificacion,
          email: email,
          numero_celular: celular,
          contraseñaNueva: contraseñaNueva,
          contraseñaActual: contraseñaActual
        })
      })
        .then((response) => response.json())
        .then((json) => {
          return json;
        })
        .catch((error) => {
          throw error
        });
    }
  
    
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar hidden={true} />
        <Text style={[StylosCPG.titulo,StylosFont.fuenteCentrada]}>MI CUENTA DE USUARIO</Text>
        <Input
          placeholder='NOMBRE'
          inputStyle={StylosCPG.input}
          value={nombre}
          onChangeText={setNombre}
          inputContainerStyle={StylosCPG.noBorde}
        />
        <Input
          placeholder='NÚMERO DE IDENTIFICACIÓN'
          inputStyle={StylosCPG.input}
          placeholderTextColor="#9d7f4f"
          value={numero_identificacion}
          onChangeText={setNumero_identificacion}
          keyboardType="numeric"
          inputContainerStyle={StylosCPG.noBorde}
        />
        <Input
          placeholder='EMAIL'
          inputStyle={StylosCPG.input}
          value={email}
          onChangeText={setEmail}
          inputContainerStyle={StylosCPG.noBorde}
        />
        <Input
          placeholder='NUMERO CELULAR'
          inputStyle={StylosCPG.input}
          value={celular}
          onChangeText={setCelular}
          keyboardType="numeric"
          inputContainerStyle={StylosCPG.noBorde}
        />
        <Input
          placeholder='CONTRASEÑA ACTUAL'
          inputStyle={StylosCPG.input}
          containerStyle={{ marginTop: 35 }}
          value={contraseñaActual}
          onChangeText={setContraseñaActual}
          secureTextEntry
          placeholderTextColor="#9d7f4f"
          inputContainerStyle={StylosCPG.noBorde}
        />
        <Input
          placeholder='NUEVA CONTRASEÑA'
          inputStyle={StylosCPG.input}
          value={contraseñaNueva}
          onChangeText={setContraseñaNueva}
          secureTextEntry
          placeholderTextColor="#9d7f4f"
          inputContainerStyle={StylosCPG.noBorde}
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
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: '400' }}
            buttonStyle={StylosCPG.colorBotonDos}
            onPress={actualizarUsuario}
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
            iconContainerStyle={{ marginLeft: 10 }}
            titleStyle={{ fontWeight: '400' }}
            buttonStyle={StylosCPG.colorBoton}
           
            containerStyle={{ width: 150 }}
            onPress={signOut}
          />
        </View>
      </View>
    );
  }

  export {
      CuentaScreen
  }