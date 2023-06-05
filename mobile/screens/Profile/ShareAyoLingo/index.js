import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Share, Platform } from 'react-native'
import { SvgXml } from 'react-native-svg'
import * as icons from '../../../assets/icons'
import { COLORS } from '../../../core/constants'
import { useTranslation } from '../../../core/contexts/TranslationContext'

const STORE_URL = {
    android: 'https://play.google.com/store/apps/details?id=org.birthrightarmenia.ayolingo',
    ios: 'https://apps.apple.com/am/app/ayolingo-learn-armenian/id1367151083',
}

export default function ShareAyoLingo () {
    const { t } = useTranslation()

    const onShare = async () => {
        try {
            await Share.share({
                message: 'Hey there! I am using AYOlingo to learn Armenian. Join me now!',
                url: STORE_URL[Platform.OS],
            })
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <TouchableOpacity
            style={{width: '100%'}}
            onPress={onShare}>
            <View style={styles.white}>
                <View style={{position: 'absolute', left: 0}}>
                    <SvgXml height="40" width="40" xml={icons.share}/>
                </View>
                <Text style={{color: COLORS.purple}}>
                    {t('Share AYOlingo')}
                </Text>
            </View>
        </TouchableOpacity>
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
