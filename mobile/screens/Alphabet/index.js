import React, { useEffect, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useContent, useAlphabetsByLanguageGroup } from '../../core/hooks'
import { useTranslation } from '../../core/contexts/TranslationContext'
import { COLORS } from '../../core/constants'
import Wrapper from '../../components/TitleWrapper'
import AlphabetCard from './Card'

export default function Alphabet ({ navigation }) {
    const { t } = useTranslation();
    const { content: { languageGroup, alphabet }, setContent } = useContent()
    const { mutate: alphabetByLanguageGroup } = useAlphabetsByLanguageGroup()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            alphabetByLanguageGroup(
                {
                    languageGroup: languageGroup.id,
                },
                {
                    onSuccess: (response) => setContent(
                        (content) => ({
                            ...content,
                            alphabet: response.data.alphabetByLanguageGroup.items[0],
                        })
                    )
                }
            )
        })
    
        return unsubscribe
    }, [languageGroup])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <Wrapper
            navigation={navigation}
            title={t('Alphabet')}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{t(languageGroup.from)}</Text>
                <Text style={styles.headerText}>{t(languageGroup.to)}</Text>
                <Text style={styles.headerText}>{t('Pronunciation')}</Text>
            </View>
            <ScrollView style={{width: '100%', marginBottom: 70}}>
                {alphabet?.letters?.map(
                    (letter, index) => (
                        <AlphabetCard
                            key={`from-lowercase-${letter.fromLowercase}-to-lowercase-${letter.toLowercase}-${index}`}
                            data={letter} />
                    )
                )}
            </ScrollView>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        borderRadius: 30,
        backgroundColor: COLORS.purple,
        paddingVertical: 10,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 18,
        textTransform: 'capitalize',
        letterSpacing: .8,
        marginRight: 42
    },
})
