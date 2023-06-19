import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Settings, SettingsDetail, CreateRecordForm } from '../screens';
import { ROUTES } from '../constants';

const Stack = createStackNavigator();

function SettingsNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={ROUTES.LOGIN}>
            <Stack.Screen name={ROUTES.SETTINGS} component={Settings} />
            <Stack.Screen name={ROUTES.SETTINGS_DETAIL} component={SettingsDetail} />
            <Stack.Screen name={ROUTES.CREATE_RECORD_FORM} component={CreateRecordForm} />
        </Stack.Navigator>
    );
}

export default SettingsNavigator;
