import React, { useMemo, useEffect, useCallback, useState } from 'react'
import { Link as ReactLink } from 'react-router-dom'
import {
    Box,
    Heading,
    Link,
    Table,
    Thead,
    TableCaption,
    Tr,
    Th,
    Tbody,
    Td,
    Text,
    Flex,
    Select,
    ButtonGroup,
    Button,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import moment from 'moment'
import { useSearchFeedbacks, useSearchModules, useSearchExercises } from '../../../core/hooks'
import { FEEDBACK_TYPES, EXERCISE_TYPES } from '../../../core/constants'

const getFiltersFromUrlParams = (urlParams) => {
    const filters = {}
    if (urlParams.has('limit')) {
        filters.limit = parseInt(urlParams.get('limit'))
    } else {
        filters.limit = 10
    }

    if (urlParams.has('from')) {
        filters.from = parseInt(urlParams.get('from'))
    } else {
        filters.from = 0
    }

    return filters
}

function Feedback () {
    const urlParams = new URLSearchParams(window.location.search)
    const { searchFeedbacks, data: feedbacksResponse, isLoading } = useSearchFeedbacks()
    const { searchModules, data: modulesResponse } = useSearchModules()
    const { searchExercises, data: exercisesResponse } = useSearchExercises()
    const [filters, setFilters] = useState(getFiltersFromUrlParams(urlParams))
    
    const feedbacks = useMemo(
        () => {
            if (!feedbacksResponse?.data?.searchFeedbacks?.items) return
            return feedbacksResponse.data.searchFeedbacks
        },
        [feedbacksResponse]
    )

    const modules = useMemo(
        () => {
            if (!modulesResponse?.data?.searchModules?.items) return
            return modulesResponse.data.searchModules.items
        },
        [modulesResponse]
    )

    const exercises = useMemo(
        () => {
            if (!exercisesResponse?.data?.searchExercises?.items) return
            return exercisesResponse.data.searchExercises.items
        },
        [exercisesResponse]
    )

    const onNext = useCallback(
        () => {
            setFilters(filters => ({
                ...filters,
                from: filters.from + filters.limit
            }))
        },
        []
    )

    const onPrev = useCallback(
        () => {
            setFilters(filters => ({
                ...filters,
                from: filters.from - filters.limit < 0 ? 0 : filters.from - filters.limit
            }))
        },
        []
    )

    const onPerPageChange = useCallback(
        (e) => {
            setFilters(filters => ({
                ...filters,
                limit: e.target.value,
            }))
        },
        []
    )

    useEffect(() => {
        searchFeedbacks(
            {
                sort: {
                    field: 'createdAt',
                    direction: 'desc'
                },
                limit: filters.limit,
                from: filters.from,
            },
            {
                onSuccess: (feedbacksResponse) => {
                    const feedbacks = feedbacksResponse.data.searchFeedbacks.items
                    if (feedbacks?.length === 0) return
                    const moduleFilter = {
                        filter: {
                            or: []
                        }
                    }
                    const exerciseFilter = {
                        filter: {
                            or: []
                        }
                    }
                    feedbacks.map(feedback => {
                        moduleFilter.filter.or.push({
                            id: {eq: feedback._module}
                        })
                        exerciseFilter.filter.or.push({
                            id: {eq: feedback._exercise}
                        })
                    })
                    searchExercises(exerciseFilter)
                    searchModules(moduleFilter)
                }
            }
        )
        window.history.pushState({}, '', window.location.pathname + `?from=${filters.from}&limit=${filters.limit}`)
    }, [filters])

    return (
        <Box as="section" py="12">
            <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <Box overflowX="auto">
                    <Heading size="lg" mb="6">
                        Feedbacks
                    </Heading>
                    <Table
                        my="8"
                        borderWidth="1px">
                        {(!feedbacks && !isLoading) && <TableCaption>Nothing to show</TableCaption>}
                        <Thead bg={mode('gray.50', 'gray.800')}>
                            <Tr>
                                <Th whiteSpace="nowrap" scope="col">
                                    Type
                                </Th>
                                <Th whiteSpace="nowrap" scope="col">
                                    Device brand
                                </Th>
                                <Th whiteSpace="nowrap" scope="col">
                                    Device OS version
                                </Th>
                                <Th whiteSpace="nowrap" scope="col">
                                    Device model name
                                </Th>
                                <Th whiteSpace="nowrap" scope="col">
                                    User
                                </Th>
                                <Th whiteSpace="nowrap" scope="col">
                                    Module
                                </Th>
                                <Th whiteSpace="nowrap" scope="col">
                                    Exercise
                                </Th>
                                <Th whiteSpace="nowrap" scope="col">
                                    Created At
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {feedbacks?.items.map(
                                (feedback) => {
                                    const module = modules && modules && modules.find(module => feedback._module === module.id)
                                    const exercise = exercises && exercises.find(exercise => feedback._exercise === exercise.id)?.lessons[feedback.lesson].exercises[feedback.exercise]?.type
                                    return (
                                        <Tr key={`feedback-${feedback.id}`}>
                                            <Td whiteSpace="nowrap" scope="col">
                                                {FEEDBACK_TYPES[feedback.type]}
                                            </Td>
                                            <Td>
                                                {feedback.device.brand}
                                            </Td>
                                            <Td>
                                                {feedback.device.osVersion}
                                            </Td>
                                            <Td>
                                                {feedback.device.modelName}
                                            </Td>
                                            <Td>
                                                <Link
                                                    as={ReactLink}
                                                    to={`/users/list?search=${feedback.user.email}`}
                                                    target="_blank"
                                                    color={mode('blue.500', 'blue.300')}>
                                                    {feedback.user.email}
                                                </Link>
                                            </Td>
                                            <Td whiteSpace="nowrap" scope="col">
                                                {module && (
                                                    <Link
                                                        as={ReactLink}
                                                        to={`/collection/modules/list/${module.id}/lessons`}
                                                        target="_blank"
                                                        color={mode('blue.500', 'blue.300')}>
                                                        {module.name}
                                                    </Link>
                                                )}
                                            </Td>
                                            <Td whiteSpace="nowrap" scope="col">
                                                {exercise && module && (
                                                    <Link
                                                        as={ReactLink}
                                                        to={`/collection/modules/list/${module.id}/lesson/${feedback.lesson}/edit-exercise/${feedback.exercise}`}
                                                        target="_blank"
                                                        color={mode('blue.500', 'blue.300')}>
                                                        {EXERCISE_TYPES[exercise]}
                                                    </Link>
                                                )}
                                            </Td>
                                            <Td whiteSpace="nowrap" scope="col">
                                                {moment(feedback.createdAt).format('YYYY-MM-DD HH:mm')}
                                            </Td>
                                        </Tr>
                                    )
                                }
                            )}
                        </Tbody>
                    </Table>
                    {feedbacks && (
                        <Flex align="center" justify="space-between">
                            <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
                                {feedbacks.total} result{feedbacks.total > 1 ? 's' : ''}
                            </Text>
                            <Flex>
                                <Select
                                    value={filters.limit}
                                    onChange={onPerPageChange}
                                    maxWidth={200}
                                    size="sm"
                                    mr={3}>
                                    <option value="10">10</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </Select>
                                <ButtonGroup variant="outline" size="sm">
                                    <Button
                                        as="a"
                                        rel="prev"
                                        disabled={filters.from === 0}
                                        onClick={onPrev}>
                                        Previous
                                    </Button>
                                    <Button
                                        as="a"
                                        rel="next"
                                        disabled={filters.from + 1 >= feedbacks.total || feedbacks.total < filters.limit}
                                        onClick={onNext}>
                                        Next
                                    </Button>
                                </ButtonGroup>
                            </Flex>
                        </Flex>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default Feedback
