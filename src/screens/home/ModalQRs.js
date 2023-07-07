import { StyleSheet, Text, View, SafeAreaView, Modal, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { ROUTES, COLORS } from '../../constants';
import QRCode from 'react-native-qrcode-svg';
import Logo from '../../assets/images/logo-qr.png'
import InnerButton from '../../components/InnerButton';
import Barcode from "react-native-barcode-builder";

const ModalQRs = ({ modalVisible, product = {}, cerrarModal = () => { } }) => {
    const [index, setIndex] = useState(0)
    const [canastillas, setCanastillas] = useState([])

    useEffect(() => {        
        if(product.canastillas) {
            setCanastillas(product.canastillas)
            setIndex(0)
        }

    }, [product])

    const prevCode = () => {
        if (index === 0) {
            const newIndex = canastillas.length - 1
            setIndex(newIndex)
        } else {
            const newIndex = index - 1
            setIndex(newIndex)
        }
        console.log(canastillas[index])
    }

    const nextCode = () => {
        if (index === canastillas.length - 1) {
            const newIndex = 0
            setIndex(newIndex)
        } else {
            const newIndex = index + 1
            setIndex(newIndex)
        }
    }

    return (
        <View style={{ marginBottom: 15, width: '100%' }}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
            >
                <View
                    style={{
                        // justifyContent:'center',
                        backgroundColor: COLORS.white,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        bottom: 0
                    }}
                >
                    <SafeAreaView>
                        <TouchableOpacity style={styles.closeButton} onPress={cerrarModal}>
                            <Text style={{ color: COLORS.white }}>Cerrar</Text>
                        </TouchableOpacity>
                        <Text style={[styles.h1, { marginTop: 20, marginBottom: 10, textAlign: 'center' }]}>
                            Codigo: {canastillas[index]?.codigo}
                        </Text>
                        <View style={{ alignItems: 'center' }}>
                            {canastillas.length ? (
                                <>
                                    <QRCode
                                        value={canastillas[index].codigo}
                                        size={220}
                                        logo={Logo}
                                    />
                                    </>
                            ) :
                                <></>
                            }

                        </View>
                        <View style={{ width:"80%", alignSelf: 'center', backgroundColor: COLORS.grayLight, paddingHorizontal: 10, borderRadius: 15, marginTop: 20}}>
                            <Text style={[styles.h1, { marginVertical: 10, textAlign: 'center' }]}>
                                Información de la Canastilla
                            </Text>
                            <Text style={[styles.h2, { marginVertical: 5, fontSize: 15}]}>
                                Variedad: {product.variedad}
                            </Text>
                            <Text style={[styles.h2, { marginVertical: 5, fontSize: 15}]}>
                                Calibre: {product.calibre}
                            </Text>
                            <Text style={[styles.h2, { marginVertical: 5, fontSize: 15}]}>
                                Contenedor: {product.contenedor}
                            </Text>
                            <Text style={[styles.h2, { marginVertical: 5, fontSize: 15}]}>
                                Lote: {product.lote}
                            </Text>
                            <Text style={[styles.h2, { marginVertical: 5, fontSize: 15}]}>
                                Proveedor: {product.proveedor}
                            </Text>
                            <Text style={[styles.h2, { marginVertical: 5, fontSize: 15}]}>
                                Fcha de Verificación: {canastillas[index]?.fecha_verificacion}
                            </Text>
                            <Text style={[styles.h2, { marginVertical: 5, fontSize: 15}]}>
                                Fcha de Salida: {canastillas[index]?.fecha_salida}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10, alignItems: 'center' }}>
                            <InnerButton
                                title="Anterior"
                                onPress={prevCode}
                                icon='file-icon'
                                fit={true}
                            />
                            <Text style={{ color: COLORS.primary, textAlign: 'center', marginHorizontal: 20 }}>
                                Canastilla {index + 1 } / {canastillas.length}
                            </Text>
                            <InnerButton
                                title="Siguiente"
                                onPress={nextCode}
                                icon='file-icon'
                            />
                        </View>
                    </SafeAreaView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    closeButton: {
        height: 25,
        backgroundColor: COLORS.danger,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    h1: {
        fontSize: 20,
        color: COLORS.primary,
        opacity: 0.9,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Medium'
    },
    h2: {
        fontSize: 18,
        color: COLORS.gray,
        opacity: 0.9,
    },
    h3: {
        fontSize: 16,
        color: COLORS.primary,
        opacity: 0.9,
        fontWeight: 'bold',
    },
    p: {
        fontSize: 11,
        color: COLORS.gray,
        opacity: 0.9,
        marginTop: -4,
        fontFamily: 'Roboto-Medium'
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
    },
    bold: {
        fontWeight: 'bold',
        fontFamily: 'Roboto-Medium'
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
    },
});

export default ModalQRs;
