import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    Login,
    ForgotPassword,
    Register,
    Dashboard,
    SplashScreen,
} from '../screens';
import { COLORS, ROUTES } from '../constants';
import DrawerNavigator from './DrawerNavigator';
import { AuthContext } from '../context/AuthContext';


const Stack = createStackNavigator();
// Navigator, Screen, Group

function AuthNavigator() {
    const { token, splasLoading } = useContext(AuthContext)

    return (
        <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.LOGIN}>
            {/* <Stack.Screen
                name={ROUTES.FORGOT_PASSWORD}
                component={ForgotPassword}
                options={({ route }) => ({
                    headerTintColor: COLORS.white,
                    // headerBackTitle: 'Back',
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: COLORS.primary,
                    },
                    title: route.params.userId,
                })}
            /> */}
            {splasLoading ? (
                <Stack.Screen
                    name={ROUTES.HOME}
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />

            ) : (
                <>
                    {token ?
                        (
                            <Stack.Screen
                                name={ROUTES.HOME}
                                component={DrawerNavigator}
                                options={{ headerShown: false }}
                            />
                        )
                        :
                        (
                            <>
                                <Stack.Screen
                                    name={ROUTES.LOGIN}
                                    component={Login}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name={ROUTES.FORGOT_PASSWORD}
                                    component={ForgotPassword}
                                    options={{ headerShown: false }}
                                />
                            </>
                        )}
                </>
            )}
        </Stack.Navigator>
    );
}

export default AuthNavigator;
