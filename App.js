import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './src/navigations/AuthNavigator';
import { AuthProvider } from './src/context/AuthContext';
import Toast from 'react-native-toast-message';

export default function App() {

    return (
        <NavigationContainer>
            <AuthProvider>
                <AuthNavigator />
                <Toast />
            </AuthProvider>
        </NavigationContainer>
    );
}