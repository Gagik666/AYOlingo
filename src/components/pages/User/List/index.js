import React, { useEffect, useState, useRef, useCallback } from 'react'
import moment from 'moment'
import { BsSearch } from 'react-icons/bs'
import {
    Box,
    Flex,
    Heading,
    HStack,
    FormControl,
    InputGroup,
    FormLabel,
    InputLeftElement,
    Input,
    useDisclosure,
} from '@chakra-ui/react'
import { TableContent, TablePagination } from '../../../theme'
import { useSearchUsers, useUser, useSearchExercisesElastic } from '../../../../core/hooks'
import UserModal from './Edit'
import Export from './Export'

const getColumns = (totalLessonsCount) => [
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Progress',
      accessor: 'passedLessonsCount',
      Cell: (passedLessonsCount) => `${Math.round((((passedLessonsCount || 0) / totalLessonsCount) * 100))}%`
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: (createdAt) => moment(createdAt).format('DD-MM-YYYY HH:mm')
    },
]

export default function List () {
    const urlParams = new URLSearchParams(window.location.search)
    const inThrottle = useRef(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { searchExercises } = useSearchExercisesElastic()
    const { searchUsers, isLoading } = useSearchUsers()
    const { user } = useUser()
    const [totalLessonsCount, setTotalLessonsCount] = useState(0);
    const [users, setUsers] = useState()
    const [edit, setEdit] = useState()
    const [filters, setFilters] = useState({
        page: 1,
        data: {
            withProgress: true,
            limit: 10,
            sort: {
                direction: 'asc',
                field: 'createdAt'
            },
            filter: {
                id: { ne: user.id }
            }
        }
    })

    const onPerPageChange = (value) => setFilters(filters => ({
        ...filters,
        data: {
            ...filters.data,
            limit: value
        }
    }))

    const onSort = (field, direction) => setFilters(filters => ({
        ...filters,
        data: {
            ...filters.data,
            sort: {
                direction,
                field
            }
        }
    }))
    
    const onPageChange = (nextToken, page) => setFilters(filters => {
        const newFilters = {...filters}
        if (nextToken) {
            newFilters.page += page
            newFilters.data.nextToken = nextToken
        } else {
            newFilters.page = 1
            delete newFilters.data.nextToken
        }

        return newFilters
    })

    const onChange = useCallback(
        () => {
            onUserModalClose()
            searchUsers(filters.data, {
                onSuccess: (response) => setUsers(response.data.searchUsers)
            })
        },
        [filters, setEdit]
    )

    const onUserModalClose = useCallback(
        () => {
            setEdit()
            onClose()
        },
        [setEdit, onClose]
    )

    const onEdit = useCallback(
        (user) => {
            setEdit(user)
            onOpen()
        },
        [setEdit, onOpen]
    )

    const onSearch = useCallback(
        (value) => {
            const filter = {
                or: [
                    {firstName: {matchPhrasePrefix: value}},
                    {lastName: {matchPhrasePrefix: value}},
                    {email: {matchPhrasePrefix: value}},
                ]
            }
            if (!value) delete filter.or
            const newFilters = {
                ...filters.data,
                filter: {
                    ...filters.data.filter,
                    ...filter
                }
            }
            if (!inThrottle.current) {
                searchUsers(newFilters, {
                    onSuccess: (response) => setUsers(response.data.searchUsers)
                })
                inThrottle.current = true
                setTimeout(() => inThrottle.current = false, 150)
            }
        },
        [inThrottle, filters]
    )

    const getTotalLessonsCount = () => {
        const exercisesFilter = {
            size: 0,
            aggs: {
                lessonsCount: {
                    sum: { field: 'lessonsCount' }
                },
            }
        }
    
        const onSuccess = (response) =>
            setTotalLessonsCount(response.data.aggregations.lessonsCount.value);

        const onError = (error) => console.log('>>> ERROR', error);
    
        searchExercises(exercisesFilter, { onSuccess, onError });
    }

    useEffect(() => {
        searchUsers(filters.data, {
            onSuccess: (response) => setUsers(response.data.searchUsers)
        })
    }, [filters])

    useEffect(() => {
        getTotalLessonsCount()

        if (!urlParams.has('search')) return
        onSearch(urlParams.get('search'))
    }, [])

    return (
        <Box as="section" py="12">
            <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <Box overflowX="auto">
                    <Flex
                        justifyContent="space-between"
                        alignItems="center">
                        <Heading size="lg" mb="6">
                            Users
                        </Heading>
                        <Export />
                    </Flex>
                    <HStack>
                        <FormControl minW={{ md: '320px' }} id="search">
                            <InputGroup size="sm">
                                <FormLabel srOnly>Filter by name or email</FormLabel>
                                <InputLeftElement pointerEvents="none" color="gray.400">
                                    <BsSearch />
                                </InputLeftElement>
                                <Input
                                    defaultValue={urlParams.get('search')}
                                    rounded="base"
                                    type="search"
                                    placeholder="Filter by name, last name or email..."
                                    onChange={e => onSearch(e.target.value)} />
                            </InputGroup>
                        </FormControl>
                    </HStack>
                    <TableContent
                        currentPage={filters.page}
                        sort={filters.data.sort}
                        sortableFields={['firstName', 'lastName', 'createdAt']}
                        columns={getColumns(totalLessonsCount, users)}
                        data={users?.items}
                        editable={true}
                        onEdit={onEdit}
                        onSort={onSort}
                        isLoading={isLoading} />
                    <TablePagination
                        onPageChange={onPageChange}
                        onPerPageChange={onPerPageChange}
                        data={users} />
                </Box>
            </Box>
            {edit && (
                <UserModal
                    data={edit}
                    isOpen={isOpen}
                    onClose={onUserModalClose}
                    onChange={onChange} />
            )}
        </Box>
    )
}
