import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { ROUTES, COLORS } from '../../constants';
import Button from '../../components/Button';
import InnerButton from '../../components/InnerButton';

import UserImage from '../../assets/user.jpg'
import Logo from '../../assets/images/logo.svg';
import Graphic from '../../assets/images/graphic.png'


const Home = ({ navigation }) => {
    const validate = () => {
        console.log('Hello world')
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Button 
                title="Crear Registro" 
                onPress={() => navigation.navigate(ROUTES.CREATE_RECORD_FORM)}
            />
            <ScrollView contentInsetAdjustmentBehavior='automatic'>
                <View style={styles.row}>
                    <Logo width={60} height={60} />
                    <View style={styles.col}>
                        <Text style={styles.p}>
                            <Text style={styles.bold}>Cantidad de Canastillas: </Text>
                            10
                        </Text>
                        <Text style={styles.p}>
                            <Text style={styles.bold}>Total Bulbos: </Text>
                            1000
                        </Text>
                        <Text style={styles.p}>
                            <Text style={styles.bold}>Bodega: </Text>
                            Principal
                        </Text>
                        <View style={styles.innerRow}>
                            <InnerButton title="Editar" onPress={validate} type="outline-warning" />
                            <InnerButton title="Eliminar" onPress={validate} type="outline-danger"/>
                            <InnerButton title="Scan" onPress={validate} type="info"/>                        
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <Logo width={60} height={60} />
                    <View style={styles.col}>
                        <Text style={styles.p}>
                            <Text style={styles.bold}>Cantidad de Canastillas: </Text>
                            10
                        </Text>
                        <Text style={styles.p}>
                            <Text style={styles.bold}>Total Bulbos: </Text>
                            1000
                        </Text>
                        <Text style={styles.p}>
                            <Text style={styles.bold}>Bodega: </Text>
                            Principal
                        </Text>
                        <View style={styles.innerRow}>
                            <InnerButton title="Editar" onPress={validate} type="outline-warning" />
                            <InnerButton title="Eliminar" onPress={validate} type="outline-danger"/>
                            <InnerButton title="Scan" onPress={validate} type="info"/>                        
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <Logo width={60} height={60} />
                    <View style={styles.col}>
                        <Text style={styles.p}>
                            <Text style={styles.bold}>Cantidad de Canastillas: </Text>
                            10
                        </Text>
                        <Text style={styles.p}>
                            <Text style={styles.bold}>Total Bulbos: </Text>
                            1000
                        </Text>
                        <Text style={styles.p}>
                            <Text style={styles.bold}>Bodega: </Text>
                            Principal
                        </Text>
                        <View style={styles.innerRow}>
                            <InnerButton title="Editar" onPress={validate} type="outline-warning" />
                            <InnerButton title="Eliminar" onPress={validate} type="outline-danger"/>
                            <InnerButton title="Scan" onPress={validate} type="info"/>                        
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <Logo width={60} height={60} />
                    <View style={styles.col}>
                        <Text style={styles.p}>
                            <Text style={styles.bold}>Cantidad de Canastillas: </Text>
                            10
                        </Text>
                        <Text style={styles.p}>
                            <Text style={styles.bold}>Total Bulbos: </Text>
                            1000
                        </Text>
                        <Text style={styles.p}>
                            <Text style={styles.bold}>Bodega: </Text>
                            Principal
                        </Text>
                        <View style={styles.innerRow}>
                            <InnerButton title="Editar" onPress={validate} type="outline-warning" />
                            <InnerButton title="Eliminar" onPress={validate} type="outline-danger"/>
                            <InnerButton title="Scan" onPress={validate} type="info"/>                        
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <Logo width={60} height={60} />
                    <View style={styles.col}>
                        <Text style={styles.p}>
                            <Text style={styles.bold}>Cantidad de Canastillas: </Text>
                            10
                        </Text>
                        <Text style={styles.p}>
                            <Text style={styles.bold}>Total Bulbos: </Text>
                            1000
                        </Text>
                        <Text style={styles.p}>
                            <Text style={styles.bold}>Bodega: </Text>
                            Principal
                        </Text>
                        <View style={styles.innerRow}>
                            <InnerButton title="Editar" onPress={validate} type="outline-warning" />
                            <InnerButton title="Eliminar" onPress={validate} type="outline-danger"/>
                            <InnerButton title="Scan" onPress={validate} type="info"/>                        
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: 90}}></View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

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
        fontWeight:'bold'
    }
});
