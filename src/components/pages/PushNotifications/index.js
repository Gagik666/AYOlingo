import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import {
    Box,
    Heading,
    Button,
    Flex,
    useDisclosure,
    Text,
    ButtonGroup,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import moment from 'moment'
import { useSearchPushNotifications } from '../../../core/hooks'
import Modal from './Modal'
import { TableContent } from '../../theme'

const LIMIT = 60;

const COLUMNS = [
    {
        Header: 'Title',
        accessor: 'title'
    },
    {
        Header: 'Body',
        accessor: 'body',
    },
    {
        Header: 'Created at',
        accessor: 'createdAt',
        Cell: (createdAt) => moment(createdAt).format('DD-MM-YYYY HH:mm')
    },
]

const getFiltersFromUrlParams = (urlParams) => {
    const filters = { limit: LIMIT, page: 1 }

    if (urlParams.has('page')) {
        filters.page = parseInt(urlParams.get('page'))
    }

    if (urlParams.has('nextToken')) {
        filters.nextToken = urlParams.get('nextToken')
    }

    return filters
}

const getPaginationItems = (urlParams) => {
    if (!urlParams.has('nextToken')) {
        window.localStorage.setItem('push_notifications_pagination', null);
        return {};
    }
    return JSON.parse(window.localStorage.getItem('push_notifications_pagination')) || {}
}

function PushNotifications () {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const urlParams = new URLSearchParams(window.location.search)
    const loadMoreClickedRef = useRef(null)
    const [loadMoreNextToken, setLoadMoreNextToken] = useState(null)
    const [paginationItems, setPaginationItems] = useState({})
    const { searchPushNotifications, data: pushNotificationsResponse } = useSearchPushNotifications()
    const [filters, setFilters] = useState(getFiltersFromUrlParams(urlParams))

    const pushNotifications = useMemo(
        () => {
            if (!pushNotificationsResponse?.data?.searchPushNotifications?.items) return
            return pushNotificationsResponse.data.searchPushNotifications
        },
        [pushNotificationsResponse]
    )

    const updateLocalStorage = (filters) => {
        const pagination = JSON.parse(window.localStorage.getItem('push_notifications_pagination')) || {}
        pagination[filters.page] = filters.nextToken;
        window.localStorage.setItem('push_notifications_pagination', JSON.stringify(pagination))
        setPaginationItems(pagination);
    }

    const onLoad = (page, nextToken) => {
        loadMoreClickedRef.current = false
        setFilters(filters => ({...filters, page: parseInt(page), nextToken}))
    }

    const onLoadMore = useCallback(
        (paginationItems) => {
            loadMoreClickedRef.current = true
            const paginationItemsEntries = Object.entries(paginationItems)
            const paginationLastItem = paginationItemsEntries[paginationItemsEntries.length - 1]
            let page = filters.page + 1
            let nextToken = pushNotifications.nextToken

            if (paginationLastItem && paginationLastItem[0]) {
                page = parseInt(paginationLastItem[0]) + 1
            }
            if (loadMoreNextToken) {
                nextToken = loadMoreNextToken
            }

            setFilters(filters => ({
                ...filters,
                nextToken,
                page,
            }))
        },
        [pushNotifications, loadMoreNextToken]
    )

    useEffect(() => {
        const searchPushNotificationsFilters = {...filters};
        delete searchPushNotificationsFilters.page;
        searchPushNotificationsFilters.sort = {
            direction: 'desc',
            field: 'createdAt',
        }
        searchPushNotifications(searchPushNotificationsFilters, {
            onSuccess: (response) => {
                if (loadMoreClickedRef.current) {
                    setLoadMoreNextToken(response.data.searchPushNotifications.nextToken);
                }
            }
        })
        let queryParams = `?page=${filters.page}`
        if (filters.nextToken) {
            queryParams += `&nextToken=${filters.nextToken}`
        }
        window.history.pushState({}, '', window.location.pathname + queryParams)

        if (filters.nextToken) {
            updateLocalStorage(filters)
        }
    }, [filters, loadMoreClickedRef])

    useEffect(() => {
        setPaginationItems(getPaginationItems(urlParams));
    }, [])

    return (
        <Box as="section" py="12">
            <Box
                maxW={{ base: 'xl', md: '7xl' }}
                mx="auto"
                px={{ base: '6', md: '8' }}>
                <Box overflowX="auto">
                    <Flex
                        justifyContent="space-between"
                        alignItems="center">
                        <Heading size="lg" mb="6">
                            Push Notifications
                        </Heading>
                        <Button
                            size="sm"
                            onClick={onOpen}>
                            Send push notification
                        </Button>
                    </Flex>
                    <TableContent
                        columns={COLUMNS}
                        data={pushNotifications?.items} />
                    {pushNotificationsResponse && (
                        <>
                            <Flex align="center" justify="space-between">
                                <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
                                    {pushNotifications.total} result{pushNotifications.total > 1 ? 's' : ''}
                                </Text>
                                <Flex>
                                    <ButtonGroup variant="outline" size="sm">
                                        <Button
                                            as="a"
                                            rel="next"
                                            isDisabled={LIMIT * Object.entries({1: null, ...paginationItems}).length >= pushNotifications.total}
                                            onClick={() => {
                                                if (LIMIT * Object.entries({1: null, ...paginationItems}).length >= pushNotifications.total) {
                                                    return;
                                                }
                                                onLoadMore(paginationItems)
                                            }}>
                                            Load More
                                        </Button>
                                    </ButtonGroup>
                                </Flex>
                            </Flex>
                            <Box overflowX="scroll">
                                <ButtonGroup mt={3} variant="outline" size="sm">
                                    {Object.entries({1: null, ...paginationItems}).sort((a, b) => b[0] - a[0]).map(
                                        ([page, nextToken]) => (
                                            <Button
                                                key={`pagination-item-${page}`}
                                                variant={filters.page === parseInt(page) ? 'solid': 'outline'}
                                                onClick={() => onLoad(page, nextToken)}>
                                                {page}
                                            </Button>
                                        )
                                    )}
                                </ButtonGroup>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                onChange={() => {
                    setTimeout(() => window.location.href = `${window.location.origin}/push-notifications`, 500)
                }} />
        </Box>
    )
}

export default PushNotifications
