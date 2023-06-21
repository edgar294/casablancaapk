import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import { COLORS, ROUTES } from '../../constants';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Button from '../../components/Button';

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

    return (
        <ScrollView contentInsetAdjustmentBehavior='automatic' style={{ marginTop: 0 }}>
            <QRCodeScanner
                onRead={(data) => {
                    navigation.navigate(origin ,{code: data.data})
                }}
                flashMode={RNCamera.Constants.FlashMode.off}
                reactivate={true}
                reactivateTimeout={3000}
                showMarker={true}
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
