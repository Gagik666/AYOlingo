import React, { useState, useCallback, useEffect } from 'react'
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalCloseButton,
    Button,
    Stack,
    FormLabel,
    Input,
    FormControl,
    FormHelperText,
    useToast
} from '@chakra-ui/react'
import { useCreateLanguage } from '../../../../../core/hooks'

const EMPTY_DATA = {code: '', name: ''}

export default function Create ({
    isOpen,
    onClose,
    onCreate = () => {}
}) {
    const toast = useToast()
    const { createLanguage, isLoading } = useCreateLanguage()
    const [errors, setErrors] = useState(EMPTY_DATA)
    const [data, setData] = useState(EMPTY_DATA)

    const onSubmit = useCallback(
        () => {
            const input = {
                ...data,
                id: data.code
            }
            createLanguage(
                input,
                {
                    onSuccess: () => onCreate(),
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
        },
        [data, setErrors, setData]
    )

    useEffect(() => {
        if (!errors.name && !errors.code) return
        setErrors(EMPTY_DATA)
    }, [data])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent>
                <ModalHeader>Create Language</ModalHeader>
                <ModalCloseButton _focus={{boxShadow: 'none'}}/>
                <ModalBody>
                    <Stack spacing={5}>
                        <FormControl id="code">
                            <FormLabel>Code</FormLabel>
                            <Input
                                type="text"
                                placeContent="en"
                                onChange={e => setData(data => ({...data, code: e.target.value}))} />
                            {errors.code && (
                                <FormHelperText color="red.100">{errors.code}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                placeContent="English"
                                onChange={e => setData(data => ({...data, name: e.target.value}))} />
                            {errors.name && (
                                <FormHelperText color="red.100">{errors.name}</FormHelperText>
                            )}
                        </FormControl>
                    </Stack>
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
                        isLoading={isLoading}
                        onClick={onSubmit}>
                        Create
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
