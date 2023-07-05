import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { ROUTES, COLORS } from '../../constants';
import Button from '../../components/Button';
import InnerButton from '../../components/InnerButton';

import UserImage from '../../assets/user.jpg'
import Logo from '../../assets/images/logo.svg';
import Graphic from '../../assets/images/graphic.png'
import { FlatList } from 'react-native-gesture-handler';
import CanastillaIcon from '../../assets/images/icon_canastilla_home.svg'
import BulbosIcon from '../../assets/images/icon_bulbos_home.svg'



const VerifyRecord = ({ navigation, route }) => {
    const [data, setData] = React.useState([])
    const [windowHeight, setWindowHeight] = React.useState(Dimensions.get('window').height)

    React.useEffect(() => {
        const { code } = route.params;
        (code) ? addItemToTable(code) : {}        
        setWindowHeight(Dimensions.get('window').height)    
        return () => {
            navigation.setParams({ code: null})
        }
    }, [route.params.code])

    const addItemToTable = (item) => {
        setData(data => [...data, {
            id: data.length + 1,
            name: item
        }]);
    }

    const renderRow = (item) => {                           
        return (
            <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5, borderBottomWidth: 1 }}>
                <View style={{ width: 50 }}>
                    <Text style={{ fontSize: 12, textAlign: 'center', color: COLORS.dark, fontFamily: 'Raleway-Regular' }}>
                        {item.item.id}
                    </Text>
                </View>
                <View>
                    <Text style={{ fontSize: 12, color: COLORS.dark, fontFamily: 'Raleway-Regular' }}>
                        {item.item.name}
                    </Text>
                </View>
            </View>
        )
    }

    const Table = () => {
        return (
            <View style={{ flex: 1, flexDirection:'column' }}>
                <View style={{ width: '100%' }}>
                    <View style={{ flexDirection: 'row', paddingBottom: 5, borderBottomWidth: 1}}>
                        <View style={{ width: 100 }}>
                            <Text style={{ fontSize: 13, textAlign: 'center', color: COLORS.dark, textAlign: 'center', fontFamily: 'Raleway-SemiBold' }}>
                                BODEGA
                            </Text>
                        </View>
                        <View style={{ width: 100 }}>
                            <Text style={{ fontSize: 13, color: COLORS.dark, textAlign: 'center', fontFamily: 'Raleway-SemiBold'  }}>
                                CANASTILLA
                            </Text>
                        </View>
                        <View style={{ width: 100 }}>
                            <Text style={{ fontSize: 13, color: COLORS.dark, textAlign: 'center', fontFamily: 'Raleway-SemiBold'  }}>
                                BULBOS
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', height: windowHeight / 3}}>
                    <FlatList
                        data={data}
                        scrollEnabled={true}
                        renderItem={renderRow}
                        keyExtractor={(item) => `key-${item.id}`}
                    >
                    </FlatList>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={[styles.mainContainer,]}>
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
        fontFamily: 'Raleway-SemiBold'
    },
    h2: {
        fontSize: 18,
        color: COLORS.gray,
        opacity: 0.9,
        fontFamily: 'Raleway-SemiBold'
    },
    h3: {
        fontSize: 16,
        color: COLORS.primary,
        opacity: 0.9,
        fontWeight: 'bold',
        fontFamily: 'Raleway-SemiBold'
    },
    h4: {
        fontSize: 14,
        color: COLORS.dark,
        opacity: 0.9,
        // fontWeight: 'bold',
        fontFamily: 'Raleway-SemiBold'
    },
    p: {
        fontSize: 13,
        color: COLORS.gray,
        opacity: 0.9,
        fontFamily: 'Raleway-SemiBold'
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
});
