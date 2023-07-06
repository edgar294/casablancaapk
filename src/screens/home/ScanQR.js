import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import React, { useContext } from 'react';
import { COLORS, ROUTES } from '../../constants';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Button from '../../components/Button';
import { VerificationContext } from '../../context/VerificationContext';
import Spinner from 'react-native-loading-spinner-overlay';

const ScanQR = ({ navigation, route }) => {
    const [origin, setOrigin] = React.useState(ROUTES.HOME);
    const [windowHeight, setWindowHeight] = React.useState(Dimensions.get('window').height)

    React.useEffect(() => {
        const { origin }= route.params;
        setWindowHeight(Dimensions.get('window').height)
        setOrigin(origin)        
        return () => {
        }
    }, [route.params])

    const { verifyCode, markAsOut, isLoading } = useContext(VerificationContext)

    const doAction = (data) => {        
        if (origin == ROUTES.VERIFY_RECORD){
            code = data.data
            verifyCode(code)
        } else if (origin == ROUTES.REPORT_OUTPUT){
            code = data.data
            markAsOut(code)
        }
    }

    return (
        <ScrollView contentInsetAdjustmentBehavior='automatic' style={{ marginTop: 0 }}>
            <Spinner visible={isLoading} />
            <QRCodeScanner
                onRead={doAction}
                flashMode={RNCamera.Constants.FlashMode.off}
                reactivate={true}
                reactivateTimeout={2000}
                showMarker={true}
                cameraProps={{}}
                cameraStyle={{ height: windowHeight - 150 }}
                cameraContainerStyle={{ height: windowHeight - 150 }}
                bottomContent={
                    <View style={{ width: '90%', position: 'absolute', bottom: 20 }}>
                        <Button
                            title="FINALIZAR"
                            type='danger'                            
                            onPress={() => navigation.navigate(origin)}
                        />
                    </View>
                }
            />
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
        padding: 16
    }

});
