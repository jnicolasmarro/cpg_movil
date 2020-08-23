
import * as React from 'react';
import { Text} from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { API_URL } from "@env"

const Experiencia = ({ item,navigation }) => (
    <Card
      title={item.titulo_experiencia}
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
  );

  export {Experiencia}