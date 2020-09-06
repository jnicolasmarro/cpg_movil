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
        container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
        head: { height: 40, backgroundColor: '#f1f8ff' },
        text: { margin: 6 }
    });

    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Row data={['Nombre', 'Teléfono', 'Correo']} style={styles.head} textStyle={styles.text} />
                <Rows data={data} textStyle={styles.text} />
            </Table>
            <Button
                title="DESCARGAR REPORTE"
                color="#A99169"
                onPress={() => {
                    
                    downloadFile();
                }}
            />
        </View>
    )
}

export { ClientesEstablecimiento }