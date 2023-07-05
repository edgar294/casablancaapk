import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { ROUTES, COLORS } from '../../constants';
import Button from '../../components/Button';
import InnerButton from '../../components/InnerButton';

import { FlatList } from 'react-native-gesture-handler';
import Logo from '../../assets/images/logo.svg';
import CanastillaIcon from '../../assets/images/icon_canastilla_home.svg'
import { VerificationContext } from '../../context/VerificationContext';
import { color } from 'react-native-reanimated';
import { Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const CreateRecord = ({ navigation, route }) => {
    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            fetchProducts()
        });

        return focusHandler;
    }, [navigation])

    const { products, fetchProducts, selectProduct, deleteRegister, isLoading } = useContext(VerificationContext)

    const deleteProduct = (product) => {
        console.log(product)
        let alertMessage = `¿Esta seguro de eliminar este producto?\n\n`
        alertMessage += `Detalles:\n`
        alertMessage += `----------------------------------------------\n`
        alertMessage += `Cantidad de canastillas: ${product.cantidad}\n`
        alertMessage += `Cantidad de bulbos: ${product.bulbos}\n`
        alertMessage += `Total de bulbos: ${product.bulbos * product.cantidad}\n`
        alertMessage += `Bodega: ${product.bodega}\n`
        alertMessage += `Producto: ${product.producto}\n`
        alertMessage += `Proveedor: ${product.proveedor}\n`
        alertMessage += `Tipo: ${product.categoria}\n`
        alertMessage += `Variedad: ${product.variedad}\n`
        alertMessage += `Color: ${product.color}\n`
        Alert.alert(
            'Borrar Producto',
            alertMessage,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => deleteRegister(product.id),
                    style: 'default'
                },
            ],
        );
    }

    const editProduct = (product) => {
        selectProduct(product)
        navigation.navigate(ROUTES.CREATE_RECORD_FORM)
    }

    const renderProduct = (product) => {
        return (
            <View style={styles.row} key={product.item.id}>
                <View style={styles.canastillaIcon}>
                    <CanastillaIcon width={50} height={50} fill="#fff" />
                </View>
                <View style={styles.col}>
                    <Text style={styles.p}>
                        <Text style={styles.bold}>Cantidad de Canastillas: </Text>
                        {product.item.cantidad}
                    </Text>
                    <Text style={styles.p}>
                        <Text style={styles.bold}>Total Bulbos: </Text>
                        {product.item.cantidad * product.item.bulbos}
                    </Text>
                    <Text style={styles.p}>
                        <Text style={styles.bold}>Bodega: </Text>
                        {product.item.bodega}
                    </Text>
                    <View style={styles.innerRow}>
                        <InnerButton
                            title="Editar"
                            onPress={() => {
                                editProduct(product.item)
                            }}
                            type="outline-warning" />
                        <InnerButton title="Eliminar"
                            onPress={() => {
                                deleteProduct(product.item)
                            }}
                            type="outline-danger" />
                        <InnerButton icon="scan-qr-icon" onPress={() => { }} type="info" />
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Spinner visible={isLoading} />
            <Button
                title="Crear Registro"
                onPress={() => {
                    selectProduct(null)
                    navigation.navigate(ROUTES.CREATE_RECORD_FORM)
                }}
                icon='file-icon'
            />
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => `key-${item.id}`}
            >
            </FlatList>
            <View style={{ marginBottom: 90 }}></View>
        </SafeAreaView>
    );
};

export default CreateRecord;

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
        paddingVertical: 8,
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
        marginVertical: 0
    },

    col: {
        flexDirection: 'column',
        paddingHorizontal: 10,
    },
    h1: {
        fontSize: 20,
        color: COLORS.primary,
        opacity: 0.9,
        fontWeight: 'bold',
        fontFamily: 'Raleway-SemiBold'
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
        fontFamily: 'Raleway-SemiBold'
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
    },
    bold: {
        fontWeight: 'bold',
        fontFamily: 'Raleway-SemiBold'
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
});
