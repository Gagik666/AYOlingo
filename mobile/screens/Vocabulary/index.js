import React, { useEffect, useState, useCallback, useRef } from 'react'
import { SvgXml } from 'react-native-svg'
import { View, Text, StyleSheet, Pressable, TextInput, FlatList } from 'react-native'
import Loader from '../../components/Loader'
import Wrapper from '../../components/Wrapper'
import { useContent, useSearchVocabularies } from '../../core/hooks'
import Card from './Card'
import * as icons from '../../assets/icons'
import { useTranslation } from '../../core/contexts/TranslationContext'

const Vocabulary = () => {
    const isLoadingMore = useRef(null)
    const inThrottle = useRef(false)
    const [isLoading, toggleLoading] = useState(false)
    const [filters, setFilters] = useState()
    const { t } = useTranslation()
    const { content: { vocabularies, languageGroup, languages }, setContent, loading: contentLoading } = useContent()
    const [languageOrder, setLanguageOrder] = useState([languageGroup.from, languageGroup.to])
    const { refetch: searchVocabularies, data: searchVocabulariesResponse, error: searchVocabulariesError } = useSearchVocabularies(filters)
    
    const onLanguageOrderChange = () => setLanguageOrder(
        (languageOrder) => [languageOrder[1], languageOrder[0]]
    )

    const onSearch = useCallback(
        (value) => {
            value = value.toLowerCase()

            if (!inThrottle.current) {
                setFilters(
                    (filters) => {
                        const newFilters = {...filters}
                        newFilters.filter.or = [
                            {valueFrom: {matchPhrasePrefix: value}},
                            {valueTo: {matchPhrasePrefix: value}},
                            {transliterationFrom: {matchPhrasePrefix: value}},
                            {transliterationTo: {matchPhrasePrefix: value}},
                        ]
                        if (!value) delete newFilters.filter.or
                        if (newFilters.nextToken) delete newFilters.nextToken
                        return newFilters
                    }
                )
                inThrottle.current = true
                setTimeout(() => inThrottle.current = false, 50)
            }
        },
        [languageGroup, inThrottle]
    )

    const loadMore = useCallback(
        () => {
            if (!vocabularies.nextToken) return
            isLoadingMore.current = true
            setFilters(
                (filters) => {
                    const newFilters = {...filters}
                    newFilters.nextToken = vocabularies.nextToken
                    return newFilters
                }
            )
        },
        [vocabularies]
    )

    useEffect(() => {
        // const unsubscribe = navigation.addListener('focus', () => {
            if (filters) {
                if (!filters.nextToken) isLoadingMore.current = false
                toggleLoading(true)
                searchVocabularies()
            }
        // })
        
        // return unsubscribe
    }, [filters])

    useEffect(() => {
        if (!languageGroup) return
        setFilters(
            (filters) => {
                const newFilters = filters ? {...filters} : {filter: {}}
                newFilters.limit = 50
                newFilters.filter = {
                    ...newFilters.filter,
                    _languageGroup: {eq: languageGroup.id},
                }
                return newFilters
            }
        )
        setLanguageOrder([languageGroup.from, languageGroup.to])
    }, [languageGroup])

    useEffect(() => {
        if (!searchVocabulariesResponse || isLoadingMore.current === null) return
        setContent(
            (content) => {
                let newVocabularies = {...content.vocabularies}
                if (isLoadingMore.current) {
                    newVocabularies.nextToken = searchVocabulariesResponse.data.searchVocabularies.nextToken
                    newVocabularies.items = [...newVocabularies.items, ...searchVocabulariesResponse.data.searchVocabularies.items]
                } else {
                    newVocabularies = searchVocabulariesResponse.data.searchVocabularies
                }
                return {
                    ...content,
                    vocabularies: newVocabularies,
                }
            }
        )
        toggleLoading(false)
        if (isLoadingMore.current) isLoadingMore.current = null
    }, [searchVocabulariesResponse, isLoadingMore])

    useEffect(() => {
        if (!searchVocabulariesError) return
        console.log(searchVocabulariesError, ' search vocabularies error')
    }, [searchVocabulariesError])

    return (
        <Wrapper>
            {(contentLoading.module || contentLoading.exercise) && (
                <Loader />
            )}
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {t('Vocabulary')}
                    </Text>
                    <View style={styles.languageSwitcher}>
                        <Text style={styles.language}>
                            {t(languages.find(language => language.id === languageOrder[0]).name)}
                        </Text>
                        <Pressable
                            onPress={onLanguageOrderChange}
                            style={styles.centered}>
                            <SvgXml
                                xml={icons.switcher}
                                width={30}
                                height={30} />
                        </Pressable>
                        <Text style={styles.language}>
                            {t(languages.find(language => language.id === languageOrder[1]).name)}
                        </Text>
                    </View>
                    <View style={styles.searchWrapper}>
                        <TextInput
                            style={styles.search}
                            placeholder={t(`Type a word in ${languages.find(language => language.id === languageOrder[0]).name}`)}
                            onChangeText={onSearch} />
                    </View>
                </View>
                {!contentLoading.module && !contentLoading.exercise && (
                    <FlatList
                        style={styles.vocabularyWrapper}
                        data={vocabularies?.items}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item, index}) => (
                            <Card
                                isLast={index + 1 === vocabularies.items.length}
                                languageOrder={languageOrder}
                                data={item} />
                        )}
                        onEndReachedThreshold={0.01}
                        onEndReached={loadMore} />
                )}
                {isLoading && (
                    <View style={styles.loadingWrapper}>
                        <Text style={styles.loading}>
                            {t('Loading')}
                        </Text>
                    </View>
                )}
            </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
        paddingTop: 40,
    },
    title: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    },
    header: {
        alignItems: 'center'
    },
    languageSwitcher: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'space-between',
        width: '100%',
    },
    centered: {
        position: 'absolute',
        left: '50%',
        transform: [{translateX: -15}]
    },
    language: {
        color: '#fff',
        fontSize: 25
    },
    searchWrapper: {
        marginTop: 15,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 30,
        paddingLeft: 15
    },
    search: {
        width: '100%',
        height: 40,
        fontSize: 17,
    },
    vocabularyWrapper: {
        width: '100%',
        marginVertical: 15,
    },
    loadingWrapper: {
        alignItems: 'center',
        marginBottom: 4,
    },
    loading: {
        color: 'white',
        fontSize: 15
    }
})

export default Vocabulary
