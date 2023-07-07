import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { COLORS } from '../../constants';
import Button from '../../components/Button';
import CustomPicker from '../../components/CustomPicker';
import CustomPicker2 from '../../components/CustomPicker2';
import Counter from '../../components/Counter';
import Input from '../../components/Input';
import axios from 'axios';
import { VerificationContext } from '../../context/VerificationContext';
import Spinner from 'react-native-loading-spinner-overlay';

const CreateRecordForm = ({ navigation, route }) => {
    const [selectedId, setSelectedId] = React.useState(null);
    const [selectedWarehouse, setSelectedWarehouse] = React.useState(null);
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [selectedProvider, setSelectedProvider] = React.useState(null);
    const [selectedType, setSelectedType] = React.useState(null);
    const [selectedColor, setSelectedColor] = React.useState(null);
    const [selectedVariety, setSelectedVariety] = React.useState(null);
    const [selectedLot, setSelectedLot] = React.useState(null);
    const [selectedGauge, setSelectedGauge] = React.useState(null);
    const [selectedCrop, setSelectedCrop] = React.useState(null);
    const [selectedContainer, setSelectedContainer] = React.useState(null);
    const [canastillas, setCanastillas] = React.useState(0);
    const [bulbos, setBulbos] = React.useState(0);
    const [totalBulbos, setTotalBulbos] = React.useState(0);

    const { bodegas,
        productos,
        proveedores,
        tipos,
        variedades,
        colores,
        calibres,
        fetctVariedades,
        fetctColores,
        createRegister,
        selected,
    } = useContext(VerificationContext)

    useEffect(() => {
        setTotalBulbos(canastillas * bulbos)
        return () => {
        }
    }, [bulbos, canastillas])

    useEffect(() => {
        showProduct()
        return () => {
        }
    }, [selected])

    const clearProduct = () => {
        setSelectedId(null)
        setSelectedWarehouse(null)
        setSelectedProduct(null)
        setSelectedProvider(null)
        setSelectedType(null)
        setSelectedColor(null)
        setSelectedVariety(null)
        setSelectedLot(null)
        setSelectedGauge(null)
        setSelectedCrop(null)
        setSelectedContainer(null)
        setCanastillas(0)
        setBulbos(0)
    }

    const showProduct = () => {
        if (selected != null) {
            setSelectedId(selected.id)
            setSelectedWarehouse(selected.bodega_id)
            setSelectedProduct(selected.producto_id)
            setSelectedProvider(selected.proveedor_id)
            setSelectedType(selected.categoria_id)
            setSelectedColor(selected.color_id)
            setSelectedVariety(selected.variedad_id)
            setSelectedLot(selected.lote)
            setSelectedGauge(selected.calibre_id)
            setSelectedCrop(selected.crop)
            setSelectedContainer(selected.contenedor)
            setCanastillas(selected.cantidad)
            setBulbos(selected.bulbos)

            fetctVariedades(selected.categoria_id)
            fetctColores(selected.variedad_id)
        } else {
            clearProduct()
        }
    }

    const sendForm = () => {
        const payload = {
            bodega_id: selectedWarehouse,
            producto_id: selectedProduct,
            proveedor_id: selectedProvider,
            categoria_id: selectedType,
            color_id: selectedColor,
            variedad_id: selectedVariety,
            lote: selectedLot,
            calibre_id: selectedGauge,
            cantidad: canastillas,
            bulbos: bulbos,
            crop: selectedCrop,
            contenedor: selectedContainer,
        }
        createRegister(payload, selectedId)
    }

    const validateOnlyNumber = (text) => {
        return text.replace(/[^0-9]/g, '')
    }

    return (
        <ScrollView contentInsetAdjustmentBehavior='automatic' style={{ width: '94%', marginLeft: '3%' }} >
            <View style={[styles.row, styles.col]}>
                <Text style={[styles.h1, { marginBottom: 20 }]}>Crear Ingreso</Text>
                <CustomPicker2
                    key='bodega'
                    label='Bodega o Almacen'
                    selectItem={(value) => {
                        setSelectedWarehouse(value)
                    }}
                    selected={selectedWarehouse}
                    data={bodegas}
                    bordered={true}
                />
                <CustomPicker2
                    key='producto'
                    label='Producto'
                    selectItem={(value) => {
                        setSelectedProduct(value)
                    }}
                    selected={selectedProduct}
                    data={productos}
                    bordered={true}
                />
                <CustomPicker2
                    key='proveedor'
                    label='Proveedor'
                    selectItem={(value) => {
                        setSelectedProvider(value)
                    }}
                    selected={selectedProvider}
                    data={proveedores}
                    bordered={true}
                />
                <CustomPicker2
                    key='tipo'
                    label='Tipo'
                    selectItem={(value) => {
                        setSelectedType(value)
                        fetctVariedades(value)
                        setSelectedVariety(null)
                        setSelectedColor(null)
                    }}
                    selected={selectedType}
                    data={tipos}
                    bordered={true}
                />
                <CustomPicker2
                    key='variedad'
                    label='Variedad'
                    selectItem={(value) => {
                        setSelectedVariety(value)
                        fetctColores(value)
                        setSelectedColor(null)
                    }}
                    selected={selectedVariety}
                    data={variedades}
                    bordered={true}
                />
                <CustomPicker2
                    key='color'
                    label='Color'
                    selectItem={(value) => {
                        setSelectedColor(value)
                    }}
                    selected={selectedColor}
                    data={colores}
                    bordered={true}
                />
                <Input
                    onChangeText={text => setSelectedLot(text)}
                    label="Lote"
                    placeholder="Lote"
                    bordered={true}
                    defaultValue={selectedLot}
                />
                <CustomPicker2
                    key='calibre'
                    label='Calibre'
                    selectItem={(value) => {
                        setSelectedGauge(value)
                    }}
                    selected={selectedGauge}
                    data={calibres}
                    bordered={true}
                />
                {selectedId == null ?
                    (<View style={[{ flexDirection: 'row' }]}>
                        <View style={[styles.col50]}>
                            <Counter
                                plus={() => {
                                    setCanastillas(Number(canastillas) + 1)
                                }}
                                minus={() => {
                                    if (canastillas > 0)
                                        setCanastillas(Number(canastillas) - 1)
                                }}
                                value={canastillas}
                                onChangeText={text => setCanastillas(validateOnlyNumber(text))}
                                label="Cantidad de Canastillas"
                            />
                        </View>
                        <View style={[styles.col50]}>
                            <Counter
                                plus={() => {
                                    setBulbos(Number(bulbos) + 1)
                                }}
                                minus={() => {
                                    if (bulbos > 0)
                                        setBulbos(Number(bulbos) - 1)
                                }}
                                value={bulbos}
                                onChangeText={text => setBulbos(validateOnlyNumber(text))}
                                label="Bulbos por Canastilla"
                            />
                        </View>
                    </View>)
                    : ''
                }

                <Input
                    label="Total de bulbos"
                    showLabel={true}
                    defaultValue={totalBulbos}
                    editable={false}
                    placeholder=""
                    value={totalBulbos}
                    bordered={true}
                    withBg={true}
                />
                <Input
                    onChangeText={text => setSelectedCrop(validateOnlyNumber(text))}
                    label="CROP"
                    placeholder="CROP"
                    bordered={true}
                    defaultValue={selectedCrop}
                    value={selectedCrop}
                    keyboardType='number-pad'
                />
                <Input
                    onChangeText={text => setSelectedContainer(validateOnlyNumber(text))}
                    value={selectedContainer}
                    label="Contenedor"
                    placeholder="Contenedor"
                    bordered={true}
                    defaultValue={selectedContainer}
                    keyboardType='number-pad'
                />
                <Button title="Crear Registro" onPress={sendForm} icon='file-icon' />
            </View>
            <View style={{ marginBottom: 90 }}></View>
        </ScrollView>
    );
};

export default CreateRecordForm;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.grayLight,
        color: '#666',
        padding: 15
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
    col50: {
        flexDirection: 'column',
        // paddingHorizontal: 10,
        width: '50%'
    },
    h1: {
        fontSize: 30,
        color: COLORS.primary,
        opacity: 0.9,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Medium'
    },
    h2: {
        fontSize: 26,
        color: COLORS.gray,
        opacity: 0.9,
        fontFamily: 'Roboto-Medium'
    },
    h3: {
        fontSize: 20,
        color: COLORS.primary,
        opacity: 0.9,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Medium'
    },
    p: {
        fontSize: 16,
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
    }
});
