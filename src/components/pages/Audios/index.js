import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import {
    Box,
    Heading,
    SimpleGrid,
    Flex,
    ButtonGroup,
    Button,
    Text,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import { useSearchAudios } from '../../../core/hooks'
import Audio from './Audio'

const getFiltersFromUrlParams = (urlParams) => {
    const filters = { limit: 60, page: 1 }

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
        window.localStorage.setItem('pagination', null);
        return {};
    }
    return JSON.parse(window.localStorage.getItem('pagination')) || {}
}

export default function Audios () {
    const urlParams = new URLSearchParams(window.location.search)
    const loadMoreClickedRef = useRef(null)
    const [loadMoreNextToken, setLoadMoreNextToken] = useState(null)
    const [paginationItems, setPaginationItems] = useState(getPaginationItems(urlParams))
    const [filters, setFilters] = useState(getFiltersFromUrlParams(urlParams))
    const { searchAudios, data: audiosResponse } = useSearchAudios()
    const audios = useMemo(
        () => {
            if (!audiosResponse?.data?.searchAudio?.items) return
            return audiosResponse.data.searchAudio
        },
        [audiosResponse]
    )

    const onLoadMore = useCallback(
        (paginationItems) => {
            loadMoreClickedRef.current = true
            const paginationItemsEntries = Object.entries(paginationItems)
            const paginationLastItem = paginationItemsEntries[paginationItemsEntries.length - 1]
            let page = filters.page + 1
            let nextToken = audios.nextToken

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
        [audios, loadMoreNextToken]
    )

    const onLoad = (page, nextToken) => {
        loadMoreClickedRef.current = false
        setFilters(filters => ({...filters, page: parseInt(page), nextToken}))
    }

    const updateLocalStorage = (filters) => {
        const pagination = JSON.parse(window.localStorage.getItem('pagination')) || {}
        pagination[filters.page] = filters.nextToken;
        window.localStorage.setItem('pagination', JSON.stringify(pagination))
        setPaginationItems(pagination);
    }

    useEffect(() => {
        const listAudiosFilters = {...filters};
        delete listAudiosFilters.page;
        searchAudios(listAudiosFilters, {
            onSuccess: (response) => {
                if (loadMoreClickedRef.current) {
                    setLoadMoreNextToken(response.data.searchAudio.nextToken);
                }
            }
        })
        let queryParams = `?page=${filters.page}`
        if (filters.nextToken) {
            queryParams += `&nextToken=${filters.nextToken}`
        }
        window.history.pushState({}, '', window.location.pathname + queryParams)

        if (filters.nextToken) updateLocalStorage(filters)
    }, [filters, loadMoreClickedRef])

    return (
        <Box as="section" py="12">
            <Box
                maxW={{ base: 'xl', md: '7xl' }}
                mx="auto"
                px={{ base: '6', md: '8' }}>
                <Box overflowX="auto">
                    <Heading size="lg" mb="6">
                        Audios
                    </Heading>
                </Box>
                <SimpleGrid
                    columns={4}
                    gap={20}
                    mb="3">
                    {audios && audios.items.map(
                        (audio) => (
                            <Audio
                                key={audio.id}
                                audio={audio} />
                        )
                    )}
                </SimpleGrid>
                {audios && (
                    <>
                        <Flex align="center" justify="space-between">
                            <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
                                {audios.total} result{audios.total > 1 ? 's' : ''}
                            </Text>
                            <Flex>
                                <ButtonGroup variant="outline" size="sm">
                                    <Button
                                        as="a"
                                        rel="next"
                                        disabled={!audios.nextToken}
                                        onClick={() => onLoadMore(paginationItems)}>
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
    )
}
