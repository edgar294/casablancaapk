import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Platform, TouchableOpacity, View, Text } from 'react-native';
import { COLORS, ROUTES } from '../constants';
import { CreateRecord, VerifyRecord, ReportOutput, Dashboard } from '../screens';
import BottomTabNavigator from './BottomTabNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawer from '../components/CustomDrawer';

import HorizontalLogo from '../assets/images/logo_horizontal.svg';
import BtnLogout from '../assets/images/LOGO.svg'
import { AuthContext } from '../context/AuthContext';
import { VerificationProvider } from '../context/VerificationContext';
import BtnHome from '../assets/images/btn_home.svg';
import BtnPerfil from '../assets/images/btn_perfil.svg';
import BtnIngresos from '../assets/images/btn_ingresos.svg';
import BtnVerificacion from '../assets/images/btn_verificacion.svg';
import BtnSalidas from '../assets/images/btn_salidas.svg';

const Drawer = createDrawerNavigator();

function DrawerNavigator({ navigation }) {
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
                    name={ROUTES.HOME + 'd'}
                    component={BottomTabNavigator}
                    options={{
                        title: 'Inicip',
                        drawerIcon: ({ focused, color, size }) => (
                            <BtnHome width={18} height={18} style={styles.mr7} fill={(focused) ? COLORS.secondary : '#000'}/>
                        ),
                    }}
                />

                <Drawer.Screen
                    name={ROUTES.PROFILE + 'd'}
                    component={BottomTabNavigator}
                    options={{
                        title: 'Perfil',
                        drawerIcon: ({ focused, color, size }) => (
                            <BtnPerfil width={18} height={18} style={styles.mr7} fill={(focused) ? COLORS.secondary : '#000'}/>
                        ),
                    }}
                />

                <Drawer.Screen
                    name={ROUTES.CREATE_RECORD + 'd'}
                    component={BottomTabNavigator}
                    options={{
                        title: 'Ingresos',
                        headerShown: true,
                        drawerIcon: ({ focused, color, size }) => (
                            <BtnIngresos width={18} height={18} style={styles.mr7} fill={(focused) ? COLORS.secondary : '#000'}/>
                        ),
                    }}
                />

                <Drawer.Screen
                    name={ROUTES.VERIFY_RECORD + 'd'}
                    component={BottomTabNavigator}
                    options={{
                        title: 'Verificar Ingresos',
                        headerShown: true,
                        drawerIcon: ({ focused, color, size }) => (
                            <BtnVerificacion width={18} height={18} style={styles.mr7} fill={(focused) ? COLORS.secondary : '#000'}/>
                        ),
                    }}
                />

                <Drawer.Screen
                    name={ROUTES.REPORT_OUTPUT + 'd'}
                    component={BottomTabNavigator}
                    options={{
                        title: 'Reportar Salidas',
                        headerShown: true,
                        drawerIcon: ({ focused, color, size }) => (
                            <BtnSalidas width={18} height={18} style={styles.mr7} fill={(focused) ? COLORS.secondary : '#000'}/>
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