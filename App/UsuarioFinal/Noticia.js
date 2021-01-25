
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


const Noticia = ({ item,navigation }) => {
  return(
    <Card
      
      title={
      <View style={StylosCPG.tituloCard}>
        <Text style={StylosFont.fuenteCentradaBlanco}>{item.titulo_noticia}</Text>
      </View>
      }
      containerStyle={StylosCPG.bRedondo}
      featuredTitleStyle={{fontFamily: 'Trajan',}}
      image={{
        uri: `${API_URL}${item.imagen_noticia}`,
      }}>
      <Text style={{ marginBottom: 10, fontSize:14}}>
  Fecha de publicación: {item.createdAt}
      </Text>
      <Button
        
        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,backgroundColor:"#A99169" }}
        title='INFORMACIÓN'
        onPress={() => navigation.navigate('InfoNoticia',{
          id_noticia: item.id_noticia
        })}
        
      />
    </Card>
  )};

  export {Noticia}