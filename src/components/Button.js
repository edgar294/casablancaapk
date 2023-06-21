import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import FileIcon from '../assets/images/icon_file_btn_azul.svg'
import ScanQrIcon from '../assets/images/icon_qr_btnazul.svg'

const Button = ({ 
    title, onPress = () => { },
    type = 'info',
    icon = null 
}) => {
    const Icon = () => {
        if ((icon == 'file-icon')) {
            return (
                <View style={{ justifyContent:'center', alignItems: 'center' }}>
                    <FileIcon width={20} height={20} fill='#000'/>
                </View>
            )
        } else if ((icon == 'scan-qr-icon')) {
            return (
                <View style={{ justifyContent:'center', alignItems: 'center' }}>
                    <ScanQrIcon width={20} height={20} fill='#000'/>
                </View>
            )
        }
    }

    return (
        <View style={styles.buttonWrapper}>                        
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.7}
                style={[styles.button, { flex: 1 },                    type == "outline-info" ? styles.OutlineInfo :
                    type == "outline-success" ? styles.OutlineSuccess :
                    type == "outline-warning" ? styles.OutlineWarning :
                    type == "outline-danger" ? styles.OutlineDanger :
                    type == "info" ? styles.Info :
                    type == "success" ? styles.Success :
                    type == "warning" ? styles.Warning :
                    type == "danger" ? styles.Danger :
                    styles.Info 
                ]}>
                < Icon />
                <Text style={[styles.raleway, 
                    type == "outline-info" ? styles.TextOutlineInfo :
                    type == "outline-success" ? styles.TextOutlineSuccess :
                    type == "outline-warning" ? styles.TextOutlineWarning :
                    type == "outline-danger" ? styles.TextOutlineDanger :
                    styles.Text] }>
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Button;

const styles = StyleSheet.create({ 
    button: {
        height: 47, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '100%'
    },
    buttonWrapper: {        
        // justifyContent: 'center',
        marginVertical: 10,
        backgroundColor: COLORS.primary,
        height: 47,
        marginTop: 12,
        width: '100%',
        borderRadius: 15,
        flexDirection: 'row'
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
    raleway: {
        fontFamily: 'Raleway-SemiBold',
        marginLeft: 5        
    }
})