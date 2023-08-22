import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { COLORS, ROUTES, IMGS } from '../../constants';
import Logo from '../../assets/images/logo.svg';
import UserLoginIcon from '../../assets/images/icon_user_login.svg';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import Input from '../../components/Input';

// import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import { AuthContext } from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';


const ForgotPassword = props => {    
    const navigation = useNavigation();
    const [inputs, setInputs] = React.useState({ email: ''});
 
    const { forgotPassword, errors, isLoading } = useContext(AuthContext);

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (error, input) => {
        errors[error] = input
        // setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    return (
        <SafeAreaView style={styles.main}>
            <Spinner visible={isLoading} />
            <View style={styles.container}>
                <View style={styles.wFull}>
                    <View style={styles.row}>
                        <Logo width={280} height={170} style={[styles.mr7, { color: COLORS.black}]} fill="#000"/>
                    </View>

                    <Text style={styles.brandName}>Recuperar contraseña</Text>
                    <Text style={styles.loginContinueTxt}>Ingrese su dirección de correo electrónico y le enviaremos un enlace para restablecer su contraseña.</Text>
                    <Input
                        onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        iconName={IMGS.iconUserLogin}
                        label="Usuario"
                        placeholder="Usuario"
                        error={errors.email ?? ''}
                        withBg={true}
                        icon='user-login'
                        textContentType='emailAddress'
                        autoCapitalize='none'
                    />
                    
                    <Button
                        title="RECUPERAR CONTRASEÑA"
                        onPress={() => forgotPassword(inputs.email)}
                        // onPress={() => navigation.navigate(ROUTES.HOME)}
                    />                    
                    {/***************** FORGOT PASSWORD BUTTON *****************/}
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate(ROUTES.LOGIN)
                        }
                        style={styles.forgotPassBtn}
                        >
                        <UserLoginIcon width={17} height={17} fill="#000"/> 
                        <Text style={styles.forgotPassText}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ForgotPassword;

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
        fontFamily: 'Roboto-Medium'
    },
    loginContinueTxt: {
        fontSize: 18,
        textAlign: 'center',
        color: COLORS.gray,
        marginBottom: 24,        
        fontFamily: 'Roboto-Medium'
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
