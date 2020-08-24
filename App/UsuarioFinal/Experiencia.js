
import * as React from 'react';
import { Text,View} from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { API_URL } from "@env"
import {StylosFont} from '../FontTrajan';



const Experiencia = ({ item,navigation }) => {
  return(
    <Card
      
      title={
      <View>
        <Text style={StylosFont.fuenteCentrada}>{item.titulo_experiencia}</Text>
      </View>
      }
      featuredTitleStyle={{fontFamily: 'Trajan'}}
      image={{
        uri: `${API_URL}${item.imagen_experiencia}`,
      }}>
      <Text style={{ marginBottom: 10 }}>
  {item.descripcion_experiencia}
      </Text>
      <Button
        icon={<Icon name='code' color='#ffffff' />}
        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,backgroundColor:"#A99169" }}
        title='INFORMACION'
        onPress={() => navigation.navigate('InfoExp',{
          id_experiencia: item.id_experiencia
        })}
      />
    </Card>
  )};

  export {Experiencia}