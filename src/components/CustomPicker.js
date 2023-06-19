import React from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { COLORS, IMGS } from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomPicker = ({
    label = "",
    selectItem = () => { },
    selected,
    data = [],
    bordered = false,    
    withBg = false,
    onFocus = () => { },
    error,
    ...props
}) => {
    const [showModal, setShowModal] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    selectItem(item.title)
                    setShowModal(false)
                }}
                style={{
                    marginTop: 11,
                    height: 40,
                    backgroundColor: COLORS.bgColor,
                    flex: 1,
                    justifyContent: 'center',
                    width: '90%',
                    marginLeft: '5%',
                    borderRadius: 50,
                    paddingHorizontal: 10
                }}
            >
                <Text style={{ color: '#000', textAlign: 'center', fontSize: 16 }}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ marginBottom: 20, width: '100%' }}>
            <View
                style={[
                    style.inputContainer,
                    (bordered) ? style.bordered : {},
                    (withBg) ? style.withBg : {},
                    {
                        borderColor: error
                            ? COLORS.red
                            : isFocused
                                ? COLORS.darkBlue
                                : COLORS.light,
                    },
                ]}>
                <TouchableOpacity
                    style={style.input}
                    onPress={() => {
                        setShowModal(true)
                    }}
                >
                    <Text style={style.textInput}>
                        {selected ? selected : label}
                    </Text>
                    <Icon name="arrow-down-drop-circle" size={24} color={COLORS.dark} style={{
                        position: 'absolute',
                        right: 0
                    }} />
                </TouchableOpacity>
            </View>
            {/* {error && (
                <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>
                    {error}
                </Text>
            )} */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={showModal}                
            >
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        width: '100%',
                        height: '40%',
                        position: 'absolute',
                        bottom: 0
                    }}
                >                    
                    <SafeAreaView>                        
                        <TouchableOpacity
                            style={{
                                height: 25,
                                backgroundColor: COLORS.gray,
                                width: 80,                                
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',                                
                            }}
                            onPress={() => {
                                setShowModal(false)
                            }}
                        >
                            <Text style={{ color:COLORS.white}}>Cerrar</Text>
                        </TouchableOpacity>
                        <Text style={{ color: '#000', textAlign: 'left', paddingLeft: 20, marginVertical: 10, fontSize:18 }}>
                            Seleccione {label}: 
                        </Text>
                        {isLoading ? <ActivityIndicator /> : (
                            <FlatList
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={item => `key-${item.id}`}
                                style={{

                                }}
                            />
                        )}
                        <TouchableOpacity
                            onPress={() => {
                                setShowModal(false)
                            }}
                        >
                            <Text>Cerrar</Text>
                        </TouchableOpacity>

                    </SafeAreaView>
                </View>
            </Modal>
        </View>
    );
};

const style = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: 16,
        color: COLORS.gray,
    },
    inputContainer: {
        height: 45,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderRadius: 50,
        width: '100%'
    },
    inputImage: {
        width: 20,
        height: 20
    },
    textInput: {
        fontSize: 16,
        color: COLORS.dark,
    },
    input: {
        borderWidth: 0,
        padding: 0,
        marginLeft: 20,
        marginVertical: 0,
        borderRadius: 5,
        paddingVertical: 0,        
        flex: 1,        
        justifyContent: 'center',        
    },
    mr7: {
        marginRight: 7,
    },
    bordered: {
        borderWidth: 0.5,
        borderRadius: 50,
    },
    withBg: {
        backgroundColor: COLORS.grayLight,
        borderColor: COLORS.grayLight,
    }
});

export default CustomPicker;