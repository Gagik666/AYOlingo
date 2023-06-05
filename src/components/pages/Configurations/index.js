import React, { useCallback, useState } from 'react'
import {
    Box,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    SimpleGrid,
    Button,
    Stack,
    useDisclosure
} from '@chakra-ui/react'
import { useUser, useUpdateUser } from '../../../core/hooks'
import { FIRST_NAME_IS_REQUIRED, LAST_NAME_IS_REQUIRED } from '../../../core/constants'
import { SingleFile } from '../../theme'
import PasswordModal from './Password'

function Configurations () {
    const { user, setUser } = useUser()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { mutate: updateProgress, isLoading } = useUpdateUser()
    const [data, setData] = useState({...user})
    const [errors, setErrors] = useState({})

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault()

            let isValid = true
            const newErrors = {}

            if (!data.firstName) {
                isValid = false
                newErrors.firstName = FIRST_NAME_IS_REQUIRED
            }

            if (!data.lastName) {
                isValid = false
                newErrors.lastName = LAST_NAME_IS_REQUIRED
            }

            if (!isValid) return setErrors({...newErrors})

            updateProgress(
                data,
                {
                    onSuccess: (response) => setUser(response.data.updateUser)
                }
            )
        },
        [data]
    )

    return (
        <Box as="section" py="12">
            <Box
                maxW={{ base: 'xl', md: '7xl' }}
                mx="auto"
                px={{ base: '6', md: '8' }}>
                <Box
                    as="form"
                    onSubmit={onSubmit}>
                    <SimpleGrid
                        columns={2}
                        spacing={6}>
                        <SingleFile
                            data={data}
                            oKey="avatar"
                            imageMaxHeight="250px"
                            onChange={response => setData(data => ({...data, avatar: response['avatar']}))} />
                        <Stack spacing={3}>
                            <FormControl id="first-name">
                                <FormLabel>First name</FormLabel>
                                <Input
                                    type="text"
                                    value={data.firstName}
                                    onChange={e => setData(data => ({...data, firstName: e.target.value}))} />
                                {errors.firstName && (
                                    <FormHelperText color="red.100">{errors.firstName}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl id="last-name">
                                <FormLabel>Last name</FormLabel>
                                <Input
                                    type="text"
                                    value={data.lastName}
                                    onChange={e => setData(data => ({...data, lastName: e.target.value}))} />
                                {errors.lastName && (
                                    <FormHelperText color="red.100">{errors.lastName}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    value={data.email}
                                    disabled />
                            </FormControl>
                            <Stack
                                display="flex"
                                flexDirection="row"
                                justifyContent="space-between"
                                alignItems="flex-end"
                                spacing={3}>
                                <Button
                                    w="48%"
                                    type="button"
                                    onClick={onOpen}>
                                    Change Password
                                </Button>
                                <Button
                                    colorScheme="blue"
                                    w="48%"
                                    isLoading={isLoading}
                                    loadingText="loading"
                                    isDisabled={isLoading}
                                    type="submit">
                                    Save Changes
                                </Button>
                            </Stack>
                        </Stack>
                    </SimpleGrid>
                </Box>
            </Box>
            <PasswordModal
                isOpen={isOpen}
                onClose={onClose} />
        </Box>
    )
}

export default Configurations
