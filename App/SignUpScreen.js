import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Input, CheckBox} from 'react-native-elements';
import {AuthContext} from '../context/AuthContext'


function SignUpScreen({ navigation }) {

    const [nombre, setNombre] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [celular, setCelular] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [codigo, setCodigo] = React.useState('');
    const [numero_identificacion, setNumero_identificacion] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const { signUp } = React.useContext(AuthContext);
    const StylosCPG = StyleSheet.create({
      container: {
        backgroundColor: '#111111',
        flex: 1,
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
        marginBottom: 15,
      },
      centro: {
        alignItems: 'center',
      },
      colorBoton: {
        backgroundColor: "#A99169",
      }
    });
  
    return (
      <View style={StylosCPG.container}>
        <View>
          <Text style={StylosCPG.titulo}>REGISTRO</Text>
          <Input
            placeholder='NOMBRE'
            inputStyle={StylosCPG.input}
            value={nombre}
            onChangeText={setNombre}
          />
          <Input
            placeholder='NÚMERO DE IDENTIFICACIÓN'
            inputStyle={StylosCPG.input}
            value={numero_identificacion}
            onChangeText={setNumero_identificacion}
            keyboardType="numeric"
          />
          <Input
            placeholder='EMAIL'
            inputStyle={StylosCPG.input}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder='NUMERO CELULAR'
            inputStyle={StylosCPG.input}
            keyboardType="numeric"
            value={celular}
            onChangeText={setCelular}
          />
          <Input
            placeholder='CONTRASEÑA'
            inputStyle={StylosCPG.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Input
            placeholder='CREDENCIAL'
            inputStyle={StylosCPG.input}
            value={codigo}
            onChangeText={setCodigo}
          />
        </View>
        <View>
          <CheckBox
            title='Acepto los terminos, condiciones y tratamiento de datos'
            containerStyle={{ backgroundColor: '#111111', borderColor: '#111111', }}
            textStyle={{ color: "#A99169" }}
            checked={checked}
            onPress={() => setChecked(!checked)}
          />
        </View>
        <Button
          title="REGISTRARSE E INICIAR SESIÓN"
          onPress={() => signUp({ nombre, email, celular, password, codigo, checked,numero_identificacion })}
          buttonStyle={StylosCPG.colorBoton}
        />
      </View>
    );
  }


  export {SignUpScreen}