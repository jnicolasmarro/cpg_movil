import * as React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { Icon, Button, Image, Card } from 'react-native-elements';
import { getUserToken } from '../../Storage/userToken'
import { API_URL } from "@env"
import { ActivityIndicatorCPG } from '../ActivityIndicatorCPG'
import { FailConnectionCPG } from '../FailConnectionCPG'
import {StylosFont} from '../FontTrajan';

const Item = ({ item }) => (
    <Card
        featuredTitleStyle={StylosCPG.tituloItem}
        containerStyle={StylosCPG.bRedondo}
        title={item.titulo_item} titleStyle={StylosCPG.tituloItem}>
        <Text style={{ marginBottom: 10 }}>
            {item.descripcion_item}
  </Text>
    </Card>
);

function InfoExp({ route, navigation }) {

    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    const { id_experiencia } = route.params;

    const [isLoading, setLoading] = React.useState(true)
    const [id_user, setId_user] = React.useState()
    const [failConnection, setFailConnection] = React.useState(false)
    const [experiencia_info, setExperiencia_Info] = React.useState()

    const fetchExperiencia = (token) => {
        return fetch(`${API_URL}/experiencia/obtener/${id_experiencia}`, {
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

    React.useEffect(() => {
        const traeInfoExp = async () => {

            let token = await getUserToken();
            await fetchExperiencia(token)
                .then(experiencia => {
                    setExperiencia_Info(experiencia.experiencia)
                    setId_user(token.header_id_user)
                    setLoading(false)
                })
                .catch(() => {
                    setFailConnection(true)
                    setLoading(false)
                })



        }
        traeInfoExp()
    }, [])
    return (

        isLoading ? (
            <ActivityIndicatorCPG />
        ) : (
                failConnection ? (
                    <FailConnectionCPG />
                ) : (
                        <SafeAreaView style={{ flex: 1 }} >
                            <FlatList
                                data={experiencia_info.items}
                                renderItem={renderItem}
                                style={StylosCPG.items}
                                keyExtractor={item => item.id_item.toString()}
                                ListHeaderComponent={
                                    <>
                                        <View style={StylosCPG.headercpg}>
                                            <View style={StylosCPG.flechaAtras}>
                                                <Icon
                                                    name='arrow-back'
                                                    color='#FFFFFF'
                                                    onPress={() => navigation.goBack()} />
                                            </View >
                                            <View style={StylosCPG.regresar}>
                                                <Text style={StylosCPG.regresarTexto}>REGRESAR</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Image
                                                source={{ uri: `${API_URL}${experiencia_info.imagen_experiencia}` }}
                                                style={StylosCPG.imgInicio}
                                            />
                                            <View style={StylosCPG.tituloExp}>
                                                <Text style={StylosCPG.tituloExpTexto}>{experiencia_info.titulo_experiencia} </Text>
                                            </View>

                                        </View>
                                        <View style={StylosCPG.info}>
                                            <View style={StylosCPG.logoEsta}>
                                            <Image
                                                source={{ uri: `${API_URL}${experiencia_info.establecimiento.logo_establecimiento}` }}
                                                resizeMethod='scale'
                                                resizeMode='stretch'
                                                style={StylosCPG.imgLogo}
                                            />
                                            </View>
                                            <View style={StylosCPG.precio}>
                                                <Text style={StylosCPG.costoInfo}>Precio PG</Text>
                                <Text style={StylosCPG.costoInfo}>{`$${experiencia_info.precio_experiencia}`}</Text>
                                                <Text style={StylosCPG.costoInfoPeque}>Precio establecimineto {`$${experiencia_info.precio_publico}`}</Text>
                                            </View>

                                        </View>
                                    </>
                                }
                                 />
                        </SafeAreaView>
                    )


            )



    );
}

// estilos css

const StylosCPG = StyleSheet.create({
    container: {
     padding:20,
     justifyContent:'center'
     
    },
  
    input:{
      color:"#A99169",
      marginBottom:1,
      paddingRight:10,
      paddingLeft:10,
      fontSize:15,
  
    },
    logoHome:{
      width: 187,
      height:105,
      justifyContent:'center',
      marginBottom:50,
      
    
    },
    centro:{
      alignItems:'center',
  
    },
    colorBoton:{
      backgroundColor:"#A99169",
      marginTop:20,
      padding:10,
      margin:10,
    },
  
    headercpg:{
    height:50,
    backgroundColor:"#5fa39d",
    flexDirection:'row'
    },
    imgInicio:{
      
      height:150,
      width:'100%',
    
    },
    imgContenedor:{
      marginBottom:10,
     
    },
  imgTexto:{
    backgroundColor:"#111111",
    opacity:0.7,
    padding:10,
    marginTop:-39,
    color:"#FFFFFF"
  },
  imgTextoColor:{
    color:"#FFFFFF",
    textAlign:'right',
    
  },
  headerTop:{
    position:'absolute',
   flex:1,
  },
  flechaAtras:{
    width:50,
    backgroundColor:'#45756f',
    alignItems:'center',
    justifyContent:'center'
  },
  regresar:{
    alignItems:'center',
    color:'#FFFFFF',
    justifyContent:'center',
    paddingLeft:20,
  
  },
  regresarTexto:{
    color:'#FFFFFF',
  },
   tituloExp:{
     alignItems:'center',
     marginTop:-50,
     height:50,
   },
   tituloExpTexto:{
    color:'#FFFFFF',
    fontSize:30,
    fontFamily: 'Trajan',
    textShadowColor:'#26242F',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
    
  
   },
   info:{
     height:100,
     backgroundColor:"#5fa39d",
     borderBottomWidth:20,
     borderBottomColor:"#45756f",
     flexDirection:'row'
     
   },
   logoEsta:{
     width:'30%',
     margin:10,
     marginTop:0,
     backgroundColor:'#FFFFFF',
     alignContent:'center',
     justifyContent:'center'
   },
   costoInfo:{
     color:'#FFFFFF',
     fontSize:20,
     marginTop:2,
     fontFamily:'Trajan'
    
   },
   costoInfoPeque:{
    color:'#FFFFFF',
    fontSize:10,
    marginTop:-1,
    
  },
  precio:{
    marginLeft:10,
  },
  items:{
    marginBottom:20,
  },
  tituloItem:{
  textAlign:'left',
  color:'#9d7f4f',
  fontSize:20,
  fontFamily:'Trajan'
  },
  imgLogo:{
    height:50
  },
  bRedondo:{
    borderRadius:15,
  }
  })

export { InfoExp };
