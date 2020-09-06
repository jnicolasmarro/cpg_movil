import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList } from 'react-native';
import { SearchBar, CheckBox } from 'react-native-elements';
import { getUserToken } from '../../Storage/userToken'
import { API_URL } from "@env"
import {Experiencia} from './Experiencia'


function BuscarScreen({navigation}) {

  const renderItem = ({ item }) => (
    <Experiencia item={item} navigation={navigation}/>
  );

  const realizarBusqueda = async (value) => {
    let tipo;
    if (restaurantes)
      tipo = 1
    if (experiencias)
      tipo = 2


    let token = await getUserToken();
    return fetch(`${API_URL}/experiencia/busqueda/${tipo}/${value}`, {
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
        setResultados(json)
      })
      .catch((error) => {
        throw error
      });
  }

  const [busqueda, setSearch] = React.useState();
  const [restaurantes, setRestaurantes] = React.useState(true);
  const [experiencias, setExperiencias] = React.useState(false);
  const [resultados, setResultados] = React.useState([]);

  const StylosCPG = StyleSheet.create({
    container: {
      backgroundColor: '#111111',
      flex: 1,
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
      marginBottom: 15,
    },
    centro: {
      alignItems: 'center',
    },
    colorBoton: {
      backgroundColor: "#A99169",
    },
    buttonsContainer: {
      flexDirection: 'row',
      alignItems: 'stretch',
      width: '100%',
      marginTop: 0,
      marginRight: 0,
      marginLeft: 0,
      padding: 0
    },
    titulo: {
      fontSize: 20,
      textAlign: 'center',
      color: "#A99169",
      marginBottom: 45
    }
  });

  return (
    
      
      <SafeAreaView>
              <StatusBar hidden={true} />
              <FlatList
        data={resultados.busqueda}
        renderItem={renderItem}
        keyExtractor={item => item.id_experiencia.toString()}
        ListHeaderComponent={
          <>
             <SearchBar
        placeholder="Buscar"
        value={busqueda}
        onChangeText={value => {
          setSearch(value);
          if(value){
            realizarBusqueda(value);
          }else{
            setResultados([])
          }
        }}
      />
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
        <CheckBox
          title='Restaurantes'
          containerStyle={{ flex: 1 }}
          checked={restaurantes}
          onPress={() => {
            setResultados([])
            setRestaurantes(!restaurantes);
            setExperiencias(!experiencias);
            setSearch("");

          }}
        />
        <CheckBox
          title='Experiencias'
          containerStyle={{ flex: 1 }}
          checked={experiencias}
          onPress={() => {
            setResultados([])
            setRestaurantes(!restaurantes);
            setExperiencias(!experiencias);
            setSearch("");
          }}

        />
      </View>
          </>
      }
      />
            </SafeAreaView>

    
  );
}

export { BuscarScreen };