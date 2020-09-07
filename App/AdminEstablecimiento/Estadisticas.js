
import * as React from 'react';
import { View, Text, StyleSheet, StatusBar, Alert } from 'react-native';
import { Button } from 'react-native-elements'
import { ActivityIndicatorCPG } from '../ActivityIndicatorCPG'
import { FailConnectionCPG } from '../FailConnectionCPG'
import { getUserToken } from '../../Storage/userToken'
import { API_URL } from "@env"

function Estadisticas({ navigation }) {

    const [estadisticas, setEstadisticas] = React.useState();
    const [isLoading, setLoading] = React.useState(true)
    const [failConnection, setFailConnection] = React.useState(false)
    const [update, setUpdate] = React.useState(false)



    React.useEffect(() => {

        const obtenerEstadisticas = async () => {
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
        obtenerEstadisticas()
    }, [isLoading])

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
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text>{estadisticas.cantidad_leidas} Experiencias Redimidas</Text>
                            </View>
                            <View>
                                <Button
                                    title="TUS CLIENTES"
                                    color="#A99169"
                                    onPress={() => {
                                        navigation.navigate('ClientesEstablecimiento', {
                                            data: estadisticas.usuarios
                                        });

                                    }}
                                />
                                <Button
                                    title="REDENCIONES POR MES"
                                    color="#A99169"
                                    onPress={() => {
                                        navigation.navigate('RedencionesMes', {
                                            data: estadisticas.usos_meses
                                        });

                                    }}
                                />
                                <Button
                                    title="ACTUALIZAR ESTADÍSTICAS"
                                    color="#A99169"
                                    onPress={() => {
                                        setLoading(true);
                                    }}
                                />
                            </View>

                        </>
                    )

            )

    );
}

export { Estadisticas }