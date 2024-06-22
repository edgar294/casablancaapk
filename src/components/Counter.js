import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { COLORS, IMGS } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Counter = ({
    label,
    iconName,
    error,
    bordered = false,    
    withBg = false,
    value = 0,
    minus = () => { },
    plus = () => { },
    onFocus = () => { },
    onChangeValue = () => {},
    ...props
}) => {
    const [isFocused, setIsFocused] = React.useState(false);
    
    return (
        <View style={{ marginBottom: 5 }}>        
            <Text style={{ color: COLORS.dark, textAlign: 'center', fontSize: 12, fontFamily: 'Roboto-Medium', marginBottom: 5 }}>{ label }</Text>
            <View style={[style.row, { marginBottom: 5 }]}>
                <View style={style.col25}>
                    <TouchableOpacity onPress={minus}>
                        <Text style={[ style.btnCounter, { backgroundColor: COLORS.danger}]} >-</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={[
                        style.inputContainer,
                        (withBg) ? style.withBg : {},
                        (bordered) ? style.bordered : {},
                        style.col50,
                        {
                            borderColor: error
                                ? COLORS.red
                                : isFocused
                                    ? COLORS.darkBlue
                                    : COLORS.light,                        
                        },  
                    ]}>
                    <TextInput
                        value={value.toString()}
                        style={[ style.textInput, {borderWidth: 1, borderColor: COLORS.dark, borderRadius: 15, width: '94%', marginHorizontal: '3%', textAlign: 'center'}]}
                        placeholderTextColor={COLORS.dark}
                        keyboardType='number-pad'
                        {...props}
                    />
                </View>
                <View style={style.col25}>
                    <TouchableOpacity onPress={plus}>
                        <Text style={[ style.btnCounter, { backgroundColor: COLORS.secondary}]} >+</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        // paddingHorizontal: 15,
        borderRadius: 30,
        width: '100%',
        backgroundColor: COLORS.grayLight
    },
    inputImage: {
        width: 20,
        height: 20
    },
    textInput: {
        fontSize: 11,
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
        borderRadius: 30,
    },
    withBg: {
        backgroundColor: COLORS.grayLight,
        borderColor: COLORS.grayLight,
    },
    col25: {
        width:'25%',        
    },
    col50: {
        width:'50%',
    },
    row: {
        width: "100%",
        borderRadius: 20,
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        // marginVertical: 10
    },
    btnCounter: {
        color: COLORS.dark, 
        textAlign: 'center',
        height: 45,
        borderRadius:15,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        fontWeight: '900',
        color: COLORS.white
    },
    counter: {
        borderWidth: 1, 
        borderColor: COLORS.dark, 
        borderRadius: 15, 
        width: '94%', 
        marginHorizontal: '3%', 
        fontSize: 14, 
        textAlign: 'center',
        paddingTop: '12%'
    }
});

export default Counter;