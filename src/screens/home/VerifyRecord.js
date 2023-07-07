import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { ROUTES, COLORS } from '../../constants';
import Button from '../../components/Button';
import InnerButton from '../../components/InnerButton';

import { FlatList } from 'react-native-gesture-handler';
import CanastillaIcon from '../../assets/images/icon_canastilla_home.svg'
import BulbosIcon from '../../assets/images/icon_bulbos_home.svg'
import { VerificationContext } from '../../context/VerificationContext';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message'

const VerifyRecord = ({ navigation, route }) => {
    const [data, setData] = React.useState([])
    const [windowHeight, setWindowHeight] = React.useState(Dimensions.get('window').height)
    const { fetchCanastillas, listCanastillas, isLoading, dataToVerifyOffline } = useContext(VerificationContext)
    
    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            fetchCanastillas()
        });
        return focusHandler;
    }, [navigation])

    const addItemToTable = (item) => {
        const filtredData = data.filter(code => code.codigo == item);
        const filtredData2 = listCanastillas.filter(code => code.codigo == item);
        if (filtredData.length || filtredData2.length){
            Toast.show({
                type: 'error',
                text1: 'Escanear Codigo',
                text2: `Codigo ${item} ya se encuentra registrado`,
                autoHide: true,
                visibilityTime: 5000,
                position: 'bottom'
            })
            return 
        }
        setData(data => [...data, {
            codigo: item,
            status: 'Por Verificar',
        }]);
    }

    const showDetails = (product) => {
        let alertMessage = `----------------------------------------------\n`
        alertMessage += `Cantidad de canastillas: ${product.cantidad}\n`
        alertMessage += `Cantidad de bulbos: ${product.bulbos}\n`
        alertMessage += `Total de bulbos: ${product.bulbos * product.cantidad}\n`
        alertMessage += `Bodega: ${product.bodega.name}\n`
        alertMessage += `Producto: ${product.producto_admin.name}\n`
        alertMessage += `Proveedor: ${product.proveedor.name}\n`
        alertMessage += `Tipo: ${product.categoria.name}\n`
        alertMessage += `Variedad: ${product.variedad.name}\n`
        alertMessage += `Color: ${product.color.name}\n`
        Alert.alert(
            'Detalles de la Canastilla',
            alertMessage,
            [
                {
                    text: 'OK',                    
                },
            ],
        );
    }

    const formatDataTable = () => {
        const canastillas = listCanastillas.map((c) => { 
            return {...c, status: 'Verificado' }
            
        })

        const offline = dataToVerifyOffline.map((code) => {
            return {
                codigo: code,
                status: 'Por Verificar'
            }
        })

        return offline.concat(canastillas)
    }

    const renderRow = (item) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5, borderBottomWidth: 1, alignItems: 'center' }} key={item.index}>
                <View style={{ width: 120 }}>
                    <Text style={{ fontSize: 12, textAlign: 'center', color: COLORS.dark, fontFamily: 'Raleway-Regular' }}>
                        {item.item.codigo}
                    </Text>
                </View>
                <View style={{ width: 100 }}>
                    <Text style={{ fontSize: 12, color: COLORS.dark, fontFamily: 'Raleway-Regular', textAlign: 'center' }}>
                        {item.item.status}
                    </Text>
                </View>
                {item.item.status == 'Por Verificar' ? (
                    <></>
                ) : (
                    <View style={{ width: 100 }}>
                        <InnerButton 
                            icon="eye" 
                            onPress={() => { 
                                showDetails(item.item)
                            }} 
                            type="info" />
                    </View>
                )}
            </View>
        )
    }

    const Table = () => {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ width: '100%' }}>
                    <View style={{ flexDirection: 'row', paddingBottom: 5, borderBottomWidth: 1 }}>
                        <View style={{ width: 120 }}>
                            <Text style={{ fontSize: 13, textAlign: 'center', color: COLORS.dark, textAlign: 'center', fontFamily: 'Roboto-Medium' }}>
                                CODIGO
                            </Text>
                        </View>
                        <View style={{ width: 100 }}>
                            <Text style={{ fontSize: 13, color: COLORS.dark, textAlign: 'center', fontFamily: 'Roboto-Medium' }}>
                                ESTADO
                            </Text>
                        </View>
                        <View style={{ width: 70 }}>
                            <Text style={{ fontSize: 13, color: COLORS.dark, textAlign: 'center', fontFamily: 'Roboto-Medium' }}>
                                ACCIONES
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', height: windowHeight / 3 }}>
                    <FlatList
                        data={formatDataTable()}
                        scrollEnabled={true}
                        renderItem={renderRow}
                        keyExtractor={(item) => `key-${item.codigo}`}
                    >
                    </FlatList>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={[styles.mainContainer,]}>
            <Spinner visible={isLoading} />
            <Button
                title="Verificar Registro"
                onPress={() => navigation.navigate(ROUTES.SCAN_QR, { origin: ROUTES.VERIFY_RECORD })}
                icon='scan-qr-icon'
            />
            <View contentInsetAdjustmentBehavior='automatic' style={{ width: '100%' }}>
                <View style={styles.row}>
                    <View style={styles.canastillaIcon}>
                        <CanastillaIcon width={50} height={50} fill="#fff" />
                    </View>
                    <View style={styles.col}>
                        <Text style={styles.h1}>CANASTILLAS</Text>
                        <Text style={styles.h4}>TOTAL: 1000</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ color: COLORS.bulbos, fontSize: 12, fontFamily: 'Raleway-Regular' }}>Verificados 1000</Text>
                            <Text style={{ color: COLORS.dark, fontSize: 12, marginHorizontal: 8 }}>|</Text>
                            <Text style={{ color: COLORS.danger, fontSize: 12, fontFamily: 'Raleway-Regular' }}>Sin Verificar 1000</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.bulboIcon}>
                        <BulbosIcon width={50} height={50} fill="#fff" />
                    </View>
                    <View style={styles.col}>
                        <Text style={styles.h1}>BULBOS</Text>
                        <Text style={styles.h4}>TOTAL: 1000</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ color: COLORS.bulbos, fontSize: 12, fontFamily: 'Raleway-Regular' }}>Verificados 1000</Text>
                            <Text style={{ color: COLORS.dark, fontSize: 12, marginHorizontal: 8 }}>|</Text>
                            <Text style={{ color: COLORS.danger, fontSize: 12, fontFamily: 'Raleway-Regular' }}>Sin Verificar 1000</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <Table />
                </View>                
            </View>
        </SafeAreaView>
    );
};

export default VerifyRecord;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.grayLight,
        color: '#666',
        padding: 15,
    },
    row: {
        backgroundColor: COLORS.white,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: "100%",
        borderRadius: 20,
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    innerRow: {
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },

    col: {
        flexDirection: 'column',
        paddingHorizontal: 10,
    },
    h1: {
        fontSize: 24,
        color: COLORS.dark,
        opacity: 0.9,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Medium'
    },
    h2: {
        fontSize: 18,
        color: COLORS.gray,
        opacity: 0.9,
        fontFamily: 'Roboto-Medium'
    },
    h3: {
        fontSize: 16,
        color: COLORS.primary,
        opacity: 0.9,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Medium'
    },
    h4: {
        fontSize: 14,
        color: COLORS.dark,
        opacity: 0.9,
        // fontWeight: 'bold',
        fontFamily: 'Roboto-Medium'
    },
    p: {
        fontSize: 13,
        color: COLORS.gray,
        opacity: 0.9,
        fontFamily: 'Roboto-Medium'
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
    },
    bold: {
        fontWeight: 'bold'
    },
    col25: {
        width: '25%'
    },
    col50: {
        width: '50%'
    },
    canastillaIcon: {
        backgroundColor: COLORS.canastillas,
        width: 70, height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    bulboIcon: {
        backgroundColor: COLORS.bulbos,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    }
})
