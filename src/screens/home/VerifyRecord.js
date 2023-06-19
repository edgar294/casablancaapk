import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { ROUTES, COLORS } from '../../constants';
import Button from '../../components/Button';
import InnerButton from '../../components/InnerButton';

import UserImage from '../../assets/user.jpg'
import Logo from '../../assets/images/logo.svg';
import Graphic from '../../assets/images/graphic.png'
import { FlatList } from 'react-native-gesture-handler';


const VerifyRecord = ({ navigation, route }) => {
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        const { code } = route.params;
        (code) ? addItemToTable(code) : {}
        return () => {
        }
    }, [route.params])

    const addItemToTable = (item) => {
        setData(data => [...data, {
            id: data.length + 2,
            name: item
        }]);
    }

    const renderRow = (item) => {
        console.log(item.item.name)
        return (
            <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5, borderBottomWidth: 1 }}>
                <View style={{ width: 50 }}>
                    <Text style={{ fontSize: 16, textAlign: 'center', color: COLORS.dark }}>
                        {item.item.id}
                    </Text>
                </View>
                <View>
                    <Text style={{ fontSize: 16, color: COLORS.dark }}>
                        {item.item.name}
                    </Text>
                </View>
            </View>
        )
    }

    const Table = () => {
        return (
            <View style={{ width: '100%' }}>
                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5, borderBottomWidth: 1 }}>
                    <View style={{ width: 100 }}>
                        <Text style={{ fontSize: 16, textAlign: 'center', color: COLORS.dark, textAlign: 'center' }}>
                            BODEGA
                        </Text>
                    </View>
                    <View style={{ width: 100 }}>
                        <Text style={{ fontSize: 16, color: COLORS.dark, textAlign: 'center'  }}>
                            CANASTILLA
                        </Text>
                    </View>
                    <View style={{ width: 100 }}>
                        <Text style={{ fontSize: 16, color: COLORS.dark, textAlign: 'center'  }}>
                            BULBOS
                        </Text>
                    </View>
                </View>
                <FlatList
                    data={data}
                    renderItem={renderRow}
                    keyExtractor={(item) => `key-${item.id}`}
                >
                </FlatList>
            </View>
        )
    }
    return (
        <SafeAreaView style={[styles.mainContainer,]}>
            <Button
                title="Verificar Registro"
                onPress={() => navigation.navigate(ROUTES.SCAN_QR, { origin: ROUTES.VERIFY_RECORD })}
            />
            <ScrollView contentInsetAdjustmentBehavior='automatic' style={{ width: '100%' }}>
                <View style={styles.row}>
                    <Logo width={60} height={60} />
                    <View style={styles.col}>
                        <Text style={styles.h1}>CANASTILLAS</Text>
                        <Text style={styles.h4}>TOTAL: 1000</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ color: COLORS.secondary }}>Verificados 1000</Text>
                            <Text style={{ color: COLORS.dark, marginHorizontal: 8 }}>|</Text>
                            <Text style={{ color: COLORS.danger }}>Sin Verificar 1000</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <Logo width={60} height={60} />
                    <View style={styles.col}>
                        <Text style={styles.h1}>BULBOS</Text>
                        <Text style={styles.h4}>TOTAL: 1000</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ color: COLORS.secondary }}>Verificados 1000</Text>
                            <Text style={{ color: COLORS.dark, marginHorizontal: 8 }}>|</Text>
                            <Text style={{ color: COLORS.danger }}>Sin Verificar 1000</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <Table />
                </View>
                <View style={{ marginBottom: 90 }}></View>
            </ScrollView>
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
    h4: {
        fontSize: 20,
        color: COLORS.dark,
        opacity: 0.9,
        // fontWeight: 'bold',
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
    },
    col25: {
        width: '25%'
    },
    col50: {
        width: '50%'
    },
});
