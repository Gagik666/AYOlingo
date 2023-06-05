import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
    Box,
    Flex,
    Heading,
    Button,
} from '@chakra-ui/react'
import { useListAlphabets, useGetLanguageGroup, useLanguageGroups } from '../../../../core/hooks'
import ModifyData from './ModifyData'
import ViewTable from './ViewTable'

const EMPTY_LETTERS = {
    id: new Date().getTime() + Math.random() * 10,
    from: '',
    fromInfo: '',
    to: '',
    toInfo: '',
    audio: '',
    pronunciationLetter: '',
    pronunciationText: '',
    order: 0,
}

export default function Alphabet () {
    const { activeLanguageGroupId } = useLanguageGroups()
    const { listAlphabets, data: alphabetsResponse, isLoading } = useListAlphabets()
    const { getLanguageGroup, data: languageGroupResponse } = useGetLanguageGroup()
    const [modifyData, setModifyData] = useState()

    const alphabet = useMemo(
        () => {
            if (!alphabetsResponse?.data?.listAlphabets?.items) return {}
            return alphabetsResponse.data.listAlphabets.items[0] || {}
        },
        [alphabetsResponse]
    )

    const languageGroup = useMemo(
        () => {
            if (!languageGroupResponse?.data?.getLanguageGroups) return {}
            return languageGroupResponse.data.getLanguageGroups
        },
        [languageGroupResponse]
    )

    const loadAlphabet = () => listAlphabets({
        filter: {
            languageGroup: {eq: activeLanguageGroupId}
        }
    })

    const onClick = useCallback(
        () => {
            if (modifyData) {
                return setModifyData()
            }
            if (alphabet?.letters?.length > 0) {
                const modifiedData = {letters: alphabet.letters}
                modifiedData.letters = modifiedData.letters.map(letter => ({...letter, id: new Date().getTime() * Math.random() * 10}))
                return setModifyData(modifiedData)
            }
            setModifyData({
                letters: [EMPTY_LETTERS]
            })
        },
        [alphabet, languageGroup, modifyData]
    )

    useEffect(() => {
        if (!activeLanguageGroupId) return
        getLanguageGroup(activeLanguageGroupId)
        loadAlphabet()
        setModifyData()
    }, [activeLanguageGroupId])

    if (isLoading) return <></>

    return (
        <Box as="section" py="12">
            <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <Box overflowX="hidden">
                    <Flex
                        justifyContent="space-between"
                        alignItems="center">
                        <Heading size="lg">
                            Alphabet
                        </Heading>
                        <div id="button-group"></div>
                        <Button
                            size="sm"
                            isDisabled={!languageGroup}
                            colorScheme={!modifyData ? 'blue' : 'gray'}
                            onClick={onClick}>
                            {modifyData ? 'Cancel' : (alphabet?.letters?.length > 0) ? 'Edit' : 'Create'}
                        </Button>
                    </Flex>
                    {modifyData ? (
                        <ModifyData
                            alphabet={alphabet}
                            data={modifyData}
                            setModifyData={() => setModifyData()}
                            loadAlphabet={loadAlphabet} />
                    ) : (
                        <ViewTable
                            languageGroup={languageGroup}
                            alphabet={alphabet} />
                    )}
                </Box>
            </Box>
        </Box>
    )
}
