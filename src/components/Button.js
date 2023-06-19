import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
const Button = ({ title, onPress = () => { }, type = 'info' }) => {
    return (
        <View style={styles.buttonWrapper}>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.7}
                style={[styles.button, 
                    type == "outline-info" ? styles.OutlineInfo :
                    type == "outline-success" ? styles.OutlineSuccess :
                    type == "outline-warning" ? styles.OutlineWarning :
                    type == "outline-danger" ? styles.OutlineDanger :
                    type == "info" ? styles.Info :
                    type == "success" ? styles.Success :
                    type == "warning" ? styles.Warning :
                    type == "danger" ? styles.Danger :
                    styles.Info 
                ]}>
                <Text style={
                    type == "outline-info" ? styles.TextOutlineInfo :
                    type == "outline-success" ? styles.TextOutlineSuccess :
                    type == "outline-warning" ? styles.TextOutlineWarning :
                    type == "outline-danger" ? styles.TextOutlineDanger :
                    styles.Text }>
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Button;

const styles = StyleSheet.create({ 
    button: {
        height: 55,
        width: '100%',        
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonWrapper: {        
        marginVertical: 10,
        backgroundColor: COLORS.primary,
        height: 55,
        marginTop: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        width: '100%',
        borderRadius: 15,
    },
    Info: {
        borderColor: COLORS.info,
        backgroundColor:  COLORS.info,
        borderWidth: 1
    },
    Success: {
        borderColor: COLORS.success,
        backgroundColor:  COLORS.success,
        borderWidth: 1
    },
    Warning: {
        borderColor: COLORS.warning,
        backgroundColor:  COLORS.warning,
        borderWidth: 1
    },
    Danger: {
        borderColor: COLORS.danger,
        backgroundColor:  COLORS.danger,
        borderWidth: 1
    },
    OutlineInfo: {
        borderColor: COLORS.info,
        backgroundColor:  COLORS.white,
        borderWidth: 1
    },
    OutlineSuccess: {
        borderColor: COLORS.success,
        backgroundColor:  COLORS.white,
        borderWidth: 1
    },
    OutlineWarning: {
        borderColor: COLORS.warning,
        backgroundColor:  COLORS.white,
        borderWidth: 1
    },
    OutlineDanger: {
        borderColor: COLORS.danger,
        backgroundColor:  COLORS.white,
        borderWidth: 1
    },


    TextOutlineInfo: {
        borderColor: COLORS.info,        
        fontSize: 16,
        color: COLORS.info
    },
    TextOutlineSuccess: {
        borderColor: COLORS.success,        
        fontSize: 16,
        color: COLORS.success
    },
    TextOutlineWarning: {
        borderColor: COLORS.warning,        
        fontSize: 16,
        color: COLORS.warning
    },
    TextOutlineDanger: {
        borderColor: COLORS.danger,        
        fontSize: 16,
        color: COLORS.danger
    },
    Text: {        
        fontSize: 16,
        color: COLORS.white
    },
})