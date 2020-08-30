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



  const RedencionesMes = ({route})=>{

    const { data } = route.params;

    return(
        <View>
  <Text>REDENCIONES POR MES</Text>
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
    width={(Dimensions.get("window").width)*(data.meses.length/3)} // from react-native
    height={220}
    onDataPointClick={(value)=>{Alert.alert('Información',`Periodo: ${data.meses[value.index]} \n Cantidad: ${value.value} Redenciones`)}}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
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
    )
  }


export {RedencionesMes}