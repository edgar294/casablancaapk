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

    return (
        <AuthContext.Provider 
            value={{ login, token, user, isLoading, errors, logout }}>
            { children }
        </AuthContext.Provider>
    );
}