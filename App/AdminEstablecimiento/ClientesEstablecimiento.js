import * as React from 'react';
import { View, Text, StyleSheet, StatusBar, Alert } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Button } from 'react-native-elements'
import * as FileSystem from 'expo-file-system';
import {getUserToken} from '../../Storage/userToken'
import { API_URL } from "@env"
import { CameraRoll } from '@react-native-community/cameraroll';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import {StylosFont} from '../FontTrajan';

const ClientesEstablecimiento = ({ route }) => {

    async function downloadFile(){
        let token=await getUserToken()
        const uri = `${API_URL}/adminEstablecimiento/reporteUsuarios`
        let fileUri = FileSystem.documentDirectory + "reporte_usuarios_establecimiento.xlsx";
        FileSystem.downloadAsync(uri, fileUri,{headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.token,
        'id_user': token.header_id_user.toString()}})
        .then(async ({ uri }) => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status === "granted") {
                const asset = await MediaLibrary.createAssetAsync(uri)
                await MediaLibrary.createAlbumAsync("Download", asset, false)
                Alert.alert('Reporte descargado','El reporte ha sido descargado en la carpeta de descargas')
            }else{
                Alert.alert('Error','No se han aceptado permisos de almacenamiento')
            }
          })
          .catch(error => {
            Alert.alert('Error','Error de conexión con el servidor');
          })
    }

    const { data } = route.params;

    const styles = StyleSheet.create({
        container: { flex: 1, padding: 10, paddingTop: 30, backgroundColor: '#fff' },
        head: { height: 50, backgroundColor: '#5FA39D',borderRadius:5,marginBottom:7, },
        contenido: { backgroundColor: '#DFDFDF',borderRadius:5,marginBottom:7},
        text: { margin: 6, textAlign: 'center' },
        textBlanco: { margin: 6, textAlign: 'center',color:'#FFFFFF' },
        
    });

    return (
        <View style={styles.container}>
            <View style={StylosCPG.titulo}>
            <Text style={StylosFont.fuenteCentrada}>
                  Tus Clientes
                </Text>
            </View>
            <Table borderStyle={{ borderWidth: 0, }}>
                <Row data={['NOMBRE', 'TELÉFONO', 'CORREO']} style={styles.head} textStyle={styles.textBlanco} />
                <Rows data={data} textStyle={styles.text} style={styles.contenido} />
            </Table>
            <Button
            buttonStyle={StylosCPG.colorBoton}
                title="DESCARGAR REPORTE"
                color="#A99169"
                onPress={() => {
                    
                    downloadFile();
                }}
            />
        </View>
    )
}
const StylosCPG = StyleSheet.create({
    container: {
      backgroundColor:"#FFFFFF",
      color: "#FFFFFF",
      flex:0.6,
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
    titulo:{
        marginBottom:20,
    },
    textColor:{
      color: "#FFFFFF",
    },
    colorBoton: {
      backgroundColor: "#9d7f4f",
      margin:20,
    },
    numeroexperiencias: {
    margin: 20,
    backgroundColor:'#5FA39D',
    padding:15,
    borderRadius:10,
    },
  });
export { ClientesEstablecimiento }