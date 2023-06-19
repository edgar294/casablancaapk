import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, ROUTES, IMGS } from '../../constants';
import Logo from '../../assets/images/logo.png';
import UserIcon from '../../assets/images/btn_ingresos.svg'
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import Input from '../../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
            let userData = await AsyncStorage.getItem('userData');
            if (userData) {
                userData = JSON.parse(userData);
                if (
                    inputs.email == userData.email &&
                    inputs.password == userData.password
                ) {
                    navigation.navigate('HomeScreen');
                    AsyncStorage.setItem(
                        'userData',
                        JSON.stringify({ ...userData, loggedIn: true }),
                    );
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
                        <Logo width={300} height={200} style={styles.mr7} />
                    </View>

                    <Text style={styles.brandName}>Bienvenidos</Text>
                    <Text style={styles.loginContinueTxt}>Sistema de Inventarios</Text>
                    <TextInput style={styles.input} placeholder="Password" /> 
                    {/* <View style={{ marginVertical: 20 }}>
                        <Input
                            onChangeText={text => handleOnchange(text, 'email')}
                            onFocus={() => handleError(null, 'email')}
                            iconName={IMGS.iconUserLogin}
                            label="Email"
                            placeholder="Enter your email address"
                            error={errors.email}
                        />
                        <Input
                            onChangeText={text => handleOnchange(text, 'password')}
                            onFocus={() => handleError(null, 'password')}
                            iconName={IMGS.iconUserPass}
                            label="Password"
                            placeholder="Enter your password"
                            error={errors.password}
                            password
                        />
                        <Button title="Log In" onPress={validate} />
                        <Text
                            onPress={() => navigation.navigate('RegistrationScreen')}
                            style={{
                                color: COLORS.black,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: 16,
                            }}>
                            Don't have account ?Register
                        </Text>                        
                    </View> */}

                    {/******************** LOGIN BUTTON *********************/}
                    {/* <View style={styles.loginBtnWrapper}>
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.primary]}
                            style={styles.linearGradient}
                            start={{ y: 0.0, x: 0.0 }}
                            end={{ y: 1.0, x: 0.0 }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(ROUTES.HOME)}
                                activeOpacity={0.7}
                                style={styles.loginBtn}>
                                <Text style={styles.loginText}>Ingresar</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View> */}

                    {/***************** FORGOT PASSWORD BUTTON *****************/}
                    {/* <TouchableOpacity
                        onPress={() =>
                            navigation.navigate(ROUTES.FORGOT_PASSWORD, {
                                userId: 'X0001',
                            })
                        }
                        style={styles.forgotPassBtn}>
                        <Text style={styles.forgotPassText}>¿Olvidates tu contraseña?</Text>
                    </TouchableOpacity> */}
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
        fontSize: 64,
        textAlign: 'center',
        fontWeight: 'bold',
        color: COLORS.primary,
        opacity: 0.9,
    },
    loginContinueTxt: {
        fontSize: 21,
        textAlign: 'center',
        color: COLORS.gray,
        marginBottom: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.grayLight,
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        height: 55,
        paddingVertical: 0,
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
        borderRadius: 50,
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
        fontSize: 16,
        fontWeight: '400',
    },
    forgotPassText: {
        color: COLORS.primary,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 15,
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
