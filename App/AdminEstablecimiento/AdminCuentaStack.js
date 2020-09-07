
import { AdminCuentaScreen } from './AdminCuentaScreen'
import { createStackNavigator, StackView } from '@react-navigation/stack'
import * as React from 'react';



const AdminCuentaStack = createStackNavigator();

function AdminCuentaStackScreen() {
    return (
        <AdminCuentaStack.Navigator screenOptions={{ headerShown: false }}>
            <AdminCuentaStack.Screen name="AdminCuenta" component={AdminCuentaScreen} />
            {/* other screens */}
        </AdminCuentaStack.Navigator>
    );
}


export { AdminCuentaStackScreen };