import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Box, Heading, Flex, Button, useDisclosure, useToast, Link, Select } from '@chakra-ui/react'
import { useDeleteLanguageGroup, useListLanguages, useLanguageGroups, useUpdateLanguageGroup } from '../../../../core/hooks'
import { PLEASE_ADD_LANGUAGE } from '../../../../core/constants'
import Create from './Create'
import { TableContent, TablePagination } from '../../../theme'

const COLUMNS = [
    {
      Header: 'From',
      accessor: 'from',
    },
    {
      Header: 'To',
      accessor: 'to',
    },
]

export default function Groups () {
    const urlParams = new URLSearchParams(window.location.search)
    const history = useHistory()
    const location = useLocation()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { languageGroups, listLanguageGroups, isLoading } = useLanguageGroups()
    const { listLanguages, data: languagesResponse } = useListLanguages()
    const { updateLanguageGroup, isLoading: updateLanguageGroupLoading } = useUpdateLanguageGroup()
    const { deleteLanguageGroup } = useDeleteLanguageGroup()
    const [filters, setFilters] = useState({limit: 10})

    const languages = useMemo(
        () => {
            if (!languagesResponse?.data?.listLanguages?.items) return []
            return languagesResponse.data.listLanguages.items
        },
        [languagesResponse]
    )

    const onModalOpen = useCallback(
        () => {
            if (!languages.length < 2) {
                return toast({
                    title: 
                        <Box>
                            {PLEASE_ADD_LANGUAGE}&nbsp;
                            <Link
                                textDecoration="underline"
                                onClick={() => history.push(`/languages/list?create=true&redirectUrl=${location.pathname}`)}>
                                here
                            </Link>
                        </Box>,
                    status: 'warning',
                    isClosable: true,
                })
            }
            onOpen()
        },
        [languages]
    )

    const onCreate = useCallback(
        () => {
            onClose()
            listLanguageGroups(
                {
                    ...filters
                },
                {
                    onSuccess: () => {
                        if (urlParams.has('redirectUrl')) {
                            return history.push(urlParams.get('redirectUrl'))
                        }
                    }
                }
            )
        },
        [filters]
    )

    const onDelete = useCallback(
        (id) => {
            const input = {id}
            deleteLanguageGroup(
                input,
                {
                    onSuccess: () => listLanguageGroups({...filters}),
                    onError: (e) => toast({
                        title: e.message,
                        status: 'error',
                        isClosable: true,
                    })
                }
            )
        },
        [filters]
    )

    const onLanguageChange = (language, id) => {
        const onSuccess = () => {
            listLanguageGroups(
                {
                    ...filters
                },
                {
                    onSuccess: () => {
                        if (urlParams.has('redirectUrl')) {
                            return history.push(urlParams.get('redirectUrl'))
                        }
                    }
                }
            )
        }
        updateLanguageGroup({ id, language }, { onSuccess })
    }

    useEffect(() => {
        listLanguages()
        if (urlParams.has('create')) onModalOpen()
    }, [])

    return (
        <Box as="section" py="12">
            <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <Box overflowX="auto">
                    <Flex
                        justifyContent="space-between"
                        alignItems="center">
                        <Heading size="lg" mb="6">
                            Language Groups
                        </Heading>
                        <Button
                            size="sm"
                            onClick={onModalOpen}>
                            Create new language group
                        </Button>
                    </Flex>
                    <TableContent
                        columns={[
                            ...COLUMNS,
                            {
                                Header: 'Language',
                                accessor: 'language',
                                Cell: (language, id) => (
                                    <Select
                                        isDisabled={updateLanguageGroupLoading}
                                        value={language}
                                        onChange={(e) => onLanguageChange(e.target.value, id)}>
                                        {languages.map(language => (
                                            <option
                                                key={language.id}
                                                value={language.id}>
                                                {language.id}
                                            </option>
                                        ))}
                                    </Select>
                                )
                            }
                        ]}
                        data={languageGroups?.items}
                        isLoading={isLoading}
                        removable={true}
                        onDelete={onDelete} />
                    <TablePagination
                        setFilters={setFilters}
                        data={languageGroups} />
                </Box>
            </Box>
            {languages?.length > 0 && (
                <Create
                    languages={languages}
                    isOpen={isOpen}
                    onClose={onClose}
                    onCreate={onCreate} />
            )}
        </Box>
    )
}
