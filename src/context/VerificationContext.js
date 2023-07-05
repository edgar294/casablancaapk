import axios from 'axios'
import React, { createContext, useContext, useEffect, useRef, useState} from 'react';
import { BASE_URL } from '../config'
import Toast from 'react-native-toast-message'
import { ROUTES } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

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

    const [selected, setSelected] = useState([])    
    const navigation = useNavigation();

    const { token } = useContext(AuthContext)

    const fetchCounters = async () => {
        try {            
            const response = await axios.get(`${BASE_URL}/verificaciones/count`)
            const data = response.data
            console.log(data)
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
        try{
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
        try{
            setIsLoading(true)
            setVariedades([])
            const variedadesResponse = await axios.post(`${BASE_URL}/get/variedades`, { tipo })
            setVariedades(variedadesResponse.data.data)
            setIsLoading(false)
        } catch (e){
            setIsLoading(false)
        }
    }

    const fetctColores = async (variedad) => {
        try{
            setIsLoading(true)
            setColores([])
            const coloresResponse = await axios.post(`${BASE_URL}/get/colores`, { variedad })
            setColores(coloresResponse.data.data)
            setIsLoading(false)
        } catch (e){
            setIsLoading(false)
        }
    }

    const createRegister = async (payload, id = null) => {
        try{
            setIsLoading(true)
            const url = `${BASE_URL}/products` + ((id) ? `/${id}`: '')            
            const response = await axios.post(url, {...payload})
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
        try{
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
        try{
            setIsLoading(true)
            const response = await axios.get(`${BASE_URL}/products`)
            const data = response.data
            if (data.status){
                setProducts(data.data)                
                AsyncStorage.setItem('products', JSON.stringify(data.data))
            }
            setIsLoading(false)
        } catch(e){
            data = await AsyncStorage.getItem('products')
            if(data){
                setProducts(data)
            }
            setIsLoading(false)
        }
    }

    const selectProduct = (product) => {
        setSelected(product)
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
                selectProduct,
                fetchCounters, 
                fetchDataSelects,
                fetctVariedades,
                fetctColores,
                createRegister,
                fetchProducts,
                deleteRegister
            }}>
            { children }
        </VerificationContext.Provider>
    );
}