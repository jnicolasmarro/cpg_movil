import * as React from 'react';
import {  SafeAreaView, FlatList,StatusBar } from 'react-native';
import { getUserToken } from '../../Storage/userToken'
import { API_URL } from "@env"
import { ActivityIndicatorCPG } from '../ActivityIndicatorCPG'
import { FailConnectionCPG } from '../FailConnectionCPG'
import {Noticia} from './Noticia'
import {SinInformacion} from './SinInformacion'
import {AfiliacionVencida} from './AfiliacionVencida'



function NoticiasScreen({ navigation }) {

  const renderItem = ({ item }) => (
    <Noticia item={item} navigation={navigation}/>
  );

  const [isLoading, setLoading] = React.useState(true)
  const [failConnection, setFailConnection] = React.useState(false)
  const [noticias, setNoticias] = React.useState()
  const [no_disponibles, setNo_disponibles] = React.useState(false)
  const fetchNoticias = (token) => {
    return fetch(`${API_URL}/noticia/obtener`, {
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
      setNo_disponibles(false)
      traeNoticias()
    });
    

    const traeNoticias = async () => {
      let token = await getUserToken()
      await fetchNoticias(token)
        .then((noticias) => {
          setLoading(false)
          
          if(noticias.res_noticias.length==0){
            setNo_disponibles(true)
            
          }else{
            setNoticias(noticias.res_noticias)
          }
      }
      )
        .catch(() => {
          setFailConnection(true)
          setLoading(false)
        })

    }
    
    return unsubscribe;
  },[])



  return (

    isLoading ? (

      <ActivityIndicatorCPG />

    ) : (
        failConnection ? (
          <FailConnectionCPG />
        ) : (

          
            no_disponibles?(
              <SinInformacion informacion='Sin noticias disponibles en el momento'/>
              ):(
              <SafeAreaView>
                  <StatusBar hidden={true} />
                  <FlatList
            data={noticias}
            renderItem={renderItem}
            keyExtractor={item => item.id_noticia.toString()}
          />
                </SafeAreaView>
              )
          

          )

      )


  );
}

  export  {NoticiasScreen};