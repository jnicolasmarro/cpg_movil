
import * as React from 'react';
import { Text,View,StyleSheet} from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { API_URL } from "@env"
import {StylosFont} from '../FontTrajan';

const StylosCPG = StyleSheet.create({
  tituloCard: {
    padding: 10,
    justifyContent: 'center',
   backgroundColor:"#5fa39d",
    color:"#FFFFFF",
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
  },
  bRedondo:{
    borderRadius:10,
  },
 
});


const Experiencia = ({ item,navigation }) => {
  return(
    <Card
      
      title={
      <View style={StylosCPG.tituloCard}>
        <Text style={StylosFont.fuenteCentradaBlanco}>{item.titulo_experiencia}</Text>
      </View>
      }
      containerStyle={StylosCPG.bRedondo}
      featuredTitleStyle={{fontFamily: 'Trajan',}}
      image={{
        uri: `${API_URL}${item.imagen_experiencia}`,
      }}>
        <Text style={{ marginBottom: 10, fontSize:14}}>
          Estado de la experiencia: 
      {item.estado_experiencia?(' Activa'):(' Inactiva')}
      </Text>
      <Text style={{ marginBottom: 10, fontSize:14}}>
  {item.descripcion_experiencia }
      </Text>
      <Button
        
        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,backgroundColor:"#A99169" }}
        title='INFORMACIÓN'
        onPress={() => navigation.navigate('InfoExp',{
          id_experiencia: item.id_experiencia
        })}
      />
    </Card>
  )};

  export {Experiencia}