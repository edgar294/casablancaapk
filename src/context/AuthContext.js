import axios from 'axios'
import React, { createContext, useEffect, useRef, useState} from 'react';
import { BASE_URL } from '../config'
import Toast from 'react-native-toast-message'
import { ROUTES } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [splasLoading, setSplasLoading] = useState({})

    const login = async (email, password) => {
        setIsLoading(true)        
        try {
            const payload = { email, password }
            const response = await axios.post(`${BASE_URL}/login`, payload)
            const data = response.data
            if (data.status) {                
                setToken(data.token)
                setUser(data.user)
                AsyncStorage.setItem('user', JSON.stringify(data.user))
                AsyncStorage.setItem('token', data.token)
                Toast.show({
                    type: 'success',
                    text1: 'Pantalla de inicio de sesión',
                    text2: data.message,
                    autoHide: true,
                    visibilityTime: 2500,
                    position: 'bottom'
                })
                // navigation.navigate(ROUTES.HOME)
            } else {
                setErrors(data.errors)
                Toast.show({
                    type: 'error',
                    text1: 'Pantalla de inicio de sesión',
                    text2: data.message,
                    autoHide: true,
                    visibilityTime: 2500,
                    position: 'bottom'
                })
            }

            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            console.log(`Error login ${e}`)
            Toast.show({
                type: 'error',
                text1: 'Pantalla de inicio de sesión',
                text2: `Error login ${e}`,
                autoHide: true,
                visibilityTime: 2500,
                position: 'bottom'
            })
            console.log(`Error login ${e}`)
        }
    }

    const updateUser = async (payload) => {
        try{
            setIsLoading(true)
            const response = await axios.post(`${BASE_URL}/user/update`, payload)
            const data = response.data
            if (data.status) {                
                setUser(data.user)
                AsyncStorage.setItem('user', JSON.stringify(data.user))                
                Toast.show({
                    type: 'success',
                    text1: 'Editar Perfil de Usuario',
                    text2: data.message,
                    autoHide: true,
                    visibilityTime: 2500,
                    position: 'bottom'
                })                
            } else {
                setErrors(data.errors)
                Toast.show({
                    type: 'error',
                    text1: 'Editar Perfil de Usuario',
                    text2: data.message,
                    autoHide: true,
                    visibilityTime: 2500,
                    position: 'bottom'
                })
            }

            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        setIsLoading(true)
        setToken(null)
        setUser({})
        setIsLoading(false)
        // try {
        //     const payload = { email, password }
        //     const response = await axios.post(`${BASE_URL}/login`, payload)
        //     const data = response.data
        //     if (data.status) {
        //         setToken(data.token)
        //         setUser(data.user)
        //         AsyncStorage.setItem('user', JSON.stringify(data.user))
        //         AsyncStorage.setItem('token', data.token)
        //         Toast.show({
        //             type: 'success',
        //             text1: 'Pantalla de inicio de sesión',
        //             text2: data.message,
        //             autoHide: true,
        //             visibilityTime: 2500,
        //             position: 'bottom'
        //         })
        //     } else {
        //         setErrors(data.errors)
        //         Toast.show({
        //             type: 'error',
        //             text1: 'Pantalla de inicio de sesión',
        //             text2: data.message,
        //             autoHide: true,
        //             visibilityTime: 2500,
        //             position: 'bottom'
        //         })
        //     }

        //     setIsLoading(false)
        // } catch (e) {
        //     setIsLoading(false)
        //     console.log(`Error login ${e}`)
        //     Toast.show({
        //         type: 'error',
        //         text1: 'Pantalla de inicio de sesión',
        //         text2: `Error login ${e}`,
        //         autoHide: true,
        //         visibilityTime: 2500,
        //         position: 'bottom'
        //     })
        //     console.log(`Error login ${e}`)
        // }
    }

    const forgotPassword = async (email) => {
        // console.log(email)
        // return
        try {
            const payload = { email }
            const response = await axios.post(`${BASE_URL}/forgot-password`, payload)
            const data = response.data
            if (data.status) {                                                
                Toast.show({
                    type: 'success',
                    text1: 'Recuperar contraseña',
                    text2: data.message,
                    autoHide: true,
                    visibilityTime: 5000,
                    position: 'bottom'
                })
                navigation.navigate(ROUTES.LOGIN)
            } else {
                setErrors(data.errors)
                Toast.show({
                    type: 'error',
                    text1: 'Recuperar contraseña',
                    text2: data.message,
                    autoHide: true,
                    visibilityTime: 5000,
                    position: 'bottom'
                })
            }

            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            console.log(`Error login ${e}`)
            Toast.show({
                type: 'error',
                text1: 'Recuperar contraseña',
                text2: `Error login ${e}`,
                autoHide: true,
                visibilityTime: 5000,
                position: 'bottom'
            })
            console.log(`Error login ${e}`)
        }
    }

    isLogedIn = async () => {
        try{
            setSplasLoading(true)

            const userInfo = await AsyncStorage.getItem('user')            
            const user = JSON.parse(userInfo)
            if(user) {
                setUser(user)
            }

            const tokenInfo = await AsyncStorage.getItem('token')
            const token = tokenInfo
            if(token){
                setToken(token)
            }
            setSplasLoading(false)
        } catch(e) {
            console.log(`Is loged in error ${e}`)
            setSplasLoading(false)
        }
    }

    useEffect(() => {
        isLogedIn()
    }, [])

    return (
        <AuthContext.Provider 
            value={{ login, token, user, isLoading, errors, logout, updateUser, splasLoading, forgotPassword }}>
            { children }
        </AuthContext.Provider>
    );
}