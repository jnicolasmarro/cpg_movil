import * as React from 'react';
import { Text, View, SafeAreaView, FlatList, Alert,RefreshControl } from 'react-native';
import { Card,Button } from 'react-native-elements';
import { API_URL } from "@env";
import { getUserToken } from '../../Storage/userToken';
import { ActivityIndicatorCPG } from '../ActivityIndicatorCPG'
import { FailConnectionCPG } from '../FailConnectionCPG'
import { SinAsistentes } from './SinAsistentes'

const Asistente = ({ item ,setUpdated}) => {

    const inactivarAsistente=async ()=>{
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
                throw error
            });
    }


    return (
        <Card containerStyle={{ padding: 0 }} >
            <View>
            <View>
                <Text>{item.nombre_usuario}</Text>
                <Text>{item.email}</Text>
            </View>
            <View>
            <Button
            title='INACTIVAR'
            onPress={() => {
                setUpdated(false)
                Alert.alert('Confirmación','Confirma inactivar al asistente',
                [
                    {
                      text: "Cancelar",
                      style: "cancel"
                    },
                    { text: "Inactivar", onPress: () => {
                        inactivarAsistente()
                        .then((json)=>{
                            if(json.success){
                                Alert.alert('Confirmación',json.success);
                                setUpdated(true)
                            }
                        })
                        .catch(
                            Alert.alert('Error','Error de conexión al servidor')
                        )
                    } }
                  ],
                  { cancelable: true })
            }}
            ></Button>
            </View>
            </View>
        </Card>
    )
}



const Asistentes = ({navigation}) => {
    const [asistentes, setAsistentes] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const [failConnection, setFailConnection] = React.useState(false);
    const [no_disponibles, setNo_disponibles] = React.useState(false);
    const [updated,setUpdated] = React.useState(false);


    const renderItem = ({ item }) => (
        <Asistente item={item} setUpdated={setUpdated}/>
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
        console.log('prueba')
        setLoading(true)
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
        console.log(no_disponibles)
    }, [updated])

    return (

        isLoading ? (
            <ActivityIndicatorCPG />
        ) : (
                failConnection ? (
                    <FailConnectionCPG />
                ) : (
                        no_disponibles ? (
                            <SinAsistentes prueba={navigation} update={setUpdated} updated={updated}/>
                        ) : (
                                <SafeAreaView style={{ flex: 1 }} >
                                    <FlatList
                                        data={asistentes}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.id_user.toString()}
                                        ListHeaderComponent={
                                            <Text>TUS ASISTENTES</Text>
                                        }
                                        refreshControl={
                                            <RefreshControl
                                              //refresh control used for the Pull to Refresh
                                              refreshing={isLoading}
                                              onRefresh={()=>{traeAsistentes()
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

export { Asistentes }