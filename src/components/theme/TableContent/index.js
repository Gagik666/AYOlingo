import React, { Fragment } from 'react'
import {
    FaAngleDown,
    FaAngleUp,
} from 'react-icons/fa'
import {
    Button,
    Stack,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue as mode,
} from '@chakra-ui/react'

export default function TableContent ({
    currentPage,
    sortableFields = [],
    sort = {direction: '', field: ''},
    actions,
    customizedColumns,
    data,
    columns,
    size = 'md',
    editable = false,
    removable = false,
    onSort = () => {},
    onChange = () => {},
    onEdit = () => {},
    onDelete = () => {},
}) {
    return (
        <Table
            my="8"
            borderWidth="1px"
            fontSize="sm"
            size={size}>
            <Thead bg={mode('gray.50', 'gray.800')}>
                <Tr>
                    <Th whiteSpace="nowrap" scope="col">
                        #
                    </Th>
                    {columns.map(
                        (column, index) => {
                            const isSortable = sortableFields.includes(column.accessor)
                            return (
                                <Th
                                    whiteSpace="nowrap"
                                    scope="col"
                                    cursor={isSortable ? 'pointer' : ''}
                                    onClick={() => {
                                        if (!isSortable) return
                                        onSort(column.accessor, sort.direction === 'asc' ? 'desc' : 'asc')
                                    }}
                                    key={`heading-${column.Header}-${index}`}>
                                    {column.Header}&nbsp;
                                    {column.accessor === sort.field && (
                                        <Fragment>
                                            {sort.direction === 'asc' ? (
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
                    {customizedColumns?.map(
                        (customizedColumn, index) => (
                            <Th whiteSpace="nowrap" scope="col" key={`heading-${customizedColumn.Header}-${index}`}>
                                {customizedColumn.Header}
                            </Th>
                        )
                    )}
                    {(editable || removable) && (
                        <Th whiteSpace="nowrap" scope="col">
                            Actions
                        </Th>
                    )}
                </Tr>
            </Thead>
            <Tbody>
                {data?.map(
                    (row, index) => (
                        <Tr key={row.id}>
                            <Td>{currentPage ? (currentPage - 1)  * 10 + index + 1 :index + 1}</Td>
                            {columns.map((column, index) => {
                                const cell = row[column.accessor]
                                const element = column.Cell?.(cell, row.id) ?? cell
                                return (
                                    <Td whiteSpace="nowrap" key={index}>
                                        {element}
                                    </Td>
                                )
                            })}
                            {customizedColumns?.map(
                                ({Header, Component}) => (
                                    <Td key={`action-${Header}`}>
                                        <Component
                                            row={row}
                                            onChange={onChange}
                                            onEdit={onEdit} />
                                    </Td>
                                )
                            )}
                            {(actions || editable || removable) && (
                                <Td textAlign="right">
                                    <Stack
                                        direction="row"
                                        spacing={1}>
                                        {actions?.map(
                                            ({Component}, index) => (
                                                <Component
                                                    key={`action-${index}`}
                                                    row={row}
                                                    onChange={onChange}
                                                    onEdit={onEdit} />
                                            )
                                        )}
                                        {editable && (
                                            <Button
                                                variant="link"
                                                colorScheme="blue"
                                                size="sm"
                                                onClick={() => onEdit(row)}>
                                                Edit
                                            </Button>
                                        )}
                                        {removable && (
                                            <Button
                                                variant="link"
                                                colorScheme="red"
                                                size="sm"
                                                onClick={() => onDelete(row.id)}>
                                                Delete
                                            </Button>
                                        )}
                                    </Stack>
                                </Td>
                            )}
                        </Tr>
                    )
                )}
            </Tbody>
        </Table>
    )
}