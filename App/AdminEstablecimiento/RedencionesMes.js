import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

  import * as React from 'react';
  import { View, Dimensions, Text, StyleSheet, StatusBar,Alert } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import {StylosFont} from '../FontTrajan';



  const RedencionesMes = ({route})=>{

    const { data } = route.params;

    return(
        <View>
          <View style={StylosCPG.titulo}>
  <Text style={StylosFont.fuenteCentrada}>REDENCIONES POR MES</Text>
  </View>
  <View style={{margin:10,}}>
  <ScrollView
  horizontal={true}
  >
  <LineChart
    data={{
      labels: data.meses,
      datasets: [
        {
          data: data.cantidades
        }
      ]
    }}
    width={ (Dimensions.get("window").width)*(data.meses.length/3)} // from react-native
    height={200}
    onDataPointClick={(value)=>{Alert.alert('Información',`Periodo: ${data.meses[value.index]} \n Cantidad: ${value.value} Redenciones`)}}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#5FA39D",
      backgroundGradientFrom: "#5FA39D",
      backgroundGradientTo: "#5FA39D",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 5
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
      
  </ScrollView>
  </View>
</View>
    )
  }

  const StylosCPG = StyleSheet.create({
    container: {
      backgroundColor:"#FFFFFF",
      color: "#FFFFFF",
      flex:0.6,
      marginTop:20,
      marginBottom:20,
      marginLeft:20,
      marginRight:20,
      borderRadius:10,
      alignContent:'center'
    },
    input: {
      backgroundColor: '#E0E0E0',
      color: "#9d7f4f",
      marginBottom: 1,
      paddingRight: 10,
      paddingLeft: 10,
      fontSize: 15,
      borderRadius:10,
    },
    titulo:{
        marginBottom:15,
        marginTop:15,
    },
    textColor:{
      color: "#FFFFFF",
    },
    colorBoton: {
      backgroundColor: "#9d7f4f",
      margin:20,
    },
    numeroexperiencias: {
    margin: 20,
    backgroundColor:'#5FA39D',
    padding:15,
    borderRadius:10,
    },
  });
export {RedencionesMes}