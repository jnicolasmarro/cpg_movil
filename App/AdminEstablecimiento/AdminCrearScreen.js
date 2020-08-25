import * as React from 'react';
import { View, Text, Alert} from 'react-native';
import { Button, Input} from 'react-native-elements';
import {getUserToken} from '../../Storage/userToken'
import { API_URL } from "@env"

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
      throw Alert.alert("Error","Error de conexión")
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
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Crear Asistente</Text>
         <Input
            placeholder='NOMBRE'
            value={nombre}
            onChangeText={setNombre}
          />
          <Input
            placeholder='EMAIL'
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder='NUMERO CELULAR'
            keyboardType="numeric"
            value={celular}
            onChangeText={setCelular}
          />
          <Input
            placeholder='CONTRASEÑA'
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
         <Button title={"Crear Asistente"} onPress={registrar} />
         </View>
       );
  }

 

  export default AdminCrearScreen;
