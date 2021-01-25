import * as React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { Icon, Button, Image, Card } from 'react-native-elements';
import { getUserToken } from '../../Storage/userToken'
import { API_URL } from "@env"
import { ActivityIndicatorCPG } from '../ActivityIndicatorCPG'
import { FailConnectionCPG } from '../FailConnectionCPG'
import { StylosFont } from '../FontTrajan';



function InfoNoticia({ route, navigation }) {



  const { id_noticia } = route.params;

  const [isLoading, setLoading] = React.useState(true)
  const [failConnection, setFailConnection] = React.useState(false)
  const [noticia_info, setNoticia_Info] = React.useState()

  const fetchNoticia = (token) => {
    return fetch(`${API_URL}/noticia/obtener/${id_noticia}`, {
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
    const traeInfoNoticia = async () => {

      let token = await getUserToken();
      await fetchNoticia(token)
        .then(noticia => {
          setNoticia_Info(noticia.res_noticia)
          setLoading(false)
        })
        .catch(() => {
          setFailConnection(true)
          setLoading(false)
        })



    }
    traeInfoNoticia()
  }, [])
  return (

    isLoading ? (
      <ActivityIndicatorCPG />
    ) : (
        failConnection ? (
          <FailConnectionCPG />
        ) : (
<>
            <View>
              <Image
                source={{ uri: `${API_URL}${noticia_info.imagen_noticia}` }}
                style={StylosCPG.imgInicio}
              />
              <View style={StylosCPG.tituloExp}>
                <Text style={StylosCPG.tituloExpTexto}>{noticia_info.titulo_noticia} </Text>
              </View>

            </View>
            <View>
              <Text>
              {noticia_info.contenido_noticia}
              </Text>
            </View>
          </>  
                    )


      )



  );
}

// estilos css

const StylosCPG = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center'

  },

  input: {
    color: "#A99169",
    marginBottom: 1,
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 15,

  },
  logoHome: {
    width: 187,
    height: 105,
    justifyContent: 'center',
    marginBottom: 50,


  },
  centro: {
    alignItems: 'center',

  },
  colorBoton: {
    backgroundColor: "#A99169",
    marginTop: 20,
    padding: 10,
    margin: 10,
  },

  headercpg: {
    height: 50,
    backgroundColor: "#5fa39d",
    flexDirection: 'row'
  },
  imgInicio: {

    height: 150,
    width: '100%',

  },
  imgContenedor: {
    marginBottom: 10,

  },
  imgTexto: {
    backgroundColor: "#111111",
    opacity: 0.7,
    padding: 10,
    marginTop: -39,
    color: "#FFFFFF"
  },
  imgTextoColor: {
    color: "#FFFFFF",
    textAlign: 'right',

  },
  headerTop: {
    position: 'absolute',
    flex: 1,
  },
  flechaAtras: {
    width: 50,
    backgroundColor: '#45756f',
    alignItems: 'center',
    justifyContent: 'center'
  },
  regresar: {
    alignItems: 'center',
    color: '#FFFFFF',
    justifyContent: 'center',
    paddingLeft: 20,

  },
  regresarTexto: {
    color: '#FFFFFF',
  },
  tituloExp: {
    alignItems: 'center',
    marginTop: -50,
    height: 50,
  },
  tituloExpTexto: {
    color: '#FFFFFF',
    fontSize: 30,
    fontFamily: 'Trajan',
    textShadowColor: '#26242F',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10


  },
  info: {
    height: 100,
    backgroundColor: "#5fa39d",
    borderBottomWidth: 20,
    borderBottomColor: "#45756f",
    flexDirection: 'row'

  },
  logoEsta: {
    width: '30%',
    margin: 10,
    marginTop: 0,
    backgroundColor: '#FFFFFF',
    alignContent: 'center',
    justifyContent: 'center'
  },
  costoInfo: {
    color: '#FFFFFF',
    fontSize: 20,
    marginTop: 2,
    fontFamily: 'Trajan'

  },
  costoInfoPeque: {
    color: '#FFFFFF',
    fontSize: 10,
    marginTop: -1,

  },
  precio: {
    marginLeft: 10,
  },
  items: {
    marginBottom: 20,
  },
  tituloItem: {
    textAlign: 'left',
    color: '#9d7f4f',
    fontSize: 20,
    fontFamily: 'Trajan'
  },
  imgLogo: {
    height: 50
  },
  bRedondo: {
    borderRadius: 15,
  }
})

export { InfoNoticia };
