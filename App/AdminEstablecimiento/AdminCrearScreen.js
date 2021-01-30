import * as React from 'react';
import { View, Text, Alert, StyleSheet} from 'react-native';
import { Button, Input} from 'react-native-elements';
import {getUserToken} from '../../Storage/userToken'
import { API_URL } from "@env"
import {StylosFont} from '../FontTrajan';

function AdminCrearScreen ({ navigation }) {

  React.useEffect(()=>{
    
  },[])

  const registrar = async()=>{

    let token = await getUserToken();
    await registro(token)
    .then(json=>{
      if(json.success){
        Alert.alert("",json.success)
        setNombre('')
        setEmail('')
        setCelular('')
        setPassword('')
      }
      if(json.error){

        let errores = ""
        json.error.forEach(error => {
              errores = error + `\n` + errores

            });
            Alert.alert("Error", errores)
      }
      
    })
    .catch((error)=>{
      Alert.alert("Error","Error de conexión")
    })

  }

  const registro = async (token) => {
    return fetch(`${API_URL}/adminEstablecimiento/creacionAsistente`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token.token,
        id_user: token.header_id_user
      },
      body: JSON.stringify({
        nombre_usuario: nombre,
        email: email,
        numero_celular: celular,
        password: password
      })
    })
      .then((response) => response.json())
      .then((json) => {
        return json
      })
      .catch((error) => {
        throw error
      });
  }

  const [nombre, setNombre] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [celular, setCelular] = React.useState('');
  const [password, setPassword] = React.useState('');
   
    return (
       <View style={StylosCPG.container}>
         <View style={StylosCPG.titulo}>
         <Text style={StylosFont.fuenteCentrada}>Crear Asistente</Text>
         </View>
         <Input
            placeholder='NOMBRE'
            value={nombre}
            onChangeText={setNombre}
            inputStyle={StylosCPG.input}
            placeholderTextColor="#9d7f4f"
            inputContainerStyle={StylosCPG.noBorder}
          />
          <Input
            placeholder='EMAIL'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
            inputStyle={StylosCPG.input}
            placeholderTextColor="#9d7f4f"
            inputContainerStyle={StylosCPG.noBorder}
          />
          <Input
            placeholder='NUMERO CELULAR'
            keyboardType="numeric"
            value={celular}
            onChangeText={setCelular}
            inputStyle={StylosCPG.input}
            placeholderTextColor="#9d7f4f"
            inputContainerStyle={StylosCPG.noBorder}
          />
          <Input
            placeholder='CONTRASEÑA'
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            inputStyle={StylosCPG.input}
            placeholderTextColor="#9d7f4f"
            inputContainerStyle={StylosCPG.noBorder}
          />
         <Button title={"Crear Asistente"} onPress={registrar} 
         buttonStyle={StylosCPG.colorBoton}
         />
         </View>
       );
  }
  const StylosCPG = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      color: "#FFFFFF",
      flex:1,
      marginTop:20,
      marginBottom:20,
      marginLeft:20,
      marginRight:20,
      borderRadius:10,
      alignContent:'center'
  
    },
    input: {
      backgroundColor: '#E0E0E0',
      color: "#9d7f4f",
      marginBottom: 1,
      paddingRight: 10,
      paddingLeft: 10,
      fontSize: 15,
      borderRadius:10,
    },
    textColor:{
      color: "#FFFFFF",
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
      backgroundColor: "#9d7f4f",
      margin:20,
    },
    buttonsContainer: {
      flexDirection: 'row',
      alignItems: 'stretch',
      width: '100%',
      marginTop: 0,
      marginRight: 0,
      marginLeft: 0,
      padding: 0
    },
    titulo: {
    marginBottom: 20,
    marginTop:20,
    },
    textos: {
      fontSize:20,
      textAlign:'center'
      },
    textosDos: {
      fontSize:18,
      textAlign:'center',
      color:'#575756',
        },
      bloque: {
      marginTop:10,
      marginBottom:10,
      marginLeft:10,
      marginRight:10,
        },
      noBorder:{
        borderBottomColor:'#FFFFFF',
      },
  });
 

  export default AdminCrearScreen;
