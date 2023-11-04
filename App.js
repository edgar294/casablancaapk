import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './src/navigations/AuthNavigator';
import { AuthProvider } from './src/context/AuthContext';
import Toast, { ErrorToast, SuccessToast } from 'react-native-toast-message';

export default function App() {
    const toastConfig = {
        success: (props) => (
            <SuccessToast
                {...props}
                // style={styles.style}
                // contentContainerStyle={styles.contentContainerStyle}
                // text1Style={styles.text1Style}
                // text1NumberOfLines={2}
                // text2Style={styles.text2Style}
                text2NumberOfLines={2}
            />
        ),
        error: (props) => (
            <ErrorToast
                {...props}
                // style={[styles.style, styles.errorStyle]}
                // contentContainerStyle={styles.contentContainerStyle}
                // text1Style={styles.text1Style}
                // text1NumberOfLines={2}
                // text2Style={styles.text2Style}
                text2NumberOfLines={2}
            />
        ),
    };
    return (
        <NavigationContainer>
            <AuthProvider>
                <AuthNavigator />
                <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
            </AuthProvider>
        </NavigationContainer>
    );
}