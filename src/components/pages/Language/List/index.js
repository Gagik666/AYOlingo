import React, { useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Heading, Flex, Button, useDisclosure, useToast } from '@chakra-ui/react'
import { useListLanguages,  useDeleteLanguage } from '../../../../core/hooks'
import Create from './Create'
import { TableContent, TablePagination } from '../../../theme'

const COLUMNS = [
    {
      Header: 'Code',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
]

export default function List () {
    const urlParams = new URLSearchParams(window.location.search)
    const history = useHistory()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { listLanguages, data: languagesResponse, isLoading } = useListLanguages()
    const { deleteLanguage } = useDeleteLanguage()
    const [filters, setFilters] = useState({limit: 10})

    const onCreate = useCallback(
        () => {
            if (urlParams.has('redirectUrl')) {
                return history.push(urlParams.get('redirectUrl'))
            }
            onClose()
            listLanguages({...filters})
        },
        [filters]
    )

    const onDelete = useCallback(
        (id) => {
            const input = {id}
            deleteLanguage(
                input,
                {
                    onSuccess: () => listLanguages({...filters}),
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

    useEffect(() => {
        listLanguages(filters)
    }, [filters])

    useEffect(() => {
        if (urlParams.has('create')) onOpen()
    }, [])

    return (
        <Box as="section" py="12">
            <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <Box overflowX="auto">
                    <Flex
                        justifyContent="space-between"
                        alignItems="center">
                        <Heading size="lg" mb="6">
                            Languages
                        </Heading>
                        <Button
                            size="sm"
                            onClick={onOpen}>
                            Create new language
                        </Button>
                    </Flex>
                    <TableContent
                        columns={COLUMNS}
                        data={languagesResponse?.data?.listLanguages?.items}
                        isLoading={isLoading}
                        removable={true}
                        onDelete={onDelete} />
                    <TablePagination
                        setFilters={setFilters}
                        data={languagesResponse?.data?.listLanguages} />
                </Box>
            </Box>
            <Create
                isOpen={isOpen}
                onClose={onClose}
                onCreate={onCreate} />
        </Box>
    )
}
