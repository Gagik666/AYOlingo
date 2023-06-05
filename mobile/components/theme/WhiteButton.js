import React from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { COLORS } from '../../core/constants'

const WhiteButton = ({ onPress, width, children, fontSize = 20, height = 50, icon }) => (
    <TouchableOpacity style={{width: '100%', marginVertical: 5}} onPress={onPress}>
        <View style={{...styles.button, width: width, height }}>
            <View style={{position: 'absolute', left: 0, height: 50, width: 50}}>
                <SvgXml height={50} width={50} xml={icon}/>
            </View>
            <Text style={{fontSize, ...styles.text}}>
                {children}
            </Text>
        </View>
    </TouchableOpacity>
)

export default WhiteButton

const styles = StyleSheet.create({
    button: {
        position: 'relative',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 100,
    },
    text: {
        color: COLORS.purple,
        fontWeight: '500',
    }
})
