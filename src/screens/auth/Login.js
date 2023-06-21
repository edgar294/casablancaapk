import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, ROUTES, IMGS } from '../../constants';
import Logo from '../../assets/images/logo.svg';
import ForgotPassIcon from '../../assets/images/icon_forgot_password.svg';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import Input from '../../components/Input';

// import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';


const Login = props => {
    // const {navigation} = props;
    const navigation = useNavigation();
    const [inputs, setInputs] = React.useState({ email: '', password: '' });
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;
        if (!inputs.email) {
            handleError('Please input email', 'email');
            isValid = false;
        }
        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        }
        if (isValid) {
            login();
        }
    };

    const login = () => {
        setLoading(true);
        setTimeout(async () => {
            setLoading(false);
            // let userData = await AsyncStorage.getItem('userData');
            if (userData) {
                userData = JSON.parse(userData);
                if (
                    inputs.email == userData.email &&
                    inputs.password == userData.password
                ) {
                    navigation.navigate('HomeScreen');
                    // AsyncStorage.setItem(
                    //     'userData',
                    //     JSON.stringify({ ...userData, loggedIn: true }),
                    // );
                } else {
                    Alert.alert('Error', 'Invalid Details');
                }
            } else {
                Alert.alert('Error', 'User does not exist');
            }
        }, 3000);
    };

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.container}>
                <View style={styles.wFull}>
                    <View style={styles.row}>
                        <Logo width={280} height={170} style={[styles.mr7, { color: COLORS.black}]} fill="#000"/>
                    </View>

                    <Text style={styles.brandName}>BIENVENIDOS</Text>
                    <Text style={styles.loginContinueTxt}>Sistema de Inventarios</Text>

                    <Input
                        onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        iconName={IMGS.iconUserLogin}
                        label="Usuario"
                        placeholder="Usuario"
                        error={errors.email}
                        withBg={true}
                        icon='user-login'
                    />

                    <Input
                        onChangeText={text => handleOnchange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        iconName={IMGS.iconUserLogin}
                        label="Contrasena"
                        placeholder="Contrasena"
                        error={errors.email}
                        withBg={true}
                        icon='user-pass'
                    />
                    <Button
                        title="INGRESAR"
                        onPress={() => navigation.navigate(ROUTES.HOME)}
                    />
                    {/* <View >
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.primary]}
                            style={styles.linearGradient}
                            start={{ y: 0.0, x: 0.0 }}
                            end={{ y: 1.0, x: 0.0 }}>*/}
                            {/******************** LOGIN BUTTON *********************/}
                            {/* <TouchableOpacity
                                onPress={() => navigation.navigate(ROUTES.HOME)}
                                activeOpacity={0.7}
                                style={styles.loginBtn}>
                                <Text style={styles.loginText}>Ingresar</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>  */}
                    {/***************** FORGOT PASSWORD BUTTON *****************/}
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate(ROUTES.FORGOT_PASSWORD, {
                                userId: 'X0001',
                            })
                        }
                        style={styles.forgotPassBtn}
                        >
                        <ForgotPassIcon width={17} height={17} fill="#000"/> 
                        <Text style={styles.forgotPassText}>¿Olvidates tu contraseña?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: COLORS.white
    },
    container: {
        padding: 15,
        width: '100%',
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandName: {
        fontSize: 36,
        textAlign: 'center',        
        color: COLORS.primary,
        opacity: 0.9,
        fontFamily: 'Raleway-SemiBold'
    },
    loginContinueTxt: {
        fontSize: 18,
        textAlign: 'center',
        color: COLORS.gray,
        marginBottom: 24,        
        fontFamily: 'Raleway-SemiBold'
    },
    // Login Btn Styles
    loginBtnWrapper: {
        height: 55,
        marginTop: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    linearGradient: {
        width: '100%',
        borderRadius: 15,
    },
    loginBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 55,
    },
    loginText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: '400',
    },
    forgotPassText: {
        color: COLORS.dark,
        textAlign: 'center',
        fontWeight: 'bold',        
        marginLeft: 10
    },
    forgotPassBtn: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',        
    },
    // footer
    footer: {
        position: 'absolute',
        bottom: 20,
        textAlign: 'center',
        flexDirection: 'row',
    },
    footerText: {
        color: COLORS.gray,
        fontWeight: 'bold',
    },
    signupBtn: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    // utils
    wFull: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    mr7: {
        marginRight: 7,
    },
});
