import React, { useState, useRef, useCallback } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import {
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
    ButtonGroup,
    IconButton,
    Button,
    useToast,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import { useUpdateAlphabet, useLanguageGroups } from '../../../../../core/hooks'
import TableRow from './TableRow'

export default function ModifyData ({
    data: existingData,
    alphabet,
    setModifyData,
    loadAlphabet,
}) {
    const dataRef = useRef(existingData)
    const toast = useToast()
    const [data, setData] = useState(existingData)
    const { updateAlphabet, isLoading } = useUpdateAlphabet()
    const { activeLanguageGroup } = useLanguageGroups()

    const onSortEnd = useCallback(
        ({oldIndex, newIndex}) => {
            setData(
                (oldData) => {
                    const newData = {...oldData}
                    newData.letters = arrayMove(newData.letters, oldIndex, newIndex)
                    newData.letters = newData.letters.map((letter, index) => ({...letter, order: index}))
                    dataRef.current = newData
                    return newData
                }
            )
        },
        []
    )

    const onRowAdd = useCallback(
        () => {
            setData(data => {
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
                const newLetters = [
                    EMPTY_LETTERS,
                    ...dataRef.current.letters.map(letter => ({...letter, order: parseInt(letter.order) + 1})),
                ]
                setTimeout(
                    () => {
                        dataRef.current.letters = newLetters
                    },
                    0
                )
                return {
                    ...data,
                    letters: newLetters
                }
            })
        },
        [setData]
    )

    const onRowRemove = useCallback(
        (row) => {
            const newLetters = [...data.letters]
                .filter(letter => letter.id !== row.id)
                .map(letter => {
                    if (letter.order < row.order) {
                        return letter
                    }
                    return {
                        ...letter,
                        order: letter.order - 1
                    }
                })
            dataRef.current.letters = newLetters
            setData({
                ...data,
                letters: [...newLetters]
            })
        },
        [data, setData]
    )

    const onSave = useCallback(
        () => {
            const input = {
                id: alphabet.id,
                letters: dataRef.current.letters.map(
                    (letter) => {
                        delete letter.id
                        return letter
                    }
                )
            }
            updateAlphabet(
                input,
                {
                    onSuccess: () => {
                        setModifyData()
                        loadAlphabet()
                        toast({
                            status: 'success',
                            title: 'Successfully updated',
                            isClosable: true
                        })
                    }
                }
            )
        },
        [dataRef]
    )

    const SortableItem = SortableElement(({
        row,
        sIndex,
        data
    }) => {
        return (
            <Tr>
                <TableRow
                    data={row}
                    dataRef={dataRef}
                    index={sIndex} />
                <Td>
                    <ButtonGroup>
                        <IconButton
                            icon={<AiOutlinePlus/>}
                            onClick={onRowAdd} />
                        {data.letters.length > 1 && (
                            <IconButton
                                icon={<AiOutlineMinus/>}
                                onClick={() => onRowRemove(row)} />
                        )}
                    </ButtonGroup>
                </Td>
            </Tr>
        )
    })

    const SortableList = SortableContainer(({items, data}) => {
        return (
            <Tbody>
                {items.map(
                    (row, index) => (
                        <SortableItem
                            key={`alphabet-modify-table-data-${row.id}-${row.order}`}
                            index={index}
                            sIndex={index}
                            row={row}
                            data={data} />
                    )
                )}
            </Tbody>
        )
    })

    return (
        <>
            <Flex
                justifyContent="flex-end"
                py="2">
                <Button
                    colorScheme="blue"
                    isLoading={isLoading}
                    onClick={onSave}>
                    Save
                </Button>
            </Flex>
            <Table
                my="8"
                display="block"
                overflowX="scroll">
                <Thead bg={mode('gray.50', 'gray.800')}>
                    <Tr>
                        <Th/>
                        <Th whiteSpace="nowrap" scope="col">
                            {activeLanguageGroup.from}
                        </Th>
                        <Th whiteSpace="nowrap" scope="col">
                            {activeLanguageGroup.from} info
                        </Th>
                        <Th whiteSpace="nowrap" scope="col">
                            {activeLanguageGroup.to}
                        </Th>
                        <Th whiteSpace="nowrap" scope="col">
                            {activeLanguageGroup.to} info
                        </Th>
                        <Th whiteSpace="nowrap" scope="col">
                            Audio
                        </Th>
                        <Th whiteSpace="nowrap" scope="col">
                            Info Audio
                        </Th>
                        <Th whiteSpace="nowrap" scope="col">
                            Pronunciation letter
                        </Th>
                        <Th whiteSpace="nowrap" scope="col">
                            Pronunciation text
                        </Th>
                        <Th whiteSpace="nowrap" scope="col">
                            Actions
                        </Th>
                    </Tr>
                </Thead>
                <SortableList
                    items={data.letters || []}
                    data={data}
                    pressDelay={200}
                    onSortEnd={onSortEnd} />
            </Table>
        </>
    )
}
