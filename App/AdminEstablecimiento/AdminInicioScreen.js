import * as React from 'react';
import {SafeAreaView,StatusBar,FlatList,Alert} from 'react-native'
import {Experiencia} from './Experiencia'
import {ActivityIndicatorCPG} from '../ActivityIndicatorCPG'
import {getUserToken} from '../../Storage/userToken'
import {SinExperiencias} from './SinExperiencias'
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

  const traeExperienciasP = async () => {
    setLoading(true)
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
    const traeExperiencias = async () => {
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
    traeExperienciasP()
  },[])

  const config = {
    velocityThreshold: 0.1,
    directionalOffsetThreshold: 80
  };

  return (

    isLoading ? (

      <ActivityIndicatorCPG />

    ) : (
        failConnection ? (
          <FailConnectionCPG />
        ) : (
          no_disponibles?(
          <SinExperiencias/>
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
            onRefresh={()=>{traeExperienciasP()
            
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