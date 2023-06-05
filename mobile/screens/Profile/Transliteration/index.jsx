import React from 'react'
import { View, Text, Switch, StyleSheet } from 'react-native'
import { COLORS } from '../../../core/constants'
import { useTranslation } from '../../../core/contexts/TranslationContext'
import { useTransliteration } from '../../../core/contexts/TransliterationContext'

export default function Transliteration() {
    const { t } = useTranslation()
    const { showTransliteration, toggleTransliteration } = useTransliteration()

    return (
        <View style={styles.white}>
            <Text>
                {t('Transliteration')}
            </Text>
            <Switch
                style={{ position: 'absolute', right: 10, transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                trackColor={{ false: '#3e3e3e', true: COLORS.purple }}
                thumbColor={showTransliteration ? '#ffffff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => toggleTransliteration(!showTransliteration)}
                value={showTransliteration}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    white: {
        position: 'relative',
        backgroundColor: '#ffffff',
        height: 40,
        width: '100%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    }
})
