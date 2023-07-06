import React, { startTransition, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Alert, ScrollView } from 'react-native';
import { COLORS } from '../../constants';
import Logo from '../../assets/images/logo.svg';
import UserImage from '../../assets/images/img_perfil.png'
import StatisticImage from '../../assets/images/graphic.png'
import CanastillaIcon from '../../assets/images/icon_canastilla_home.svg'
import BulbosIcon from '../../assets/images/icon_bulbos_home.svg'
import Graphic from '../../assets/images/graphic.png'
import { AuthContext } from '../../context/AuthContext';
import { VerificationContext } from '../../context/VerificationContext';

import Button from '../../components/Button';
import CustomPicker from '../../components/CustomPicker';
import CustomPicker2 from '../../components/CustomPicker2';
import Counter from '../../components/Counter';
import Input from '../../components/Input';
import Spinner from 'react-native-loading-spinner-overlay';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const Profile = ({ navigation }) => {
    const [name, setName] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const [oldPassword, setOldPassword] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [passwordConfirmation, setPasswordConfirmation] = React.useState(null);

    const { user, updateUser, isLoading } = useContext(AuthContext)

    const sendForm = () => {
        const payload = {
            id: user.id,
            name,
            email,
            phone,
            old_password: oldPassword,
            password: password,
            password_confirmation: passwordConfirmation,
        }
        updateUser(payload)
        setPassword(null)
        setOldPassword(null)
        setPasswordConfirmation(null)
    }

    useEffect(() => {
        setName(user.name)
        setEmail(user.email)
        setPhone(user.telefono)
    }, [])

    return (
        <ScrollView>
            <View style={styles.mainContainer}>
            <Spinner visible={isLoading} />
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
            <View style={[styles.row, styles.col]}>
                <Text style={[styles.h1, { marginBottom: 20 }]}>Actualizar Perfil</Text>
                <Input
                    onChangeText={text => setName(text)}
                    label="Nombre"
                    placeholder="Nombre"
                    bordered={true}
                    defaultValue={user.name}
                />
                <Input
                    onChangeText={text => setEmail(text)}
                    label="Email"
                    placeholder="Email"
                    bordered={true}
                    defaultValue={user.email}
                />
                <Input
                    onChangeText={text => setPhone(text)}
                    label="Teléfono"
                    placeholder="Teléfono"
                    bordered={true}
                    defaultValue={user.telefono}
                />
                <Text style={[styles.p, { marginBottom: 20, color: COLORS.danger }]}>Completa estos campos si desea cambiar su contraseña</Text>
                <Input
                    onChangeText={text => setOldPassword(text)}
                    label="Contraseña actual"
                    placeholder="Contraseña actual"
                    bordered={true}
                    value={oldPassword}
                />
                <Input
                    onChangeText={text => setPassword(text)}
                    label="Nueva contraseña"
                    placeholder="Nueva contraseña"
                    bordered={true}
                    value={password}
                />
                <Input
                    onChangeText={text => setPasswordConfirmation(text)}
                    label="Confirmar contraseña"
                    placeholder="Confirmar contraseña"
                    bordered={true}
                    value={passwordConfirmation}
                />
                <Button title="Actualizar perfil" onPress={sendForm} />
            </View>
            <View style={{ marginBottom: 90 }}></View>
            </View>
        </ScrollView>
    );
};

export default Profile;

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
