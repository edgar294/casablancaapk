import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';
import Svg, { Path } from 'react-native-svg';

const CustomTabBarButton = props => {
    const { route, children, accessibilityState, onPress, hide=false } = props;

    if (accessibilityState.selected) {
        return (
            <View style={[styles.btnWrapper, (hide) ? { display: 'none' } : {}]}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onPress}
                    style={[styles.activeBtn]}>
                    {children}
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPress}
                style={[
                    styles.inactiveBtn,
                    {
                        borderTopLeftRadius: route === 'home' ? 10 : 0,
                        borderTopRightRadius: route === 'settings' ? 10 : 0,
                    },
                    , (hide) ? { display: 'none' } : {}
                ]}>
                {children}
            </TouchableOpacity>
        );
    }
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
    btnWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    activeBtn: {
        flex: 1,
        backgroundColor: COLORS.white,
        // position: 'absolute',
        // top: -22,
        // width: 50,
        // height: 50,
        // borderRadius: 50 / 2,
        // color: COLORS.darkBlue,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 5,
    },
    inactiveBtn: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    svgGapFiller: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});
