import { StyleSheet, Text, View } from 'react-native';
import React, { startTransition } from 'react';
import { COLORS } from '../../constants';
import UserImage from '../../assets/user.jpg'
import Logo from '../../assets/images/logo.svg';
import Graphic from '../../assets/images/graphic.png'

const Home = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.row}>                
                <Logo width={80} height={80} />
                <View style={styles.col}>
                    <Text style={styles.h3}>BIENVENIDO</Text>
                    <Text style={styles.p}>Nombre de Usuario</Text>
                    <Text style={styles.p}>Rol Usuario</Text>
                </View>
            </View>
            <View style={styles.row}> 
                <View style={styles.centerContent}> 
                    <Logo width={200} height={150} style=""/>
                </View>
            </View>
            <View style={styles.row}>
                <Logo width={70} height={70} />
                <View style={styles.col}>
                    <Text style={styles.h1}>CANASTILLAS</Text>
                    <Text style={styles.h2}>TOTAL: 1000</Text>
                </View>
            </View>
            <View style={styles.row}>                
                <Logo width={70} height={70} />
                <View style={styles.col}>
                    <Text style={styles.h1}>BULBOS</Text>
                    <Text style={styles.h2}>TOTAL: 1000</Text>
                </View>
            </View>
        </View>
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
        marginVertical: 6
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
    }
});
