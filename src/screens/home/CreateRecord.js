import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { ROUTES, COLORS } from '../../constants';
import Button from '../../components/Button';
import InnerButton from '../../components/InnerButton';

import Logo from '../../assets/images/logo.svg';
import CanastillaIcon from '../../assets/images/icon_canastilla_home.svg'

const Home = ({ navigation }) => {
    const validate = () => {
        console.log('Hello world')
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Button
                title="Crear Registro"
                onPress={() => navigation.navigate(ROUTES.CREATE_RECORD_FORM)}
                icon='file-icon'
            />
            <ScrollView contentInsetAdjustmentBehavior='automatic'>
                <View style={styles.row}>
                    <View style={styles.canastillaIcon}>
                        <CanastillaIcon width={50} height={50} fill="#fff" />
                    </View>
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
                            <InnerButton title="Eliminar" onPress={validate} type="outline-danger" />
                            <InnerButton icon="scan-qr-icon" onPress={validate} type="info" />
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.canastillaIcon}>
                        <CanastillaIcon width={50} height={50} fill="#fff" />
                    </View>
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
                            <InnerButton title="Eliminar" onPress={validate} type="outline-danger" />
                            <InnerButton icon="scan-qr-icon" onPress={validate} type="info" />
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.canastillaIcon}>
                        <CanastillaIcon width={50} height={50} fill="#fff" />
                    </View>
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
                            <InnerButton title="Eliminar" onPress={validate} type="outline-danger" />
                            <InnerButton icon="scan-qr-icon" onPress={validate} type="info" />
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.canastillaIcon}>
                        <CanastillaIcon width={50} height={50} fill="#fff" />
                    </View>
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
                            <InnerButton title="Eliminar" onPress={validate} type="outline-danger" />
                            <InnerButton icon="scan-qr-icon" onPress={validate} type="info" />
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.canastillaIcon}>
                        <CanastillaIcon width={50} height={50} fill="#fff" />
                    </View>
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
                            <InnerButton title="Eliminar" onPress={validate} type="outline-danger" />
                            <InnerButton icon="scan-qr-icon" onPress={validate} type="info" />
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: 90 }}></View>
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
