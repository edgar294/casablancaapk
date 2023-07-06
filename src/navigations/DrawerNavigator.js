import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Platform, TouchableOpacity, View } from 'react-native';
import { COLORS, ROUTES } from '../constants';
import { CreateRecord, VerifyRecord, ReportOutput, Dashboard } from '../screens';
import BottomTabNavigator from './BottomTabNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawer from '../components/CustomDrawer';

import HorizontalLogo from '../assets/images/logo_horizontal.svg';
import BtnLogout from '../assets/images/LOGO.svg'
import { AuthContext } from '../context/AuthContext';
import { VerificationProvider } from '../context/VerificationContext';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    const logout = useContext(AuthContext)

    return (
        <VerificationProvider>
            <Drawer.Navigator
                drawerContent={props => <CustomDrawer {...props} />}
                screenOptions={{
                    headerShown: false,
                    drawerActiveBackgroundColor: COLORS.primary,
                    drawerActiveTintColor: COLORS.white,
                    drawerLabelStyle: {
                        marginLeft: -20,
                    }              
                }}>
                <Drawer.Screen
                    name={ROUTES.DASHBOARD}
                    component={BottomTabNavigator}
                    options={{
                        title: 'Home',                    
                        drawerIcon: ({ focused, color, size }) => (
                            <Icon name="home-sharp" size={18} color={color} />
                        ),
                    }}
                />

                <Drawer.Screen
                    name={ROUTES.PROFILE}
                    component={BottomTabNavigator}
                    options={{
                        title: 'Profile',                    
                        drawerIcon: ({ focused, color, size }) => (
                            <Icon name="home-sharp" size={18} color={color} />
                        ),
                    }}
                />

                <Drawer.Screen
                    name={ROUTES.CREATE_RECORD}
                    component={CreateRecord}
                    options={{
                        title: 'Crear Ingreso',
                        headerShown: true,
                        drawerIcon: ({ focused, color, size }) => (
                            <Icon name="wallet" size={18} color={color} />
                        ),
                    }}
                />

                <Drawer.Screen
                    name={ROUTES.VERIFY_RECORD}
                    component={VerifyRecord}
                    options={{
                        title: 'Verificar Ingreso',
                        headerShown: true,
                        drawerIcon: ({ focused, color, size }) => (
                            <Icon name="notifications" size={18} color={color} />
                        ),
                    }}
                />

                <Drawer.Screen
                    name={ROUTES.REPORT_OUTPUT}
                    component={ReportOutput}
                    options={{
                        title: 'Reportar Salida',
                        headerShown: true,
                        drawerIcon: ({ focused, color, size }) => (
                            <Icon name="notifications" size={18} color={color} />
                        ),
                    }}
                />
            </Drawer.Navigator>
        </VerificationProvider>
    );
}

export default DrawerNavigator;

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        backgroundColor: COLORS.transparent,
        borderTopWidth: 0,
        bottom: 0,
        right: 10,
        left: 10,
        height: 92,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    BtnLogout: {
        position: 'absolute',
        right: 10
    }
});