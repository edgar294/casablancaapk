import React, { startTransition, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { COLORS } from '../../constants';
import Logo from '../../assets/images/logo.svg';
import UserImage from '../../assets/images/img_perfil.png'
import StatisticImage from '../../assets/images/graphic.png'
import CanastillaIcon from '../../assets/images/icon_canastilla_home.svg'
import BulbosIcon from '../../assets/images/icon_bulbos_home.svg'
import Graphic from '../../assets/images/graphic.png'
import { AuthContext } from '../../context/AuthContext';
import { VerificationContext } from '../../context/VerificationContext';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const Dashboard = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useContext(AuthContext)
    const { bulbos, canastillas, fetchCounters } = useContext(VerificationContext)

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            fetchCounters()
        });

        return focusHandler;
    }, [navigation])

    const screenWidth = Dimensions.get("window").width * 0.94;

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        backgroundGradientFromOpacity: 1,
        backgroundColor: '#fff',
        backgroundGradientToOpacity: 0.5,
        color: () => `#000`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        fillShadowGradientToOpacity: 0.1,
        useShadowColorFromDataset: 1,
        fillShadowGradientFromOpacity: 0.2
    };


    const data = {
        labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
        datasets: [
            {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                ],
                color: () => `#0000ff`, // optional
                strokeWidth: 1 // optional
            },
            {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                ],
                color: () => `#ff0000`, // optional
                strokeWidth: 1 // optional
            }

        ],
        legend: ["Salidas", "Entradas"] // optional        
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.row}>
                <Image source={UserImage} style={{ width: 80, height: 80, borderRadius: 15 }} />
                <View style={styles.col}>
                    <Text style={styles.h3}>BIENVENIDO</Text>
                    {user.id ? (
                        <>
                            <Text style={styles.p}>{user.name}</Text>
                            <Text style={styles.p}>{user.rol.name}</Text>
                        </>
                    ) : ''}

                </View>
            </View>
            <View >
                <Text>Bezier Line Chart</Text>
                <LineChart
                    data={data}
                    width={screenWidth}
                    height={200}
                    verticalLabelRotation={30}
                    chartConfig={chartConfig}
                    bezier
                    style={{ borderRadius: 20, marginBottom: 6 }}
                />
            </View>
            <View style={styles.row}>
                <View style={styles.canastillaIcon}>
                    <CanastillaIcon width={50} height={50} fill="#fff" />
                </View>
                <View style={styles.col}>
                    <Text style={styles.h1}>CANASTILLAS</Text>
                    <Text style={styles.h2}>TOTAL: {canastillas}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.bulboIcon}>
                    <BulbosIcon width={50} height={50} fill="#fff" />
                </View>
                <View style={styles.col}>
                    <Text style={styles.h1}>BULBOS</Text>
                    <Text style={styles.h2}>TOTAL: {bulbos}</Text>
                </View>
            </View>
        </View>
    );
};

export default Dashboard;

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
        marginVertical: 6
    },
    col: {
        flexDirection: 'column',
        paddingHorizontal: 10,
    },
    h1: {
        fontSize: 20,
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
        color: COLORS.dark,
        opacity: 0.9,
        fontWeight: 'bold',
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
        borderRadius: 15,
    }
});
