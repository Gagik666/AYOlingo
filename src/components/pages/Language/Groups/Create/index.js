import React, { useState, useCallback, useEffect } from 'react'
import { FaExchangeAlt } from 'react-icons/fa'
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalCloseButton,
    Button,
    HStack,
    FormLabel,
    Select,
    FormControl,
    FormHelperText,
    IconButton,
    useToast
} from '@chakra-ui/react'
import { useCreateLanguageGroup, useListLanguageGroups, useCreateAlphabet } from '../../../../../core/hooks'
import { LANGUAGE_GROUP_EXISTS } from '../../../../../core/constants'

const EMPTY_DATA = {from: '', to: ''}

export default function Create ({
    languages,
    isOpen,
    onClose,
    onCreate = () => {}
}) {
    const toast = useToast()
    const { createAlphabet } = useCreateAlphabet()
    const { createLanguageGroup, isLoading } = useCreateLanguageGroup()
    const { listLanguageGroups, isLoading: languageGroupsLoading } = useListLanguageGroups()
    const [errors, setErrors] = useState(EMPTY_DATA)
    const [data, setData] = useState({from: languages[0]?.id, to: languages[1]?.id})

    const onSubmit = useCallback(
        () => {
            const variables = {
                filter: {
                    from: {eq: data.from},
                    to: {eq: data.to},
                }
            }
            listLanguageGroups(
                variables,
                {
                    onSuccess: (response) => {
                        if (response.data.listLanguageGroups.items.length > 0) {
                            return toast({
                                title: LANGUAGE_GROUP_EXISTS,
                                status: 'error',
                                isClosable: true,
                            })
                        }
                        createLanguageGroup(
                            data,
                            {
                                onSuccess: (response) => {
                                    createAlphabet({
                                        languageGroup: response.data.createLanguageGroups.id
                                    })
                                    onCreate()
                                },
                                onError: (e) => {
                                    let message = e.message
                                    const failedValidations = JSON.parse(e.message)
                                    if (failedValidations) {
                                        return setErrors(failedValidations)
                                    }
                                    toast({
                                        title: message,
                                        status: 'error',
                                        isClosable: true,
                                    })
                                },
                            },
                        )
                    }
                }
            )
        },
        [data, setErrors, setData]
    )

    const changeLanguages = useCallback(
        () => {
            setData(data => ({
                ...data,
                from: data.to,
                to: data.from,
            }))
        },
        [setData]
    )

    useEffect(() => {
        if (!errors.from && !errors.to) return
        setErrors(EMPTY_DATA)
    }, [data])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent>
                <ModalHeader>Create Language Group</ModalHeader>
                <ModalCloseButton _focus={{boxShadow: 'none'}}/>
                <ModalBody>
                    <HStack
                        display="flex"
                        alignItems="flex-end"
                        spacing={2}>
                        <FormControl id="from">
                            <FormLabel>Language From</FormLabel>
                            <Select
                                value={data.from}
                                textTransform="capitalize"
                                onChange={e => setData(data => ({...data, from: e.target.value}))}>
                                {languages.filter(l => l.id !== data.to).map(
                                    (language) => (
                                        <option
                                            key={language.id}
                                            value={language.id}>
                                            {language.name}
                                        </option>
                                    )
                                )}
                            </Select>
                            {errors.from && (
                                <FormHelperText color="red.100">{errors.from}</FormHelperText>
                            )}
                        </FormControl>
                        <IconButton
                            icon={<FaExchangeAlt/>}
                            onClick={changeLanguages} />
                        <FormControl id="to">
                            <FormLabel>Language To</FormLabel>
                            <Select
                                textTransform="capitalize"
                                value={data.to}
                                onChange={e => setData(data => ({...data, to: e.target.value}))}>
                                {languages.filter(l => l.id !== data.from).map(
                                    (language) => (
                                        <option
                                            key={language.id}
                                            value={language.id}>
                                            {language.name}
                                        </option>
                                    )
                                )}
                            </Select>
                            {errors.to && (
                                <FormHelperText color="red.100">{errors.to}</FormHelperText>
                            )}
                        </FormControl>
                    </HStack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="ghost"
                        mr={3}
                        onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        variant="ghost"
                        colorScheme="blue"
                        isLoading={isLoading || languageGroupsLoading}
                        onClick={onSubmit}>
                        Create
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
