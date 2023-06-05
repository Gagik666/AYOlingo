import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { LanguageGroupContext } from '../contexts'
import { useListLanguageGroups } from '../../core/hooks'

export default function LanguageGroupsProvider ({
    children
}) {
    const location = useLocation()
    const history = useHistory()
    const [activeLanguageGroup, setActiveLanguageGroup] = useState({})
    const [activeLanguageGroupId, setActiveLanguageGroupId] = useState()
    const { listLanguageGroups, data: languageGroupsResponse, isLoading } = useListLanguageGroups()

    const changeActiveLanguageGroup = useCallback(
        (value) => {
            const modulesPaths = ['/collection/modules/list', '/collection/modules/list/']
            if (location.pathname.includes('/modules/list') && modulesPaths.indexOf(location.pathname) === -1) {
                history.push('/collection/modules/list')
            }
            setActiveLanguageGroupId(value)
            setActiveLanguageGroup(languageGroupsResponse.data.listLanguageGroups.items.find(item => item.id === value))
        },
        [languageGroupsResponse, setActiveLanguageGroupId, location]
    )

    useEffect(() => {
        listLanguageGroups()
    }, [])

    useEffect(() => {
        if (!languageGroupsResponse?.data?.listLanguageGroups?.items) return
        if (!languageGroupsResponse.data.listLanguageGroups.items[0]) {
            return history.push('/languages/groups?create=true')
        }
        setActiveLanguageGroupId(languageGroupsResponse.data.listLanguageGroups.items[0]?.id || '')
        setActiveLanguageGroup(languageGroupsResponse.data.listLanguageGroups.items[0])
    }, [languageGroupsResponse])

    return (
        <LanguageGroupContext.Provider value={{
            activeLanguageGroupId,
            activeLanguageGroup,
            setActiveLanguageGroupId: changeActiveLanguageGroup,
            languageGroups: languageGroupsResponse?.data?.listLanguageGroups,
            listLanguageGroups,
            isLoading
        }}>
            {children}
        </LanguageGroupContext.Provider>
    )
}