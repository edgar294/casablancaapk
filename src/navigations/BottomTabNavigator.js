import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Platform, TouchableOpacity, View } from 'react-native';
import { COLORS, ROUTES, IMGS } from '../constants';
import { CreateRecord, VerifyRecord, ReportOutput, Dashboard } from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsNavigator from './SettingsNavigator';
import CustomTabBarButton from '../components/CustomTabBarButton';
import CustomTabBar from '../components/CustomTabBar';
import { useNavigation } from '@react-navigation/native';

import HorizontalLogo from '../assets/images/logo_horizontal.svg';
import BtnLogout from '../assets/images/LOGO.svg'
import BtnPefil from '../assets/images/LOGO.svg'
import BtnIngresos from '../assets/images/LOGO.svg'
import BtnVerificacion from '../assets/images/LOGO.svg'
import BtnSalidas from '../assets/images/LOGO.svg'

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    const navigation = useNavigation();

    return (
        <Tab.Navigator
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarInactiveTintColor: COLORS.dark,
                tabBarStyle: styles.tabBarStyle,
                tabBarActiveTintColor: COLORS.primary,
                tabBarIcon: ({ color, size, focused }) => {
                    return <BtnPefil width={25} height={25} />
                    let iconName;

                    if (route.name === ROUTES.HOME_TAB) {
                        iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
                    } else if (route.name === ROUTES.SETTINGS_NAVIGATOR) {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else if (route.name === ROUTES.WALLET) {
                        iconName = focused ? 'wallet' : 'wallet-outline';
                    } else if (route.name === ROUTES.NOTIFICATIONS) {
                        iconName = focused
                            ? 'md-notifications-sharp'
                            : 'md-notifications-outline';
                    }

                    return <Icon name={iconName} size={22} color={color} />;
                },
                header: () => {
                    return (
                        <View style={styles.header}>
                            <View>
                                <HorizontalLogo width={200} height={70} />
                            </View>
                            <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.BtnLogout} >
                                <View>
                                    <BtnLogout width={40} height={40} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                }
            })}>
            <Tab.Screen
                name={ROUTES.DASHBOARD}
                component={Dashboard}
                options={{
                    headerShown: true,
                    tabBarButton: props => <CustomTabBarButton route="home" {...props} />,
                }}
            />
            <Tab.Screen
                name={ROUTES.CREATE_RECORD}
                component={CreateRecord}
                options={{
                    headerShown: true,
                    tabBarButton: props => <CustomTabBarButton {...props} />,
                }}
            />
            <Tab.Screen
                name={ROUTES.VERIFY_RECORD}
                component={VerifyRecord}
                options={{
                    headerShown: true,
                    tabBarButton: props => <CustomTabBarButton {...props} />,
                }}
            />
            <Tab.Screen
                name={ROUTES.REPORT_OUTPUT}
                component={ReportOutput}
                options={{
                    headerShown: true,
                    tabBarButton: props => (
                        <CustomTabBarButton route="settings" {...props} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        backgroundColor: COLORS.grayLight,
        borderTopWidth: 1,
        bottom: 0,
        // right: 10,
        // left: 10,
        height: 92,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white

    },
    BtnLogout: {
        position: 'absolute',
        right: 10
    }
});
