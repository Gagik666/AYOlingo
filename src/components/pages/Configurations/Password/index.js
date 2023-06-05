import React, { useState, useCallback } from 'react'
import {
    Modal as ChakraModal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalCloseButton,
    Button,
    FormLabel,
    Input,
    FormControl,
    Stack,
    useToast,
} from '@chakra-ui/react'
import { useChangePassword } from '../../../../core/hooks'
import { PASSWORD_PARAMETERS } from '../../../../core/constants'

export default function Password ({isOpen, onClose}) {
    const { mutate: changePassword, isLoading } = useChangePassword()
    const toast = useToast()
    const [data, setData] = useState({})

    const onModalClose = () => {
        setData({})
        onClose()
    }

    const onSubmit = useCallback(
        () => {
            changePassword(
                data,
                {
                    onSuccess: () => {
                        toast({
                            title: 'Password updated successfully',
                            status: 'success',
                            isClosable: true
                        })
                        setData({})
                        onClose()
                    },
                    onError: (e) => toast({
                        title: e.code === 'InvalidParameterException' ? PASSWORD_PARAMETERS : e.message,
                        status: 'error',
                        isClosable: true
                    })
                }
            )
        },
        [data]
    )

    return (
        <ChakraModal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent>
                <ModalHeader>Change Password</ModalHeader>
                <ModalCloseButton _focus={{boxShadow: 'none'}}/>
                <ModalBody>
                    <Stack spacing={5}>
                        <FormControl id="old-password">
                            <FormLabel>Old Password</FormLabel>
                            <Input
                                type="password"
                                onChange={e => setData(data => ({...data, oldPassword: e.target.value}))} />
                        </FormControl>
                        <FormControl id="new-password">
                            <FormLabel>New Password</FormLabel>
                            <Input
                                type="password"
                                onChange={e => setData(data => ({...data, newPassword: e.target.value}))} />
                        </FormControl>
                        <FormControl id="confirm-password">
                            <FormLabel>Confirm Password</FormLabel>
                            <Input
                                type="password"
                                onChange={e => setData(data => ({...data, confirmPassword: e.target.value}))} />
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
                        Change Password
                    </Button>
                </ModalFooter>
            </ModalContent>
        </ChakraModal>
    )
}