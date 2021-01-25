import * as React from 'react';
import {SafeAreaView,StatusBar,FlatList,Alert} from 'react-native'
import {Experiencia} from './Experiencia'
import {ActivityIndicatorCPG} from '../ActivityIndicatorCPG'
import {getUserToken} from '../../Storage/userToken'
import {SinInformacion} from './SinExperiencias'
import { API_URL } from "@env";
import {FlingGestureHandler,Directions,State,PanGestureHandler } from 'react-native-gesture-handler';
import { RefreshControl} from 'react-native'
import {FailConnectionCPG} from '../FailConnectionCPG'


function AdminInicioScreen ({ navigation }) {

  const renderItem = ({ item }) => (
    <Experiencia item={item} navigation={navigation}/>
  );

  const [isLoading, setLoading] = React.useState(true)
  const [failConnection, setFailConnection] = React.useState(false)
  const [disponibles_experiencias, setExperiencias] = React.useState()
  const [no_disponibles, setNo_disponibles] = React.useState(false)
  const fetchExperiencias = (token) => {
    return fetch(`${API_URL}/adminEstablecimiento/experiencias`, {
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

  const traeExperiencias = async () => {
    setLoading(true)
    setFailConnection(false)
    setNo_disponibles(false)
    let token = await getUserToken()
    await fetchExperiencias(token)
      .then(experiencias => {
        if(experiencias.experiencias.length==0){
          setNo_disponibles(true)
        }
        setExperiencias(experiencias.experiencias)
        setLoading(false)
      })
      .catch(() => {
        setFailConnection(true)
        setLoading(false)
      })

  }

  React.useEffect(() => {
      traeExperiencias()
    const unsubscribe = navigation.addListener('focus', () => {
      traeExperiencias()
    });
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
          <SinInformacion/>
          ):(
            
          <SafeAreaView>
              <StatusBar hidden={true} />
              <FlatList
        data={disponibles_experiencias}
        renderItem={renderItem}
        keyExtractor={item => item.id_experiencia.toString()}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={isLoading}
            onRefresh={()=>{traeExperiencias()
            
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

 

  export default AdminInicioScreen;