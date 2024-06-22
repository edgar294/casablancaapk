import { StyleSheet, View, ScrollView, Dimensions, Text } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import { COLORS, ROUTES } from '../../constants';

import Button from '../../components/Button';
import { VerificationContext } from '../../context/VerificationContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { playSoundNotification } from '../../services/utils';
import Input from '../../components/Input';

const ScanQR = ({ navigation, route }) => {
    const [origin, setOrigin] = useState(ROUTES.HOME);
    const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height)
    const [code, setCode] = useState('')
    const inputRef = useRef(null);

    React.useEffect(() => {
        const { origin } = route.params;
        setWindowHeight(Dimensions.get('window').height)
        setOrigin(origin)
        return () => {
        }
    }, [route.params])

    const { verifyCode, markAsOut, isLoading, dataToVerifyOffline, dataMarkAsOutOffline } = useContext(VerificationContext)

    const handleOnSubmitEditing = () => {
        if (!code) return 
        setCode('')
        playSoundNotification()
        if (origin == ROUTES.VERIFY_RECORD) {
            verifyCode(code)
        } else if (origin == ROUTES.REPORT_OUTPUT) {
            markAsOut(code)
        }
    };
    
    const mostrarCodigos = () => {
        let codes = []
        if (origin == ROUTES.VERIFY_RECORD) {
            codes = dataToVerifyOffline.map(el => el).reverse()
        } else if (origin == ROUTES.REPORT_OUTPUT) {
            codes = dataMarkAsOutOffline.map(el => el).reverse()
        }        
        return codes.map((codigo, index) => (
            <Text style={{color: 'black', marginBottom: 15}} key={codigo}>
                {codes.length - index}.- Codigo: {codigo}
            </Text>
        ));
    };

    const countCodes = () => {
        if (origin == ROUTES.VERIFY_RECORD) {
            return dataToVerifyOffline.length + " códigos por verificar"
        } else if (origin == ROUTES.REPORT_OUTPUT) {
            return dataMarkAsOutOffline.length + " códigos por reportar"
        }        
        return codes.map((codigo, index) => (
            <Text style={{color: 'black', marginBottom: 15}} key={codigo}>
                {codes.length - index}.- Código: {codigo}
            </Text>
        ));
    };

    return (
        <ScrollView contentInsetAdjustmentBehavior='automatic' style={{ marginTop: 0, height: windowHeight, paddingStart: 30, paddingEnd: 30 }}>
            <Spinner visible={isLoading} />
            <View style={{ display: 'flex', alignItems: 'center', paddingTop: 20, paddingBottom: 30 }}>
                <Input
                    autoCapitalize="characters"
                    onChangeText={text => setCode(text)}
                    label="Codigo"
                    placeholder="Codigo"
                    bordered={true}
                    value={code}
                    defaultValue={''}
                    onSubmitEditing={handleOnSubmitEditing}
                    blurOnSubmit={false}
                    styles={{ fontSize: 18, padding: 5, color: 'black' }}
                />
                <Text style={{ color: 'black', fontSize: 22 }}>
                    {countCodes()}
                </Text>
            </View>
            <ScrollView style={{ height: windowHeight / 1.9, overflow: 'scroll'}}>
                {mostrarCodigos()}
            </ScrollView>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    title="FINALIZAR"
                    type='danger'
                    onPress={() => navigation.navigate(origin)}
                />
            </View>
        </ScrollView>
    );
};

export default ScanQR;

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16,
    }

});
