import * as React from 'react'
import { View, StyleSheet, Text, ActivityIndicator,SafeAreaView,ScrollView,StatusBar } from 'react-native';
import { Button, Image} from 'react-native-elements';
import Swiper from 'react-native-swiper'


import {HeaderCpg} from './HeaderCpg'
function HomeScreen({ navigation }) {

  

    const StylosCPG = StyleSheet.create({
      container: {
        padding: 20,
        justifyContent: 'center'
      },
      titulo: {
        fontSize: 20,
        textAlign: 'center',
        color: "#A99169",
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
        marginBottom: 50,
      },
      centro: {
        alignItems: 'center',
      },
      colorBoton: {
        backgroundColor: "#A99169",
      },
      headercpg: {
        height: 50,
        backgroundColor: "#e95238"
      },
      imgInicio: {
        height: 150,
        width: 396,
      },
      imgContenedor: {
        marginBottom: 10,
      },
      imgTexto: {
        backgroundColor: "#111111",
        opacity: 0.7,
        padding: 10,
        marginTop: -39,
        color: "#FFFFFF"
      },
      imgTextoColor: {
        color: "#FFFFFF",
        textAlign: 'right',
      },
      headerTop: {
        position: 'absolute',
        flex: 1,
      },
      wrapper: {
        height: 300,
      },
      slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
      },
      slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
      },
      slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
      },
      text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
      }
    });
  
    return (
      <SafeAreaView>
        <StatusBar hidden={true} />
        <ScrollView>
          <View>
            <View>
              <HeaderCpg/>
            </View>
            <View style={StylosCPG.container}>
              <View style={StylosCPG.imgContenedor}>
                <Image source={require('../../src/img/img-prueba-dos.png')} style={StylosCPG.imgInicio} PlaceholderContent={<ActivityIndicator />} />
                <View style={StylosCPG.imgTexto}>
    <Text H1 style={StylosCPG.imgTextoColor} onPress={() => navigation.navigate('ExpUnoScreen')} >Cenas Especiales</Text>
                </View>
              </View>
              <View style={StylosCPG.imgContenedor}>
                <Image source={require('../../src/img/img-prueba-tres.png')} style={StylosCPG.imgInicio} PlaceholderContent={<ActivityIndicator />} />
                <View style={StylosCPG.imgTexto} >
                  <Text H1 style={StylosCPG.imgTextoColor} onPress={() => navigation.navigate('ExpDosScreen')} >Selección de Productos</Text>
                </View>
              </View>
              <View style={StylosCPG.imgContenedor}>
                <Image source={require('../../src/img/img-prueba-cuatro.png')} style={StylosCPG.imgInicio} PlaceholderContent={<ActivityIndicator />} />
                <View style={StylosCPG.imgTexto} >
                  <Text H1 style={StylosCPG.imgTextoColor} onPress={() => navigation.navigate('ExpTresScreen')} >Bienestar</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }


  export {
      HomeScreen
  }