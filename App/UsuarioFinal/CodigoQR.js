import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {getUserToken} from '../../Storage/userToken'
import { ActivityIndicatorCPG } from '../ActivityIndicatorCPG'
import { FailConnectionCPG } from '../FailConnectionCPG'
import { API_URL } from "@env"




function CodigoQR({route,navigation}) {
  const [codigo_encriptado,setCodigo_encriptado] = React.useState()
  const [failConnection, setFailConnection] = React.useState(false)
  const [isLoading, setLoading] = React.useState(true)
  const { id_experiencia,id_usuario } = route.params;

  const fetchCodigo = async (token)=>{
    return fetch(`${API_URL}/experiencia/encriptar/${id_usuario}/${id_experiencia}`, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.token,
          id_user: token.header_id_user
      }
  })
      .then((response) => response.json())
      .then((json) => {
          return json;
      })
      .catch((error) => {
          throw error
      });

  }
  React.useEffect(()=>{
    const getCodigo = async () =>{
      let token = await getUserToken();
      await fetchCodigo(token)
                .then(codigo => {
                    setCodigo_encriptado(`${codigo.id_usuario} ${codigo.id_experiencia}`)
                    setLoading(false)
                })
                .catch(() => {
                    setFailConnection(true)
                    setLoading(false)
                })



    }
    getCodigo();
  },[])



  return ( 
    isLoading ?(
      <ActivityIndicatorCPG/>
    ):(
      failConnection ?(
        <FailConnectionCPG/>

      ):(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <QRCode
        value={codigo_encriptado}
        size={200}
      />
      </View>
      )
     
    )
    
  );
}


export {CodigoQR};
