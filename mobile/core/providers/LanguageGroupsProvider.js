import React, { useCallback, useEffect, useState } from 'react'
// import { useHistory, useLocation } from 'react-router-dom'
import { LanguageGroupContext } from '../contexts'
// import { useListLanguageGroups } from '../../core/hooks'

export default function LanguageGroupsProvider ({
    children
}) {
    // const location = useLocation()
    // const history = useHistory()
    // const [activeLanguageGroup, setActiveLanguageGroupId] = useState()
    // const { listLanguageGroups, data: languageGroupsResponse, isLoading } = useListLanguageGroups()

    // const changeActiveLanguageGroup = useCallback(
    //     (value) => {
    //         const modulesPaths = ['/collection/modules/list', '/collection/modules/list/']
    //         if (location.pathname.includes('/modules/list') && modulesPaths.indexOf(location.pathname) === -1) {
    //             history.push('/collection/modules/list')
    //         }
    //         setActiveLanguageGroupId(value)
    //     },
    //     [setActiveLanguageGroupId, location]
    // )

    // useEffect(() => {
    //     listLanguageGroups()
    // }, [])

    // useEffect(() => {
    //     if (!languageGroupsResponse?.data?.listLanguageGroups?.items) return
    //     setActiveLanguageGroupId(languageGroupsResponse.data.listLanguageGroups.items[0]?.id || '')
    // }, [languageGroupsResponse])

    return (
        <LanguageGroupContext.Provider value={{
            // activeLanguageGroup,
            // setActiveLanguageGroupId: changeActiveLanguageGroup,
            // languageGroups: languageGroupsResponse?.data?.listLanguageGroups,
            // listLanguageGroups,
            // isLoading
        }}>
            {children}
        </LanguageGroupContext.Provider>
    )
}