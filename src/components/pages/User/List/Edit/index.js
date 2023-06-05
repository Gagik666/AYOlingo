import React, { useState, useCallback, useEffect } from 'react'
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
import { useUpdateUser } from '../../../../../core/hooks'
import { SingleFile } from '../../../../theme'

export default function Modal ({
    isOpen,
    onClose,
    data: existingData,
    onChange = () => {}
}) {
    const toast = useToast()
    const { mutate: updateUser, isLoading } = useUpdateUser()
    const [processing, setProcessing] = useState(false)
    const [errors, setErrors] = useState({})
    const [data, setData] = useState()

    const onSubmit = useCallback(
        () => {
            updateUser(
                data,
                {
                    onSuccess: (response) => onChange()
                }
            )
        },
        [data, setErrors, setData]
    )

    useEffect(() => {
        if (!errors.name && !errors.duration && !errors.difficulty && !errors.image) return
        setErrors({})
    }, [data])

    useEffect(() => {
        setData({...existingData})
    }, [existingData])

    if (!data) return <></>

    return (
        <ChakraModal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent>
                <ModalHeader>Update User - {data.firstName}</ModalHeader>
                <ModalCloseButton _focus={{boxShadow: 'none'}}/>
                <ModalBody>
                    <Stack spacing={5}>
                        <SingleFile
                            oKey="avatar"
                            data={data}
                            errors={errors}
                            onChange={file => setData(data => ({...data, ...file}))}
                            setProcessing={setProcessing} />
                        <FormControl id="first-name">
                            <FormLabel>First Name</FormLabel>
                            <Input
                                type="text"
                                value={data.firstName}
                                onChange={e => setData(data => ({...data, firstName: e.target.value}))} />
                            {errors.firstName && (
                                <FormHelperText color="red.100">{errors.firstName}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl id="last-name">
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                type="text"
                                value={data.lastName}
                                onChange={e => setData(data => ({...data, lastName: e.target.value}))} />
                            {errors.lastName && (
                                <FormHelperText color="red.100">{errors.lastName}</FormHelperText>
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
                        isLoading={isLoading || processing}
                        loadingText={processing ? 'Processing' : ''}
                        onClick={onSubmit}>
                        Save changes
                    </Button>
                </ModalFooter>
            </ModalContent>
        </ChakraModal>
    )
}
