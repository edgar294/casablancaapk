import React from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { COLORS, IMGS } from '../constants';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from "@react-native-picker/picker";

const CustomPicker2 = ({
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
    const [isFocused, setIsFocused] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [country, setCountry] = React.useState(null);

    return (
        <View style={[style.inputContainer]}>
            <Picker
                selectedValue={selected}
                style={[style.picker]}
                dropdownIconColor={COLORS.white}
                onValueChange={(value, index) => selectItem(value)}
                itemStyle={style.itemPicker}
            >
                <Picker.Item label={label} value={null} style={style.itemPicker} />
                {
                    data.map(option =>
                        <Picker.Item label={option.name} value={option.id} style={style.itemPicker} key={option.id}/>
                    )}
            </Picker>
            <Icon name="ios-caret-down" size={24} color={COLORS.dark} style={{
                position: 'absolute',
                right: 15,
                top: 5
            }} />
        </View>
    );
};

const style = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: 12,
        color: COLORS.gray,
    },
    inputContainer: {
        height: 35,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderRadius: 50,
        width: '100%',
        borderWidth: 0.5,
        borderRadius: 30,
        marginBottom: 15,
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
    },
    picker: {
        paddingHorizontal: 10,
        width: '100%',    
        color: COLORS.dark,
        marginTop: -9,
        fontFamily: 'Roboto-Medium'
    },
    itemPicker: {
        fontSize: 13,
        fontFamily: 'Roboto-Medium',
    }
});

export default CustomPicker2;