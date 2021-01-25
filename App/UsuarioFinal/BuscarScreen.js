import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList, Alert } from 'react-native';
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
        return json
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
      backgroundColor: '#5FA39D',
      color: "#FFFFFF",
    },
    input: {
      
      backgroundColor: '#35605A',
      color: "#FFFFFF",
      marginBottom: 1,
      paddingRight: 10,
      paddingLeft: 10,
      fontSize: 15,
    },
    textColor:{
      color: "#FFFFFF",
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
      backgroundColor: "#279A92",
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
      color: "#279A92",
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
        containerStyle ={StylosCPG.container}
        inputContainerStyle ={StylosCPG.input}
        placeholderTextColor = "#FFFFFF"
        iconStyle={{color:'#fff'}}
        inputStyle ={{color:'#fff'}}
        leftIconStyle ={{color:'#fff'}}
       
       
        placeholder="Buscar"
        value={busqueda}
        onChangeText={value => {
          setSearch(value);
          if(value){
             realizarBusqueda(value)
            .then((resultados)=>{
              setResultados(resultados);
            }

            )
            .catch((error)=>{
              Alert.alert('Error','Por favor valida tu conexión a la red.')
            });
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
          checkedColor  = "#A99169"
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
          checkedColor  = "#A99169"
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