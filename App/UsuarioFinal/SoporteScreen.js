import * as React from 'react';
import { View, Text } from 'react-native';
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


function SoporteScreen() {

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
    actualizarLink()
  }, [])


  return (
    isLoading ? (
      <ActivityIndicatorCPG />
    ) : (
        failConnection ? (
          <FailConnectionCPG />
        ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</Text>
              <Button
                title="WHATSAPP"
                color="#A99169"
                onPress={() => {
                  Linking.openURL(urlWhatsapp);
                }}
              />
            </View>
          )
      )


  );
}

export { SoporteScreen };