import { useState, useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import {
    useListLanguageGroups,
    useListLanguages,
} from '.'
import { userUseCase } from '../factories'

const useCachedResources = () => {
    const [user, setUser] = useState(null)
    const [data, setData] = useState(null)
    const { listLanguageGroups, data: languageGroupsResponse } = useListLanguageGroups()
    const { listLanguages, data: languagesResponse } = useListLanguages()

    useEffect(() => {
        listLanguages()
        listLanguageGroups()
        userUseCase
            .getSignedInUser()
            .then(user => setUser(user || {}))
            .catch(
                (e) => {
                    console.log('getting signed in user error -> ', e)
                    setUser({})
                }
            )
    }, [])

    useEffect(() => {
        if (!user || !languageGroupsResponse || !languagesResponse) return
        setData({
            user,
            content: {
                languageGroups: languageGroupsResponse.data.listLanguageGroups.items,
                languageGroup: languageGroupsResponse.data.listLanguageGroups.items[0],
                languages: languagesResponse.data.listLanguages.items,
                modules: {items: []},
                exercises: {items: []},
                vocabularies: {items: []}
            }
        })
        SplashScreen.hideAsync()
    }, [user, languageGroupsResponse, languagesResponse])

    return data
}

export default useCachedResources
