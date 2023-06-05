import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { ContentContext } from '../contexts'
import { useSearchExercises, useSearchModules, useSearchVocabularies, useAlphabetsByLanguageGroup, useSecureStore } from '../hooks'
import { useSetKeyOnExercises } from '../helpers'

function ContentProvider({
    data: existingContent,
    children,
}) {
    const exercisesRef = useRef({ items: [] });
    const modulesRef = useRef({ items: [] });
    const setKeyOnExercises = useSetKeyOnExercises()
    const [loading, setLoading] = useState({ exercise: true, module: true });
    const [content, setContent] = useState(existingContent)
    const { getItem, setItem } = useSecureStore()

    const vocabulariesFilter = useMemo(
        () => ({
            limit: 50,
            filter: {
                _languageGroup: {
                    eq: content.languageGroup.id,
                },
            }
        }),
        [content.languageGroup]
    )

    const { mutate: searchExercises, error: searchExercisesError } = useSearchExercises()
    const { mutate: alphabetsByLanguageGroup } = useAlphabetsByLanguageGroup()
    const { mutate: searchModules } = useSearchModules()
    const { refetch: searchVocabularies, data: searchVocabulariesResponse } = useSearchVocabularies(vocabulariesFilter)

    const loadAllExercises = useCallback(
        (from = 0, limit = 30) => {
            searchExercises(
                {
                    limit,
                    from,
                    filter: {
                        _languageGroup: {
                            eq: content.languageGroup.id,
                        },
                        published: {
                            eq: true,
                        }
                    }
                },
                {
                    onSuccess: async (response) => {
                        console.log('>>> SETTING EXERCISES')
                        setContent(oldContent => {
                            const content = {...oldContent}
                            if (content.exercises) {
                                content.exercises = {
                                    ...response.data.searchExercises,
                                    items: [...content.exercises.items, ...setKeyOnExercises(response.data.searchExercises.items)],
                                }
                            } else {
                                content.exercises = {...response.data.searchExercises, items: setKeyOnExercises(response.data.searchExercises)}
                            }
                            return content
                        })
                        exercisesRef.current = {
                            ...response.data.searchExercises,
                            items: [...exercisesRef.current.items, setKeyOnExercises(response.data.searchExercises.items)]
                        }
                        if (from < response.data.searchExercises.total) {
                            loadAllExercises(from + 30)
                        } else {
                            setLoading(loading => ({ ...loading, exercise: false }))
                        }
                    },
                    onError: (e) => console.log('>>> GET EXERCISES ERROR', e)
                }
            )
        },
        [content.languageGroup]
    )

    const loadAllModules = useCallback(
        (from = 0, limit = 30) => {
            searchModules(
                {
                    sort: {
                        direction: 'asc',
                        field: 'order',
                    },
                    filter: {
                        _languageGroup: {
                            eq: content.languageGroup.id,
                        },
                        published: {
                            eq: true,
                        }
                    },
                    from,
                    limit
                },
                {
                    onSuccess: async (response) => {
                        if (modulesRef.current.items.length === 0) {
                            try {
                                await setItem(
                                    'modules',
                                    JSON.stringify({
                                        items: response.data.searchModules.items.slice(0, 10).map(item => ({
                                            id: item.id,
                                            name: item.name,
                                            image: item.image,
                                            cached: true,
                                        })),
                                    })
                                );
                                console.log('>>>> LOGGER - MODULES CACHED SUCCESSFULLY')
                            } catch (e) {
                                console.log('>>>> LOGGER - CACHING MODULES ERROR', JSON.stringify(e))
                            }
                        }
                        console.log('>>> SETTING MODULES')
                        setContent(oldContent => {
                            const content = {...oldContent}
                            if (content.modules) {
                                content.modules = {
                                    ...response.data.searchModules,
                                    items: [...content.modules.items, ...response.data.searchModules.items].filter(item => !item.cached),
                                }
                            } else {
                                content.modules = {...response.data.searchModules, items: response.data.searchModules}
                            }
                            return content
                        })
                        modulesRef.current = {
                            ...response.data.searchModules,
                            items: [...modulesRef.current.items, ...response.data.searchModules.items]
                        }
                        if (from < response.data.searchModules.total) {
                            loadAllModules(from + 30)
                        } else {
                            setLoading(loading => ({ ...loading, module: false }))
                        }
                    },
                    onError: (e) => console.log('>>> GET MODULES ERROR', e)
                }
            )
        },
        [content.languageGroup]
    )

    useEffect(() => {
        alphabetsByLanguageGroup(
            {
                languageGroup: content.languageGroup.id
            },
            {
                onSuccess: (response) => {
                    console.log('>>> SETTING ALPHABETS');
                    setContent(content => ({...content, alphabet: response.data.alphabetByLanguageGroup.items[0]}));
                }
            }
        )
        loadAllModules()
        loadAllExercises()
    }, [content.languageGroup.id])

    useEffect(() => {
        if (!vocabulariesFilter) return
        searchVocabularies()
    }, [vocabulariesFilter])

    useEffect(() => {
        if (!searchVocabulariesResponse) return
        console.log('>>> SETTING VOCABULARIES')
        setContent(content => ({...content, vocabularies: searchVocabulariesResponse.data.searchVocabularies}))
    }, [searchVocabulariesResponse])

    useEffect(() => {
        if (!searchExercisesError) return
        console.log(searchExercisesError, ' search exercise error')
    }, [searchExercisesError])

    useEffect(() => {
        ;(async () => {
            const modules = await getItem('modules');
            if (modules) {
                console.log('>>> SETTING MODULES')
                setContent(content => ({...content, modules: JSON.parse(modules)}))
            }
            const languageGroup = await getItem('languageGroup');
            if (languageGroup) {
                console.log('>>> SETTING LANGUAGE GROUP')
                setContent(content => ({...content, languageGroup: JSON.parse(languageGroup)}))
            }
        })()
    }, [])

    useEffect(() => {
        setLoading({ exercise: true, module: true })
    }, [content.languageGroup?.id])

    useEffect(() => {
        console.log(`${content.modules.items.length} - modules and ${content.exercises.items.length} - exercises`)
    }, [content])

    return (
        <ContentContext.Provider value={{ content, loading, setContent, modulesRef, exercisesRef }}>
            {children}
        </ContentContext.Provider>
    )
}

export default ContentProvider
