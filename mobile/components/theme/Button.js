import React from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { useTranslation } from '../../core/contexts/TranslationContext';
import { COLORS } from '../../core/constants'

const Button = ({
    onPress,
    width,
    isLoading,
    children,
    fontSize = 20,
    height = 40,
    style = {},
    buttonStyles= {},
    textStyles= {},
}) => {
    const { t } = useTranslation();

    return (
        <TouchableOpacity
            style={{width: '100%', ...style}}
            onPress={(e) => {
                if (isLoading) return
                onPress(e)
            }}>
            <View style={{...styles.button, width: width, height, ...buttonStyles }}>
                <Text style={{fontSize, ...styles.text, ...textStyles}}>
                    {isLoading ? t('Loading') : children}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: COLORS.purple,
        borderRadius: 100,
    },
    text: {
        color: '#ffffff',
        fontWeight: '700',
        textTransform:'uppercase',
    }
})
