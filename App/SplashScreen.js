import * as React from 'react'
import { View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';


function SplashScreen() {

    const StylosCPG = StyleSheet.create({
        container: {
            backgroundColor: '#111111',
            flex: 10,
            justifyContent: 'center',
            alignItems: 'stretch',
            flexDirection: 'column'
        },
        centro: {
            alignItems: 'center',
        },
        padin20: {
            padding: 20,
        },
        logoHome: {
            width: 187,
            height: 105,
            justifyContent: 'center',
            marginBottom: 50,
        }
    });
    return (
        <View style={StylosCPG.container} >
            <StatusBar hidden={true} />
            <View style={StylosCPG.padin20}>
                <View style={StylosCPG.centro}>
                    <Image source={require('../src/img/logo_cpg.png')} style={StylosCPG.logoHome} PlaceholderContent={<ActivityIndicator />} />
                </View>
            </View>
        </View>
    );
}

export {
    SplashScreen
}