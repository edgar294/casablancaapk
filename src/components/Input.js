import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { COLORS, IMGS } from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserLogin from '../assets/images/icon_user_login.svg'
import UserPass from '../assets/images/icon_user_password.svg'

const Input = ({
    label,
    iconName,
    error,
    password,
    bordered = false,    
    withBg = false,
    onFocus = () => { },
    icon = '',
    defaultValue = '',
    showLabel = false,
    editable = true,
    ...props
}) => {
    const [hidePassword, setHidePassword] = React.useState(password);
    const [isFocused, setIsFocused] = React.useState(false);

    const Icon = () => {
        if ((icon == 'user-login')) {
            return (
                <View style={{ justifyContent:'center', alignItems: 'center' }}>
                    <UserLogin width={20} height={20} fill='#000'/>
                </View>
            )
        } else if ((icon == 'user-pass')) {
            return (
                <View style={{ justifyContent:'center', alignItems: 'center' }}>
                    <UserPass width={20} height={20} fill='#000'/>
                </View>
            )
        }
    }
    
    const Label = () => {
        if (showLabel) {
            return (
                <Text style={{ color: COLORS.dark, marginBottom: 5 }}> 
                    {label}
                </Text>
            )
        }
    }

    return (
        <View style={{ marginBottom: 15 }}>
            <Label />
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
                < Icon />
                <TextInput
                    autoCorrect={false}
                    onFocus={() => {
                        // onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => setIsFocused(false)}                    
                    secureTextEntry={(hidePassword && hidePassword)}
                    style={[style.input, style.textInput]}
                    placeholderTextColor={COLORS.dark}    
                    defaultValue={defaultValue?.toString()}                    
                    editable={editable}
                    {...props}
                />
                {password && (
                    <></>
                    // <Icon
                    //     onPress={() => {
                    //         console.log('hiding')
                    //         setHidePassword(!hidePassword)
                    //     }}
                    //     name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                    //     style={{ color: COLORS.darkBlue, fontSize: 25 }}
                    // />
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
        fontSize: 12,
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
        fontFamily: 'Roboto-Medium'
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