import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants';
import Button from '../../components/Button';
import CustomPicker from '../../components/CustomPicker';
import Counter from '../../components/Counter';
import Input from '../../components/Input';
import axios from 'axios';

const Home = () => {
    const [data, setData] = React.useState([]);
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

    React.useEffect(() => {
        getListPhotos();
        return () => {
        }
    }, [])

    const getListPhotos = async () => {
        try {
            const apiUrl = 'https://jsonplaceholder.typicode.com/photos?_limit=20&_page=1';
            const response = await axios.get(apiUrl);
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const validate = () => {
        console.log('Hello world')
    }

    return (
        <ScrollView contentInsetAdjustmentBehavior='automatic' style={{ width: '94%', marginLeft: '3%'}} >
            <View style={[styles.row, styles.col]}>
                <Text style={[styles.h1, { marginBottom: 20 }]}>Crear Ingreso</Text>
                <CustomPicker
                    label='Bodega o Almacen'
                    selectItem={(value) => {
                        setSelectedWarehouse(value)
                    }}
                    selected={selectedWarehouse}
                    data={data}
                    bordered={true}
                />
                <CustomPicker
                    label='Producto'
                    selectItem={(value) => {
                        setSelectedProduct(value)
                    }}
                    selected={selectedProduct}
                    data={data}
                    bordered={true}
                />
                <CustomPicker
                    label='Proveedor'
                    selectItem={(value) => {
                        setSelectedProvider(value)
                    }}
                    selected={selectedProvider}
                    data={data}
                    bordered={true}
                />
                <CustomPicker
                    label='Tipo'
                    selectItem={(value) => {
                        setSelectedType(value)
                    }}
                    selected={selectedType}
                    data={data}
                    bordered={true}
                />
                <CustomPicker
                    label='Color'
                    selectItem={(value) => {
                        setSelectedColor(value)
                    }}
                    selected={selectedColor}
                    data={data}
                    bordered={true}
                />
                <CustomPicker
                    label='Variedad'
                    selectItem={(value) => {
                        setSelectedVariety(value)
                    }}
                    selected={selectedVariety}
                    data={data}
                    bordered={true}
                />
                <Input
                    onChangeText={text => setSelectedLot(text)}
                    label="Lote"                    
                    placeholder="Lote"                    
                    bordered={true}
                />
                <CustomPicker
                    label='Calibre'
                    selectItem={(value) => {
                        setSelectedGauge(value)
                    }}
                    selected={selectedGauge}
                    data={data}
                    bordered={true}
                />
                <View style={[styles.row]}>
                    <View style={[styles.col50]}>
                        <Counter 
                            label="Cantidad de Canastillas"
                        />
                    </View>
                    <View style={[styles.col50]}>
                        <Counter 
                            label="Bulbos por Canastilla"
                        />
                    </View>
                </View>
                <Input
                    onChangeText={text => setSelectedCrop(text)}
                    label=""
                    placeholder=""
                    bordered={true}
                    withBg={true}
                />
                <Input
                    onChangeText={text => setSelectedCrop(text)}
                    label="CROP"
                    placeholder="CROP"
                    bordered={true}
                />
                <Input
                    onChangeText={text => setSelectedContainer(text)}
                    label="Contenedor"                    
                    placeholder="Contenedor"
                    bordered={true}
                />
                <Button title="Crear Registro" onPress={validate} />
            </View>
            <View style={{ marginBottom: 90 }}></View>
        </ScrollView>
    );
};

export default Home;

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
        paddingHorizontal: 10,
        width: '50%'
    },
    h1: {
        fontSize: 30,
        color: COLORS.primary,
        opacity: 0.9,
        fontWeight: 'bold',
    },
    h2: {
        fontSize: 26,
        color: COLORS.gray,
        opacity: 0.9,
    },
    h3: {
        fontSize: 20,
        color: COLORS.primary,
        opacity: 0.9,
        fontWeight: 'bold',
    },
    p: {
        fontSize: 16,
        color: COLORS.gray,
        opacity: 0.9,
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
