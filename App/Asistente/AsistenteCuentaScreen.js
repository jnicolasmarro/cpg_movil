import * as React from 'react';
import {AuthContext} from '../../context/AuthContext'
import { UserContext } from '../../context/UserContext'
import { View,  Text,StyleSheet,StatusBar,Alert } from 'react-native';
import { Button, Input } from 'react-native-elements'
import { getUser } from './getAsistenteEstablecimiento'
import { getUserToken } from '../../Storage/userToken'
import {setUser} from '../AdminEstablecimiento/setUser'
import {StylosFont} from '../FontTrajan';

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
        backgroundColor:"#DFDFDF",
        borderRadius:10,
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
      },
      noBorde:{
            
        borderBottomWidth:0.
    },
    });
    return (
      <View style={StylosCPG.container}>
        <StatusBar hidden={true} />
        <Text style={StylosFont.fuenteCentrada}>MI CUENTA DE ASISTENTE</Text>
        <Text style={StylosCPG.titulo}>{establecimiento}</Text>
        <Input
          placeholder='NOMBRE'
          inputStyle={StylosCPG.input}
          value={nombre}
          onChangeText={setNombre}
          inputContainerStyle={StylosCPG.noBorde}
          placeholderTextColor="#9d7f4f"
        />
        <Input
          placeholder='EMAIL'
          inputStyle={StylosCPG.input}
          value={email}
          onChangeText={setEmail}
          inputContainerStyle={StylosCPG.noBorde}
          placeholderTextColor="#9d7f4f"
        />
        <Input
          placeholder='NUMERO CELULAR'
          inputStyle={StylosCPG.input}
          value={celular}
          onChangeText={setCelular}
          keyboardType="numeric"
          inputContainerStyle={StylosCPG.noBorde}
          placeholderTextColor="#9d7f4f"
        />
        <Input
          placeholder='CONTRASEÑA ACTUAL'
          inputStyle={StylosCPG.input}
          containerStyle={{ marginTop: 35 }}
          value={contraseñaActual}
          onChangeText={setContraseñaActual}
          secureTextEntry
          inputContainerStyle={StylosCPG.noBorde}
          placeholderTextColor="#9d7f4f"
        />
        <Input
          placeholder='NUEVA CONTRASEÑA'
          inputStyle={StylosCPG.input}
          value={contraseñaNueva}
          onChangeText={setContraseñaNueva}
          secureTextEntry
          inputContainerStyle={StylosCPG.noBorde}
          placeholderTextColor="#9d7f4f"
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
            buttonStyle={StylosCPG.colorBoton}
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

  export {AsistenteCuentaScreen}