import * as React from 'react';
import { Text, View, SafeAreaView, FlatList, Alert, RefreshControl, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { API_URL } from "@env";
import { getUserToken } from '../../Storage/userToken';
import { ActivityIndicatorCPG } from '../ActivityIndicatorCPG'
import { FailConnectionCPG } from '../FailConnectionCPG'
import { SinAsistentes } from './SinAsistentes'
import { StylosFont } from '../FontTrajan';

const Asistente = ({ item, setUpdated, updated }) => {

    const inactivarAsistente = async () => {
        let token = await getUserToken();
        return fetch(`${API_URL}/adminEstablecimiento/inactivar/${item.id_user}`, {
            method: 'PUT',
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
                console.log(error)
                throw error
            });
    }


    return (
        <Card containerStyle={{ padding: 10, borderRadius: 10, }} >
            <View>
                <View>
                    <Text style={{ fontSize: 20, textAlign: 'center', borderBottomColor: '#a3a3a3', borderBottomWidth: 1, }}>{item.nombre_usuario}</Text>
                    <Text style={{ textAlign: 'center', margin: 5, }}>{item.email}</Text>
                </View>
                <View>
                    <Button
                        title='INACTIVAR'
                        buttonStyle={StylosCPG.colorBoton}
                        onPress={() => {
                            Alert.alert('Confirmación', 'Confirma inactivar al asistente',
                                [
                                    {
                                        text: "Cancelar",
                                        style: "cancel"
                                    },
                                    {
                                        text: "Inactivar", onPress: () => {
                                            inactivarAsistente()
                                                .then((json) => {
                                                    if (json.success) {
                                                        Alert.alert('Confirmación', json.success);
                                                        setUpdated(!updated)
                                                    }
                                                })
                                                .catch((error)=>{
                                                    Alert.alert('Error', 'Error de conexión al servidor')
                                                }
                                                    
                                                )
                                        }
                                    }
                                ],
                                { cancelable: true })
                        }}
                    ></Button>
                </View>
            </View>
        </Card>
    )
}



const Asistentes = ({ navigation }) => {
    const [asistentes, setAsistentes] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const [failConnection, setFailConnection] = React.useState(false);
    const [no_disponibles, setNo_disponibles] = React.useState(false);
    const [updated, setUpdated] = React.useState(false);


    const renderItem = ({ item }) => (
        <Asistente item={item} setUpdated={setUpdated} updated={updated} />
    );

    const fetchAsistentes = (token) => {
        return fetch(`${API_URL}/adminEstablecimiento/asistentes`, {
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

    const traeAsistentes = async () => {
        setLoading(true)
        setFailConnection(false)
        setNo_disponibles(false)


        let token = await getUserToken()
        await fetchAsistentes(token)
            .then(asistentes => {
                if (asistentes.asistentes.length == 0) {
                    setNo_disponibles(true)
                }
                setAsistentes(asistentes.asistentes)
                setLoading(false)
            })
            .catch(() => {
                setFailConnection(true)
                setLoading(false)
            })

    }

    React.useEffect(() => {
        traeAsistentes()
        const unsubscribe = navigation.addListener('focus', () => {
            traeAsistentes()
        });
        return unsubscribe;
    }, [updated])

    return (

        isLoading ? (
            <ActivityIndicatorCPG />
        ) : (
                failConnection ? (
                    <FailConnectionCPG />
                ) : (
                        no_disponibles ? (
                            <SinAsistentes />
                        ) : (
                                <SafeAreaView style={StylosCPG.container} >
                                    <FlatList
                                        data={asistentes}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.id_user.toString()}
                                        ListHeaderComponent={
                                            <View style={StylosCPG.titulo}>
                                                <Text style={StylosFont.fuenteCentrada}>TUS ASISTENTES</Text>
                                            </View>
                                        }
                                        refreshControl={
                                            <RefreshControl
                                                //refresh control used for the Pull to Refresh
                                                refreshing={isLoading}
                                                onRefresh={() => {
                                                    traeAsistentes()
                                                }}
                                            />
                                        }
                                    />
                                </SafeAreaView>
                            )

                    )


            )



    );


}

const StylosCPG = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        color: "#FFFFFF",
        flex: 1,

        alignContent: 'center'
    },
    input: {
        backgroundColor: '#E0E0E0',
        color: "#9d7f4f",
        marginBottom: 1,
        paddingRight: 10,
        paddingLeft: 10,
        fontSize: 15,
        borderRadius: 10,
    },
    titulo: {
        margin: 10,
    },
    textColor: {
        color: "#FFFFFF",
    },
    colorBoton: {
        backgroundColor: "#9d7f4f",
        margin: 20,
    },
    numeroexperiencias: {
        margin: 20,
        backgroundColor: '#5FA39D',
        padding: 15,
        borderRadius: 10,
    },
});


export { Asistentes }