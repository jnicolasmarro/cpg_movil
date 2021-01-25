import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackView } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { ActivityIndicatorCPG } from '../ActivityIndicatorCPG'
import { FailConnectionCPG } from '../FailConnectionCPG'
import { getUserToken } from '../../Storage/userToken'
import { API_URL } from "@env"
import {StylosFont} from '../FontTrajan';


function SoporteScreen({navigation}) {

  const [urlWhatsapp, setUrlWhatsapp] = React.useState();
  const [isLoading, setLoading] = React.useState(true)
  const [failConnection, setFailConnection] = React.useState(false)

  const obtenerLink = async () => {
    let token = await getUserToken();
    return await fetch(`${API_URL}/contacto/linkWhatsapp`, {
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

    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true)
      setFailConnection(false)
      actualizarLink()
    });
    const actualizarLink = async () => {
      await obtenerLink()
        .then((json) => {
          setUrlWhatsapp(json.linkWhatsApp)
          setLoading(false)

        })
        .catch(()=>{
          setLoading(false)
          setFailConnection(true)
        })
    }

    return unsubscribe;
    
  }, [])


  return (
    isLoading ? (
      <ActivityIndicatorCPG />
    ) : (
        failConnection ? (
          <FailConnectionCPG />
        ) : (
            <View style={StylosCPG.container}>
              <View style={StylosCPG.titulo}>
              
              <Text style={StylosFont.fuenteCentrada} >CONTÁCTENOS</Text>
              </View>
              <View style={StylosCPG.bloque}>
                <Text style={StylosCPG.textos}>!Eres parte de nuestro selecto Programa de privilegios, descubra todos los beneficios que tenemos¡</Text>
              </View>
              <View style={StylosCPG.bloque}>
              <Text style={StylosCPG.textosDos}>Envíenos todas sus inquietudes y le estaremos contactando.</Text>
              </View>
             <View style={StylosCPG.bloque}>
              <Button
                buttonStyle={StylosCPG.colorBoton}
                title="¿Cómo podemos ayudarte?"
                color="#A99169"
                onPress={() => {
                  Linking.openURL(urlWhatsapp);
                }}
                
              />
              </View>



            </View>
          )
      )


  );
}

const StylosCPG = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    color: "#FFFFFF",
    flex:0.6,
    marginTop:100,
    marginBottom:10,
    marginLeft:10,
    marginRight:10,
    borderRadius:10,
    
    alignContent:'center'

  },
  input: {
    
    backgroundColor: '#35605A',
    color: "#FFFFFF",
    marginBottom: 1,
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 15,
  },
  textColor:{
    color: "#FFFFFF",
  },
  logoHome: {
    width: 187,
    height: 105,
    justifyContent: 'center',
    marginBottom: 15,
  },
  centro: {
    alignItems: 'center',
  },
  colorBoton: {
    backgroundColor: "#279A92",
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
    padding: 0
  },
  titulo: {
  marginBottom: 20,
  marginTop:20,
  },
  textos: {
    fontSize:20,
    textAlign:'center'
    },
  textosDos: {
    fontSize:18,
    textAlign:'center',
    color:'#575756',
      },
    bloque: {
    marginTop:10,
    marginBottom:10,
    marginLeft:10,
    marginRight:10,
      },
});


export { SoporteScreen };