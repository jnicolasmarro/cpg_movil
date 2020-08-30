import React, { useState, useEffect } from 'react';
import { Text,Image, StyleSheet,Dimensions, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {getUserToken} from '../Storage/userToken'
import { API_URL } from "@env"

export default function QRReader() {

  const fetchQR = async (data)=>{

    let token = await getUserToken();

    return fetch(`${API_URL}/experiencia/procesarQR`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token.token,
        id_user: token.header_id_user
      },
      body:JSON.stringify({
        data:data
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

  const procesarQR =async (data)=>{

    await fetchQR(data)
    .then((json)=>{

      if(json.error){
        Alert.alert('Error',json.error);
      }
      if(json.success){
        Alert.alert('Procesado',json.success);
      }

    })

    setScanned(false);

  }



  const { width } = Dimensions.get('window')
  const qrSize = width * 0.7
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  qr: {
    marginTop: '20%',
    marginBottom: '20%',
    width: qrSize,
    height: qrSize,
  },
  description: {
    fontSize: width * 0.09,
    marginTop: '10%',
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
});
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert("Experiencia Leída",`${data} `,
    [
      {
        text: "Cancelar",
        onPress: () =>{setScanned(false)},
        style: "cancel"
      },
      { text: "Procesar", onPress: () => {procesarQR(data)} }
    ],
    { cancelable: false });
  };

  if (hasPermission === null) {
    return <Text>Solicitando permisos para usar la cámara</Text>;
  }
  if (hasPermission === false) {
    return <Text>No tiene acceso a la cámara</Text>;
  }

  return (
    <BarCodeScanner
    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.container]}>
        <Text style={styles.description}>Escanee el QR de la experiencia</Text>
        <Image
          style={styles.qr}
          source={require('../src/img/QR.png')}
        />
      </BarCodeScanner>
  );
}
