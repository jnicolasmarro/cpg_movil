import * as React from 'react';
import { View, Text, StyleSheet, StatusBar, Alert } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const ClientesEstablecimiento = ({route}) => {

    const { data } = route.params;

    const styles = StyleSheet.create({
        container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
        head: { height: 40, backgroundColor: '#f1f8ff' },
        text: { margin: 6 }
      });

    return (
        <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={['Nombre', 'Teléfono', 'Correo']} style={styles.head} textStyle={styles.text}/>
          <Rows data={data} textStyle={styles.text}/>
        </Table>
      </View>
    )
}

export {ClientesEstablecimiento}