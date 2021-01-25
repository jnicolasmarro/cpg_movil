
import * as React from 'react';
import { View, Text, StyleSheet, StatusBar, Alert } from 'react-native';
import { Button } from 'react-native-elements'
import { ActivityIndicatorCPG } from '../ActivityIndicatorCPG'
import { FailConnectionCPG } from '../FailConnectionCPG'
import { getUserToken } from '../../Storage/userToken'
import { API_URL } from "@env"
import {StylosFont} from '../FontTrajan';

function Estadisticas({ navigation }) {

    const [estadisticas, setEstadisticas] = React.useState();
    const [isLoading, setLoading] = React.useState(true)
    const [failConnection, setFailConnection] = React.useState(false)
    const [update, setUpdate] = React.useState(false)

    const obtenerEstadisticas = async () => {
        setLoading(true)
        setFailConnection(false)
        await fetchEstadisticas()
            .then((json) => {
                setEstadisticas(json)
                setLoading(false)
            })
            .catch(() => {
                setFailConnection(true)
                setLoading(false)
            })
    }

    React.useEffect(() => {
            obtenerEstadisticas()
        const unsubscribe = navigation.addListener('focus', () => {
            obtenerEstadisticas()
          });
          return unsubscribe;
    },[])

    const fetchEstadisticas = async () => {
        let token = await getUserToken();
        return fetch(`${API_URL}/adminEstablecimiento/estadisticas`, {
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


    return (
        isLoading ? (
            <ActivityIndicatorCPG />
        ) : (
                failConnection ? (
                    <FailConnectionCPG />
                ) : (
                        <>      
                            <View style={StylosCPG.titulo}>
                                <Text style={StylosFont.fuenteCentrada}>
                                    Tus Estadisticas
                                </Text>
                            </View>
                            <View style={StylosCPG.numeroexperiencias}>
                                <Text style={StylosFont.fuenteCentradaBlanco}>{estadisticas.cantidad_leidas} Experiencias Redimidas</Text>
                            </View>
                            <View style={StylosCPG.container}>
                                <Button
                                    buttonStyle={StylosCPG.colorBoton}
                                    title="TUS CLIENTES"
                                    color="#A99169"
                                    onPress={() => {
                                        navigation.navigate('ClientesEstablecimiento', {
                                            data: estadisticas.usuarios
                                        });

                                    }}
                                />
                                <Button
                                     buttonStyle={StylosCPG.colorBoton}
                                    title="REDENCIONES POR MES"
                                    color="#A99169"
                                    onPress={() => {
                                        navigation.navigate('RedencionesMes', {
                                            data: estadisticas.usos_meses
                                        });

                                    }}
                                />
                                <Button
                                    buttonStyle={StylosCPG.colorBoton}
                                    title="ACTUALIZAR ESTADÍSTICAS"
                                    color="#A99169"
                                    onPress={() => {
                                        obtenerEstadisticas();
                                    }}
                                />
                            </View>

                        </>
                    )

            )

    );
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
        margin:10,
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



export { Estadisticas }