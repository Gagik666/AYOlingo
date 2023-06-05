import React, { useState, useCallback, useEffect, Fragment } from 'react'
import arrayMove from 'array-move'
import moment from 'moment'
import { FaAngleDown, FaAngleUp, } from 'react-icons/fa'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { Link as ReactLink, useHistory, useLocation } from 'react-router-dom'
import {
    Box,
    ButtonGroup,
    Heading,
    Flex,
    Button,
    useDisclosure,
    useToast,
    Link,
    Image,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Stack,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import { useDeleteModule, useModule, useLanguageGroups, useGetModule, useUpdateModule } from '../../../../core/hooks'
import { PLEASE_ADD_LANGUAGE_GROUP, S3_BUCKET } from '../../../../core/constants'
import Modal from '../Modal'
import CloneButton from './CloneButton'
import PublishButton from './PublishButton'
import RegressionList from './RegressionList'
import { TablePagination } from '../../../theme'

const COLUMNS = [
    {
        Header: 'Order',
        accessor: 'order',
    },
    {
        Header: 'Image',
        accessor: 'image',
        Cell: ({image}) => (
            <Image
                src={S3_BUCKET + image}
                alt="image"
                objectFit="cover"
                maxWidth="140px"
                height="90px" />
        )
    },
    {
        Header: 'Name',
        accessor: 'name',
        Cell: ({name, id}) => (
            <Link
                as={ReactLink}
                to={`/collection/modules/list/${id}/lessons`}
                textDecoration="underline !important">
                {name}
            </Link>
        )
    },
    {
        Header: 'Duration',
        accessor: 'duration',
    },
    {
        Header: 'Speaker Gender',
        accessor: 'speakerGender',
    },
    {
        Header: 'Difficulty',
        accessor: 'difficulty',
    },
    {
        Header: 'Created At',
        accessor: 'createdAt',
        Cell: ({createdAt}) => moment(createdAt).format('DD-MM-YYYY HH:mm')
    },
]

const CUSTOMIZED_COLUMNS = [
    {
        Header: 'Published',
        Component: PublishButton,
    },
    {
        Header: 'Regression',
        Component: RegressionList,
    },
]

export default function List () {
    const urlParams = new URLSearchParams(window.location.search)
    const location = useLocation()
    const history = useHistory()
    const toast = useToast()
    const { updateModule } = useUpdateModule()
    const { activeLanguageGroupId } = useLanguageGroups()
    const { modules, setModules, loadModules } = useModule()
    const [filters, setFilters] = useState(() => {
        const newFilters = {data: {limit: 10, sort: {direction: 'asc', field: 'order'}}, page: 1}
        if (urlParams.has('page')) {
            const page = parseInt(urlParams.get('page'))
            newFilters.page = page
            newFilters.data.from = (page - 1) * 10
        }
        return newFilters
    })
    const [allowSort, toggleSort] = useState(false)
    const [edit, setEdit] = useState()
    const { getModule } = useGetModule()
    const { deleteModule } = useDeleteModule()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const saveSortChanges = useCallback(
        () => {
            modules.items.map(
                (module, index) => {
                    const newModule = {...module}
                    delete newModule.createdAt
                    newModule.order = (filters.page - 1) * filters.data.limit + index + 1
                    updateModule(newModule)
                }
            )
            toggleSort(false)
        },
        [modules, filters]
    )

    const onSort = useCallback(
        (accessor, direction = 'desc') => {
            setFilters(filters => ({
                ...filters,
                data: {
                    ...filters.data,
                    sort: {
                        field: accessor,
                        direction
                    },
                }
            }))
        },
        [filters, activeLanguageGroupId]
    )

    const onModalOpen = useCallback(
        () => {
            if (!activeLanguageGroupId) {
                return toast({
                    title: 
                        <Box>
                            {PLEASE_ADD_LANGUAGE_GROUP}&nbsp;
                            <Link
                                textDecoration="underline"
                                onClick={() => history.push(`/languages/groups?create=true&redirectUrl=${location.pathname}`)}>
                                here
                            </Link>
                        </Box>,
                    status: 'warning',
                    isClosable: true,
                })
            }
            onOpen()
        },
        [activeLanguageGroupId]
    )

    const onEdit = useCallback(
        (data) => {
            setEdit(data)
            onOpen()
        },
        [setEdit]
    )

    const onSortEnd = useCallback(
        ({oldIndex, newIndex}) => {
            setModules(
                (oldModules) => {
                    const newModules = {...oldModules}
                    newModules.items = arrayMove(newModules.items, oldIndex, newIndex)
                    return newModules
                }
            )
        },
        []
    )

    const onDelete = useCallback(
        (id) => {
            const input = {id}
            deleteModule(
                input,
                {
                    onSuccess: () => loadModules(filters.data),
                    onError: (e) => toast({
                        title: e.message,
                        status: 'error',
                        isClosable: true,
                    })
                }
            )
        },
        [filters, activeLanguageGroupId]
    )

    const onModalClose = useCallback(
        () => {
            setEdit()
            onClose()
        },
        [setEdit]
    )

    const onChange = useCallback(
        () => {
            onClose()
            loadModules(filters.data)
        },
        [activeLanguageGroupId, filters]
    )

    const onPageChange = useCallback(
        (nextToken, page) => {
            setFilters(filters => {
                const newFilters = {...filters}
                newFilters.page = newFilters.page + page <= 1 ? 1 : newFilters.page + page
                newFilters.data.from = newFilters.page === 1 ? 0 : (newFilters.page - 1) * newFilters.data.limit

                return newFilters
            })
        },
        [setFilters]
    )

    useEffect(() => {
        if (!urlParams.has('edit')) return
        getModule(
            urlParams.get('edit'),
            {
                onSuccess: (response) => onEdit(response.data.getModule)
            }
        )
    }, [])

    useEffect(() => {
        if (!filters?.data?.filter?._languageGroup?.eq) return
        loadModules(filters.data)
    }, [filters])

    useEffect(() => {
        setFilters(filters => ({
            ...filters,
            data: {
                ...filters.data,
                filter: {
                    ...filters.data.filter,
                    _languageGroup: {eq: activeLanguageGroupId},
                }
            }
        }))
    }, [activeLanguageGroupId])

    const SortableItem = SortableElement(
        ({
            row,
            sIndex,
            data
        }) => (
            <Tr key={row.id}>
                <Td>{(filters.page - 1) * filters.data.limit + sIndex + 1}</Td>
                {COLUMNS.map((column, index) => {
                    const cell = row[column.accessor]
                    const element = column.Cell?.(row) ?? cell
                    return (
                        <Td whiteSpace="nowrap" key={index}>
                            {element}
                        </Td>
                    )
                })}
                {CUSTOMIZED_COLUMNS?.map(
                    ({Header, Component}) => (
                        <Td key={`action-${Header}`}>
                            <Component
                                row={row}
                                onChange={onChange}
                                onEdit={onEdit} />
                        </Td>
                    )
                )}
                <Td textAlign="right">
                    <Stack
                        direction="row"
                        spacing={1}>
                        <Button
                            as={ReactLink}
                            variant="link"
                            colorScheme="orange"
                            size="sm"
                            to={`/collection/modules/list/${row.id}/missing-audios`}>
                            Missing Audios
                        </Button>
                        <CloneButton
                            row={row}
                            onChange={onChange}
                            onEdit={onEdit} />
                        <Button
                            variant="link"
                            colorScheme="blue"
                            size="sm"
                            onClick={() => onEdit(row)}>
                            Edit
                        </Button>
                        <Button
                            variant="link"
                            colorScheme="red"
                            size="sm"
                            onClick={() => onDelete(row.id)}>
                            Delete
                        </Button>
                    </Stack>
                </Td>
            </Tr>
        )
    )

    const SortableList = SortableContainer(
        ({item, data}) => (
            <Tbody>
                {data?.map(
                    (row, index) => (
                        <SortableItem
                            key={`module-${row.id}-${row.order}`}
                            disabled={!allowSort}
                            index={index}
                            sIndex={index}
                            row={row}
                            data={data} />
                    )
                )}
            </Tbody>
        )
    )

    return (
        <Box as="section" py="12">
            <Box
                maxW={{ base: 'xl', md: '7xl' }}
                mx="auto"
                px={{ base: '6', md: '8' }}>
                <Flex
                    justifyContent="space-between"
                    alignItems="center">
                    <Heading size="lg" mb="6">
                        Modules
                    </Heading>
                    <ButtonGroup>
                        {allowSort ? (
                            <>
                                <Button
                                    size="sm"
                                    colorScheme="blue"
                                    onClick={saveSortChanges}>
                                    Save
                                </Button>
                                <Button
                                    size="sm"
                                    colorScheme="red"
                                    onClick={() => toggleSort(sort => !sort)}>
                                    Discard
                                </Button>
                            </>
                        ) : (
                            <Button
                                size="sm"
                                colorScheme="blue"
                                onClick={() => toggleSort(true)}>
                                Allow sort
                            </Button>
                        )}
                        <Button
                            size="sm"
                            onClick={onModalOpen}>
                            Create new module
                        </Button>
                    </ButtonGroup>
                </Flex>
                <Box
                    w="100%"
                    my="8"
                    overflowX="auto">
                    <Table
                        borderWidth="1px"
                        fontSize="sm">
                        <Thead bg={mode('gray.50', 'gray.800')}>
                            <Tr>
                                <Th whiteSpace="nowrap" scope="col">
                                    #
                                </Th>
                                {COLUMNS.map(
                                    (column, index) => {
                                        const isSortable = ['createdAt', 'order', 'name'].includes(column.accessor)
                                        return (
                                            <Th
                                                whiteSpace="nowrap"
                                                scope="col"
                                                cursor={isSortable ? 'pointer' : ''}
                                                onClick={() => onSort(column.accessor, filters.data.sort.direction === 'asc' ? 'desc' : 'asc')}
                                                key={`heading-${column.Header}-${index}`}>
                                                {column.Header}&nbsp;
                                                {filters.data.sort.field === column.accessor && (
                                                    <Fragment>
                                                        {filters.data.sort.direction === 'asc' ? (
                                                            <FaAngleUp style={{display: 'inline-block'}} />
                                                        ) : (
                                                            <FaAngleDown style={{display: 'inline-block'}} />
                                                        )}
                                                    </Fragment>
                                                )}
                                            </Th>
                                        )
                                    })
                                }
                                {CUSTOMIZED_COLUMNS?.map(
                                    (customizedColumn, index) => (
                                        <Th whiteSpace="nowrap" scope="col" key={`heading-${customizedColumn.Header}-${index}`}>
                                            {customizedColumn.Header}
                                        </Th>
                                    )
                                )}
                                <Th whiteSpace="nowrap" scope="col">
                                    Actions
                                </Th>
                            </Tr>
                        </Thead>
                        <SortableList
                            items={modules ? modules.items : []}
                            data={modules?.items}
                            pressDelay={100}
                            onSortEnd={onSortEnd} />
                    </Table>
                </Box>
                <TablePagination
                    pageName="module"
                    page={filters.page}
                    filter={filters}
                    setFilters={setFilters}
                    onPageChange={onPageChange}
                    data={modules} />
            </Box>
            <Modal
                data={edit}
                isOpen={isOpen}
                onClose={onModalClose}
                onChange={onChange} />
        </Box>
    )
}
