import React, { useEffect, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SvgXml } from 'react-native-svg'
import Wrapper from '../../components/TitleWrapper'
import { useContent, useListLanguageGroups, useSecureStore } from '../../core/hooks'
import * as icons from '../../assets/icons'
import { useTranslation } from '../../core/contexts/TranslationContext'

export default function LanguageGroups ({ navigation }) {
    const {
        content: {
            languageGroup: activeLanguageGroup,
            languageGroups,
        },
        setContent,
        modulesRef,
        exercisesRef,
    } = useContent()
    const { listLanguageGroups } = useListLanguageGroups()
    const { setItem } = useSecureStore()
    const { t } = useTranslation()

    const onLanguageGroupPress = (languageGroup) => {
        modulesRef.current = { items: [] }
        exercisesRef.current = { items: [] }
        setContent(
            (content) => ({
                ...content,
                modules: {items: []},
                exercises: {items: []},
                alphabet: {},
                languageGroup,
            })
        )
        setItem('languageGroup', JSON.stringify(languageGroup))
        setTimeout(() => navigation.goBack, 0)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            listLanguageGroups({}, {
                onSuccess: (response) => setContent(
                    (content) => ({
                        ...content,
                        languageGroups: response.data.listLanguageGroups.items
                    })
                )
            })
        })
    
        return unsubscribe
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])
    
    return (
        <Wrapper
            title={t('Language Groups')}
            navigation={navigation}>
            {languageGroups.map(
                (languageGroup, index) => {
                    const listItemStyles = [styles.listItem]
                    if (index + 1 === languageGroups.length) listItemStyles.push(styles.listItemLastChild)

                    return (
                        <TouchableOpacity
                            key={languageGroup.id}
                            style={{width: '100%'}}
                            onPress={() => onLanguageGroupPress(languageGroup)}>
                            <View style={listItemStyles}>
                                <Text style={styles.text}>
                                    {t(`${languageGroup.from}-${languageGroup.to}`)}
                                </Text>
                                {activeLanguageGroup.id === languageGroup.id && (
                                    <SvgXml
                                        xml={icons.check}
                                        width={27} />
                                )}
                            </View>
                        </TouchableOpacity>
                    )
                }
            )}
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 13,
        borderTopWidth: 1,
        borderTopColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 53
    },
    listItemLastChild: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },
    text: {
        textTransform: 'capitalize',
        fontSize: 18,
        color: 'white'
    }
})
