import axios from 'axios'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { BASE_URL } from '../config'
import Toast from 'react-native-toast-message'
import { ROUTES } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
// import { useNetInfo } from '@react-native-community/netinfo';

export const VerificationContext = createContext()

export const VerificationProvider = ({ children }) => {
    const [canastillas, setCanastillas] = useState('-')
    const [bulbos, setBulbos] = useState('-')
    const [bodegas, setBodegas] = useState([])
    const [productos, setProductos] = useState([])
    const [proveedores, setProveedores] = useState([])
    const [tipos, setTipos] = useState([])
    const [variedades, setVariedades] = useState([])
    const [colores, setColores] = useState([])
    const [calibres, setCalibres] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [isConected, setIsConected] = useState(true)

    const [dataToVerifyOffline, setDataToVerifyOffline] = useState([])
    const [dataMarkAsOutOffline, setDataMarkAsOutOffline] = useState([])

    const [listCanastillas, setListCanastillas] = useState([])
    const [listCanastillasSalidas, setListCanastillasSalidas] = useState([])

    const [selected, setSelected] = useState([])
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConected(state.isInternetReachable);
        });

        reloadOfflineInfo()
        
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (isConected) {
            reloadOfflineInfo()
        }
        return () => {

        };
    }, [isConected]);

    const reloadOfflineInfo = () => {
        AsyncStorage.getItem('dataToVerifyOffline').then((datos) => {
            if (datos) {
                setDataToVerifyOffline(JSON.parse(datos))
                startOfflineVerification(JSON.parse(datos))
            }
        })

        AsyncStorage.getItem('dataMarkAsOutOffline').then((datos) => {
            if (datos) {
                setDataMarkAsOutOffline(JSON.parse(datos))
                startOfflineMasAsOut(JSON.parse(datos))
            }
        })
    }

    const startOfflineVerification = async (data) => {
        const removedCodes = []
        if (isConected) {
            for (let i = 0; i < data.length; i++) {
                const code = data[i];
                let result = await verifyCode(code, true)
                if (result) {
                    removedCodes.push(code)
                }
            }
        }
        const dataWithoutCodes = dataToVerifyOffline.filter(c => !removedCodes.includes(c));
        setDataToVerifyOffline(dataWithoutCodes)
        await AsyncStorage.setItem('dataToVerifyOffline', JSON.stringify(dataWithoutCodes))
    }

    const startOfflineMasAsOut = async (data) => {
        const removedCodes = []
        if (isConected) {
            for (let i = 0; i < data.length; i++) {
                const code = data[i];
                let result = await markAsOut(code, true)
                if (result) {
                    removedCodes.push(code)
                }
            }
        }
        const dataWithoutCodes = dataMarkAsOutOffline.filter(c => !removedCodes.includes(c));
        setDataMarkAsOutOffline(dataWithoutCodes)
        await AsyncStorage.setItem('dataMarkAsOutOffline', JSON.stringify(dataWithoutCodes))
    }

    const { token } = useContext(AuthContext)

    const fetchCounters = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/verificaciones/count`)
            const data = response.data
            if (data.status) {
                setBulbos(data.data.bulbos)
                setCanastillas(data.data.canastillas)
                AsyncStorage.setItem('totalBulbos', `${data.data.bulbos}`)
                AsyncStorage.setItem('totalCanastillas', `${data.data.canastillas}`)
            } else {
                setBulbos('error')
                setCanastillas('error')
            }
        } catch (e) {
            console.log(`Error login ${e}`)
            setBulbos('error')
            setCanastillas('error')
        }
    }

    const fetchDataSelects = async () => {
        try {
            const bodegasResponse = await axios.post(`${BASE_URL}/get/bodegas`)
            setBodegas(bodegasResponse.data.data)

            const productosResponse = await axios.post(`${BASE_URL}/get/productos`)
            setProductos(productosResponse.data.data)

            const proveedoresResponse = await axios.post(`${BASE_URL}/get/proveedores`)
            setProveedores(proveedoresResponse.data.data)

            const tiposResponse = await axios.post(`${BASE_URL}/get/tipos`)
            setTipos(tiposResponse.data.data)

            const calibresResponse = await axios.post(`${BASE_URL}/get/calibres`)
            setCalibres(calibresResponse.data.data)

        } catch (e) {

        }
    }

    const fetctVariedades = async (tipo) => {
        try {
            setIsLoading(true)
            setVariedades([])
            const variedadesResponse = await axios.post(`${BASE_URL}/get/variedades`, { tipo })
            setVariedades(variedadesResponse.data.data)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }

    const fetctColores = async (variedad) => {
        try {
            setIsLoading(true)
            setColores([])
            const coloresResponse = await axios.post(`${BASE_URL}/get/colores`, { variedad })
            setColores(coloresResponse.data.data)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }

    const createRegister = async (payload, id = null) => {
        try {
            setIsLoading(true)
            const url = `${BASE_URL}/products` + ((id) ? `/${id}` : '')
            const response = await axios.post(url, { ...payload })
            const data = response.data
            if (data.status) {
                Toast.show({
                    type: 'success',
                    text1: 'Crear Producto',
                    text2: data.message,
                    autoHide: true,
                    visibilityTime: 2500,
                    position: 'bottom'
                })
                navigation.navigate(ROUTES.CREATE_RECORD)
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Crear Producto',
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

    const deleteRegister = async (id) => {
        try {
            setIsLoading(true)
            const url = `${BASE_URL}/products/${id}`
            const response = await axios.delete(url,)
            const data = response.data
            if (data.status) {
                Toast.show({
                    type: 'success',
                    text1: 'Eliminar Producto',
                    text2: data.message,
                    autoHide: true,
                    visibilityTime: 2500,
                    position: 'bottom'
                })
                fetchProducts()
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Eliminar Producto',
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

    const fetchProducts = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${BASE_URL}/products`)
            const data = response.data
            if (data.status) {
                setProducts(data.data)
                AsyncStorage.setItem('products', JSON.stringify(data.data))
            }
            setIsLoading(false)
        } catch (e) {
            data = await AsyncStorage.getItem('products')
            if (data) {
                setProducts(data)
            }
            setIsLoading(false)
        }
    }

    const fetchCanastillas = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${BASE_URL}/canastillas`)
            const data = response.data
            if (data.status) {
                setListCanastillas(data.data)
            }
            setIsLoading(false)
        } catch (e) {
            console.log(`fecth canastillas error ${e}`)
            setIsLoading(false)
        }
    }

    const fetchCanastillasSalidas = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${BASE_URL}/canastillas/salidas`)
            const data = response.data
            if (data.status) {
                setListCanastillasSalidas(data.data)
            }
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }

    const verifyCode = async (code, fromOffline = false) => {
        try {
            if (isConected) {
                setIsLoading(true)
                const response = await axios.post(`${BASE_URL}/canastillas/verify/code`, { codigo: code })
                const data = response.data

                setIsLoading(false)
                if (data.status) {
                    Toast.show({
                        type: 'success',
                        text1: 'Verificar Canastilla',
                        text2: data.message,
                        autoHide: true,
                        visibilityTime: 2500,
                        position: 'bottom'
                    })
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Verificar Canastilla',
                        text2: data.message,
                        autoHide: true,
                        visibilityTime: 2500,
                        position: 'bottom'
                    })
                }

                return true
            } else {
                if (!fromOffline) {
                    addCodeToVerifyOffline(code)
                    return false
                }
            }
        } catch (e) {
            setIsLoading(false)
            console.log(e)
            Toast.show({
                type: 'error',
                text1: 'Verificar Canastilla',
                text2: 'Ocurrio un error, intente de nuevo',
                autoHide: true,
                visibilityTime: 2500,
                position: 'bottom'
            })
            return false
        }
    }

    const addCodeToVerifyOffline = (code) => {
        const filtredData = dataToVerifyOffline.find(c => code == c);
        if (filtredData == code) {
            Toast.show({
                type: 'error',
                text1: 'Verificar Canastilla',
                text2: `OFFLINE: Codigo ${code} ya se encuentra registrado para ser verificado`,
                autoHide: false,
                position: 'bottom'
            })
        } else {
            Toast.show({
                type: 'success',
                text1: 'Verificar Canastilla',
                text2: `OFFLINE: Codigo ${code} registrado para ser verificado`,
                autoHide: false,
                position: 'bottom'
            })
            const newData = [...dataToVerifyOffline, code]
            AsyncStorage.setItem('dataToVerifyOffline', JSON.stringify(newData))
            setDataToVerifyOffline(newData);
        }
    }

    const markAsOut = async (code, fromOffline = false) => {
        try {
            if (isConected) {
                setIsLoading(true)
                const response = await axios.post(`${BASE_URL}/canastillas/mark/out/code`, { codigo: code })
                const data = response.data

                setIsLoading(false)
                if (data.status) {
                    Toast.show({
                        type: 'success',
                        text1: 'Registrar Salida',
                        text2: data.message,
                        autoHide: true,
                        visibilityTime: 2500,
                        position: 'bottom',
                        props: {
                            text2NumberOfLines: 2 //number of how many lines you want
                        }
                    })
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Registrar Salida',
                        text2: data.message,
                        autoHide: true,
                        visibilityTime: 2500,
                        position: 'bottom',
                        props: {
                            text2NumberOfLines: 2 //number of how many lines you want
                        }
                    })
                }

                return true
            } else {
                if (!fromOffline) {
                    addCodeToMarkAsOutOffline(code)
                }
                return false
            }
        } catch (e) {
            console.log(e)
            setIsLoading(false)
            Toast.show({
                type: 'error',
                text1: 'Registrar Salida',
                text2: 'Ocurrio un error, intente de nuevo.',
                autoHide: true,
                visibilityTime: 2500,
                position: 'bottom'
            })
            return false
        }
    }

    const addCodeToMarkAsOutOffline = (code) => {
        const filtredData = dataMarkAsOutOffline.find(c => code == c);
        if (filtredData == code) {
            Toast.show({
                type: 'error',
                text1: 'Registrar Salida',
                text2: `OFFLINE: Codigo ${code} ya se encuentra registrado para registrar su salida`,
                autoHide: false,
                position: 'bottom'
            })
        } else {
            Toast.show({
                type: 'success',
                text1: 'Registrar Salida',
                text2: `OFFLINE: Codigo ${code} registrado para registrar su salida`,
                autoHide: false,
                position: 'bottom'
            })
            const newData = [...dataMarkAsOutOffline, code]
            AsyncStorage.setItem('dataMarkAsOutOffline', JSON.stringify(newData))
            setDataMarkAsOutOffline(newData);
        }
    }

    const selectProduct = (product) => {
        setSelected(product)
    }

    const fetchGraphicData = async () => {
        try{
            const response = await axios.post(`${BASE_URL}/dashboard/graphic/data`)
            const data = response.data            
            return data
        } catch(e){
            console.log(`Error fetching graphic data ${e}`)
        }
    }

    useEffect(() => {
        fetchDataSelects()
    }, [])

    return (
        <VerificationContext.Provider
            value={{
                bulbos,
                canastillas,
                isLoading,
                bodegas,
                productos,
                proveedores,
                tipos,
                variedades,
                colores,
                calibres,
                products,
                selected,
                listCanastillas,
                listCanastillasSalidas,
                dataToVerifyOffline,
                dataMarkAsOutOffline,
                fetchCanastillas,
                fetchCanastillasSalidas,
                selectProduct,
                fetchCounters,
                fetchDataSelects,
                fetctVariedades,
                fetctColores,
                createRegister,
                fetchProducts,
                deleteRegister,
                verifyCode,
                markAsOut,
                fetchGraphicData
            }}>
            {children}
        </VerificationContext.Provider>
    );
}