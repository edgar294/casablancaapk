import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { COLORS, IMGS } from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '../assets/images/logo.png';

const Input = ({
    label,
    iconName,
    error,
    password,
    bordered = false,    
    withBg = false,
    onFocus = () => { },
    ...props
}) => {
    const [hidePassword, setHidePassword] = React.useState(password);
    const [isFocused, setIsFocused] = React.useState(false);
    
    return (
        <View style={{ marginBottom: 15 }}>
            <View
                style={[
                    style.inputContainer,
                    (withBg) ? style.withBg : {},
                    (bordered) ? style.bordered : {},
                    {
                        borderColor: error
                            ? COLORS.red
                            : isFocused
                                ? COLORS.darkBlue
                                : COLORS.light,                        
                    },  
                ]}>
                {/* <Logo 
                    width={30} 
                    height={30}
                    style={COLORS.darkBlue}
                /> */}                
                <TextInput
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={hidePassword}
                    style={[style.input, style.textInput]}
                    placeholderTextColor={COLORS.dark}
                    {...props}
                />
                {password && (
                    <Icon
                        onPress={() => setHidePassword(!hidePassword)}
                        name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                        style={{ color: COLORS.darkBlue, fontSize: 22 }}
                    />
                )}
            </View>
            {error && (
                <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>
                    {error}
                </Text>
            )}
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
        height: 35,
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

export default Input;