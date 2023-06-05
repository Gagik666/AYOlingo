import React from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { SvgXml } from 'react-native-svg'
import * as icons from '../../assets/icons'
import { COLORS } from '../../core/constants'

const CompletedButton = ({
    onPress,
    width,
    disabled,
    children,
    fontSize = 20,
    height = 50,
    backgroundColor,
    textStyles = {},
    icon,
    wrapperStyles = {},
}) => (
    <TouchableOpacity
        style={{...styles.wrapper, ...wrapperStyles}}
        disabled={disabled}
        onPress={onPress}>
        <View style={{...styles.button, width: width, height, opacity: disabled ? .6 : 1, backgroundColor}}>
            <View style={{position: 'absolute', left: 2.5, top: 2.5, height: 50, width: 50}}>
                <SvgXml height={45} width={45} xml={icon || icons.done}/>
            </View>
            <Text style={{fontSize, ...styles.text, ...textStyles}}>
                {children}
            </Text>
        </View>
    </TouchableOpacity>
)

export default CompletedButton

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginVertical: 5,
    },
    button: {
        position: 'relative',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: COLORS.purple,
        borderRadius: 100,
    },
    text: {
        color: '#ffffff',
        fontWeight: '700',
    }
})
