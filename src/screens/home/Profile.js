import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import { COLORS } from '../../constants';
import UserImage from '../../assets/images/img_perfil.png'
import { AuthContext } from '../../context/AuthContext';

import Button from '../../components/Button';

import Input from '../../components/Input';
import InnerButton from '../../components/InnerButton'
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-crop-picker';
import { BASE_URL } from '../../config';
import { TouchableOpacity } from 'react-native-gesture-handler'

const Profile = ({ navigation }) => {
    const [name, setName] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const [oldPassword, setOldPassword] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [passwordConfirmation, setPasswordConfirmation] = React.useState(null);

    const { user, updateUser, isLoading, updateProfileImage } = useContext(AuthContext)

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

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            setOldPassword(null)
            setPassword(null)
            setPasswordConfirmation(null)
        });

        return focusHandler;
    }, [navigation])

    const showOptions = () => {
        Alert.alert('Cambiar imagen de perfil', 'Seleccione desde donde quiere cargar su imagen',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Galeria',
                    onPress: () => {
                        ImagePicker.openPicker({
                            width: 300,
                            height: 400,
                            cropping: true
                        }).then(image => {
                            updateProfileImage(image)
                        });
                    },
                },
                {
                    text: 'Camara',
                    onPress: () => {
                        ImagePicker.openCamera({
                            width: 300,
                            height: 400,
                            cropping: true,
                        }).then(image => {
                            // console.log(image);
                            updateProfileImage(image)
                        });
                    }
                },
            ])
    }

    const getProfileImage = () => {
        return BASE_URL.slice(0,-4) + '/storage/images_perfil/' + user.img_perfil
    }

    return (
        <ScrollView>
            <View style={styles.mainContainer}>                
                <Spinner visible={isLoading} />
                <View style={styles.row}>
                    <TouchableOpacity onPress={showOptions}>
                        { user.img_perfil == null ? (
                            <Image source={UserImage} style={{ width: 80, height: 80, borderRadius: 15 }} />
                        ) : (                            
                            <Image source={{uri: getProfileImage()}}  style={{ width: 80, height: 80, borderRadius: 15 }} />
                        )}
                    </TouchableOpacity>
                    <View style={styles.col}>
                        <Text style={styles.h3}>BIENVENIDO</Text>
                        {user.id ? (
                            <>
                                <Text style={styles.p}>{user.name}</Text>
                                <Text style={styles.p}>{user.rol.name}</Text>
                                <InnerButton type='outline-info' title="Cambiar avatar"
                                    onPress={showOptions}>
                                </InnerButton>
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
                        icon='user-pass'
                        password={true}
                    />
                    <Input
                        onChangeText={text => setPassword(text)}
                        label="Nueva contraseña"
                        placeholder="Nueva contraseña"
                        bordered={true}
                        value={password}
                        icon='user-pass'
                        password={true}
                    />
                    <Input
                        onChangeText={text => setPasswordConfirmation(text)}
                        label="Confirmar contraseña"
                        placeholder="Confirmar contraseña"
                        bordered={true}
                        value={passwordConfirmation}
                        icon='user-pass'
                        password={true}
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
        fontFamily: 'Roboto-Medium'
    },
    h2: {
        fontSize: 18,
        color: COLORS.gray,
        opacity: 0.9,
        fontFamily: 'Roboto-Medium'
    },
    h3: {
        fontSize: 16,
        color: COLORS.dark,
        opacity: 0.9,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Medium'
    },
    p: {
        fontSize: 13,
        color: COLORS.gray,
        opacity: 0.9,
        fontFamily: 'Roboto-Medium'
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
