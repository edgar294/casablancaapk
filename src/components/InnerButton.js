import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import ScanQrIcon from '../assets/images/icon_qr_btnazul.svg'
import CheckIcon from '../assets/images/check-circle.svg'
import TrashIcon from '../assets/images/trash.svg'
import EyeIcon from '../assets/images/eye.svg'

const Button = ({
    title, 
    onPress = () => { },
    type = 'info',
    icon = '',
    fit = false,
}) => {
    const Icon = () => {
        if ((icon == 'scan-qr-icon')) {
            return (
                <View style={{ justifyContent:'center', alignItems: 'center', marginTop: 0 }}>
                    <ScanQrIcon width={17} height={17} fill='#fff'/>
                </View>
            )
        } else if ((icon == 'eye')) {
            return (
                <View style={{ justifyContent:'center', alignItems: 'center', marginTop: 0 }}>
                    <EyeIcon width={17} height={17} fill='#fff'/>
                </View>
            )
        } else if ((icon == 'trash')) {
            return (
                <View style={{ justifyContent:'center', alignItems: 'center', marginTop: 0 }}>
                    <TrashIcon width={17} height={17} fill='#fff'/>
                </View>
            )
        } else if ((icon == 'check')) {
            return (
                <View style={{ justifyContent:'center', alignItems: 'center', marginTop: 0 }}>
                    <CheckIcon width={17} height={17} fill='#fff'/>
                </View>
            )
        }


    }

    return (
        <View style={styles.buttonWrapper}>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.7}
                style={[styles.button, (fit) ? { paddingHorizontal: 5 } : {},
                    type == "outline-info" ? styles.OutlineInfo :
                    type == "outline-success" ? styles.OutlineSuccess :
                    type == "outline-warning" ? styles.OutlineWarning :
                    type == "outline-danger" ? styles.OutlineDanger :
                    type == "info" ? styles.Info :
                    type == "success" ? styles.Success :
                    type == "danger" ? styles.Danger :
                    styles.Info 
                    ]}>
                < Icon />
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
        paddingVertical: 0,
        paddingHorizontal: 15,
        borderRadius: 15
    },
    buttonWrapper: {
        margin: 5,
        height: 20,
        borderRadius: 15,
        flexDirection: 'row',
    },
    Info: {
        borderColor: COLORS.info2,
        backgroundColor:  COLORS.info2,
        borderWidth: 1
    },
    Success: {
        borderColor: COLORS.success,
        backgroundColor:  COLORS.success,
        borderWidth: 1
    },
    Warning: {
        borderColor: COLORS.warning2,
        backgroundColor:  COLORS.warning2,
        borderWidth: 1
    },
    Danger: {
        borderColor: COLORS.danger,
        backgroundColor:  COLORS.danger,
        borderWidth: 1
    },
    OutlineInfo: {
        borderColor: COLORS.info2,
        backgroundColor:  COLORS.white,
        borderWidth: 1
    },
    OutlineSuccess: {
        borderColor: COLORS.success,
        backgroundColor:  COLORS.white,
        borderWidth: 1
    },
    OutlineWarning: {
        borderColor: COLORS.warning2,
        backgroundColor:  COLORS.white,
        borderWidth: 1
    },
    OutlineDanger: {
        borderColor: COLORS.danger,
        backgroundColor:  COLORS.white,
        borderWidth: 1
    },


    TextOutlineInfo: {
        borderColor: COLORS.info2,        
        fontSize: 12,
        color: COLORS.info2
    },
    TextOutlineSuccess: {
        borderColor: COLORS.success,        
        fontSize: 12,
        color: COLORS.success
    },
    TextOutlineWarning: {
        borderColor: COLORS.warning2,        
        fontSize: 12,
        color: COLORS.warning2
    },
    TextOutlineDanger: {
        borderColor: COLORS.danger,        
        fontSize: 12,
        color: COLORS.danger
    },
    Text: {        
        fontSize: 12,
        color: COLORS.white
    },
})