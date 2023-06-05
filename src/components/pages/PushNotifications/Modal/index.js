import React, { useCallback, useState } from 'react'
import {
    Modal as ChakraModal,
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
    useToast,
} from '@chakra-ui/react'
import { useCreatePushNotification } from '../../../../core/hooks'

const EMPTY_DATA = {
    title: '',
    body: '',
}

export default function Modal ({
    isOpen,
    onClose,
    onChange,
}) {
    const { createPushNotification, isLoading } = useCreatePushNotification()
    const toast = useToast()
    const [data, setData] = useState(EMPTY_DATA)
    const [errors, setErrors] = useState(EMPTY_DATA)

    const onModalClose = () => {
        setData(EMPTY_DATA)
        setErrors(EMPTY_DATA)
        setTimeout(() => onClose(), 0)
    }

    const onSubmit = useCallback(
        () => {
            createPushNotification(
                {
                    title: data.title,
                    body: data.body,
                },
                {
                    onSuccess: (response) => {
                        setData(EMPTY_DATA)
                        toast({
                            title: 'Started sending notifications',
                            status: 'success',
                            isClosable: true,
                        })
                        onChange()
                        onClose()
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
                    }
                }
            )
        },
        [data]
    )

    return (
        <ChakraModal isOpen={isOpen} onClose={onModalClose}>
            <ModalOverlay />
                <ModalContent>
                <ModalHeader>Send push notification</ModalHeader>
                <ModalCloseButton _focus={{boxShadow: 'none'}}/>
                <ModalBody>
                    <Stack spacing={5}>
                        <FormControl id="title">
                            <FormLabel>Title</FormLabel>
                            <Input
                                type="text"
                                value={data.title}
                                onChange={e => setData(data => ({...data, title: e.target.value}))} />
                            {errors.title && (
                                <FormHelperText color="red.100">{errors.title}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl id="body">
                            <FormLabel>Body</FormLabel>
                            <Input
                                type="text"
                                value={data.body}
                                onChange={e => setData(data => ({...data, body: e.target.value}))} />
                            {errors.body && (
                                <FormHelperText color="red.100">{errors.body}</FormHelperText>
                            )}
                        </FormControl>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="ghost"
                        mr={3}
                        onClick={onModalClose}>
                        Close
                    </Button>
                    <Button
                        variant="ghost"
                        colorScheme="blue"
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        loadingText="Loading"
                        onClick={onSubmit}>
                        Send
                    </Button>
                </ModalFooter>
            </ModalContent>
        </ChakraModal>
    )
}
