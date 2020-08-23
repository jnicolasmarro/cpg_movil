import * as React from 'react'
import { View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';

function ActivityIndicatorCPG() {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center"
        },
        horizontal: {
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 10
        }
    });


    return (
        <View style={[styles.container, styles.horizontal]} screenOptions={{ headerShown: false }}>
            <StatusBar hidden={true} />
            <ActivityIndicator size="large" color="#A99169" />
        </View>
    )

}

export {
    ActivityIndicatorCPG
}