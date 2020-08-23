import * as React from 'react';
import {  SafeAreaView, FlatList,StatusBar } from 'react-native';
import { getUserToken } from '../../Storage/userToken'
import { API_URL } from "@env"
import { ActivityIndicatorCPG } from '../ActivityIndicatorCPG'
import { FailConnectionCPG } from '../FailConnectionCPG'
import {Experiencia} from './Experiencia'
import {SinExperiencias} from './SinExperiencias'

function ExpDosScreen({ navigation }) {

  const renderItem = ({ item }) => (
    <Experiencia item={item} navigation={navigation}/>
  );

  const [isLoading, setLoading] = React.useState(true)
  const [failConnection, setFailConnection] = React.useState(false)
  const [disponibles_experiencias, setExperiencias] = React.useState()
  const [no_disponibles, setNo_disponibles] = React.useState(false)
  const fetchExperiencias = (token) => {
    return fetch(`${API_URL}/experiencia/seleccion`, {
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
    traeExperiencias()
  },[])



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
      />
            </SafeAreaView>
          )
            


          )

      )


  );
}

export {
  ExpDosScreen
}