import React from "react";
import { ActivityIndicator, StyleSheet, View, SafeAreaView } from "react-native";
import { COLORS } from "../../constants";
import Logo from '../../assets/images/logo.svg';

const SplashScreen = () => {
    return (
        <>
            <SafeAreaView style={styles.main}>             
            <View style={styles.container}>
                <View style={styles.wFull}>
                    <View style={styles.row}>
                        <Logo width={280} height={170} style={[styles.mr7, { color: COLORS.black}]} fill="#000"/>
                    </View>

                    <ActivityIndicator size='large' color={COLORS.primary} />
                </View>
            </View>
        </SafeAreaView>
        </>
    )
}

export default SplashScreen 

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
