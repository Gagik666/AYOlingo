/** @jsxImportSource @emotion/react */
import { useEffect, useState, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
    Box,
    Flex,
    Container,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Heading,
    Stack,
    Button,
    Image,
    useToast,
} from '@chakra-ui/react'
import {
    useSignUp,
    useCreateUser,
} from '../../../core/hooks'
import { IsJsonString } from '../../../core/helpers'
import {
    ACCOUNT_WITH_EMAIL_ALREADY_EXISTS,
    PASSWORD_PARAMETERS,
    PLEASE_VERIFY_YOUR_ACCOUNT,
} from '../../../core/constants'
import styles from './styles'

const EMPTY_ERRORS = {email: '', password: '', confirm_password: '', firstName: '', lastName: ''}

function Register () {
    const [data, setData] = useState({email: '', password: '', confirm_password: '', firstName: '', lastName: ''})
    const [errors, setErrors] = useState(EMPTY_ERRORS)
    const { signUp, isLoading } = useSignUp()
    const { createUser, isLoading: isUserCreateLoading } = useCreateUser()
    const history = useHistory()
    const toast = useToast()

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault()
            signUp(
                {
                    ...data,
                    email: data.email.toLowerCase(),
                },
                {
                    onSuccess: (response) => {
                        const input = {
                            id: response.userSub,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email.toLowerCase(),
                            type: 'User',
                            createdAt: new Date().toISOString(),
                        }
                        createUser(
                            input,
                            {
                                onSuccess: () => {
                                    toast({
                                        title: PLEASE_VERIFY_YOUR_ACCOUNT,
                                        status: 'success',
                                        isClosable: true,
                                    })
                                    history.push(`/verify-account?email=${input.email}`)
                                }
                            },
                        )
                    },
                    onError: (e) => {
                        let message = e.message
                        const failedValidations = IsJsonString(e.message) ? JSON.parse(e.message) : null
                        if (failedValidations) {
                            return setErrors(failedValidations)
                        }
                        if (e.code === 'UsernameExistsException') {
                            message = ACCOUNT_WITH_EMAIL_ALREADY_EXISTS
                        }
                        if (e.code === 'InvalidParameterException') {
                            message = PASSWORD_PARAMETERS
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
        [data, setErrors]
    )

    useEffect(() => {
        if (!errors.email && !errors.password && !errors.confirm_password && !errors.full_name) return
        setErrors(EMPTY_ERRORS)
    }, [data])

    return (
        <Container
            maxW="2xl"
            css={styles.overlay}>
            <Box
                as="form"
                w="100%"
                borderWidth={2}
                borderStyle="solid"
                borderColor="grey.100"
                borderRadius="10px"
                p="4"
                onSubmit={onSubmit}>
                <Stack spacing={5}>
                    <Flex
                        flexDirection="column"
                        alignItems="center">
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width="50px" />
                        <Heading size="lg">Register</Heading>
                    </Flex>
                    <FormControl id="first-name">
                        <FormLabel>First name</FormLabel>
                        <Input
                            type="text"
                            onChange={e => setData(data => ({...data, firstName: e.target.value}))} />
                        {errors.firstName && (
                            <FormHelperText color="red.100">{errors.firstName}</FormHelperText>
                        )}
                    </FormControl>
                    <FormControl id="last-name">
                        <FormLabel>Last name</FormLabel>
                        <Input
                            type="text"
                            onChange={e => setData(data => ({...data, lastName: e.target.value}))} />
                        {errors.lastName && (
                            <FormHelperText color="red.100">{errors.lastName}</FormHelperText>
                        )}
                    </FormControl>
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            onChange={e => setData(data => ({...data, email: e.target.value}))} />
                        {errors.email && (
                            <FormHelperText color="red.100">{errors.email}</FormHelperText>
                        )}
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            onChange={e => setData(data => ({...data, password: e.target.value}))} />
                        {errors.password && (
                            <FormHelperText color="red.100">{errors.password}</FormHelperText>
                        )}
                    </FormControl>
                    <FormControl id="confirm-password">
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            type="password"
                            onChange={e => setData(data => ({...data, confirm_password: e.target.value}))} />
                        {errors.confirm_password && (
                            <FormHelperText color="red.100">{errors.confirm_password}</FormHelperText>
                        )}
                    </FormControl>
                    <Flex
                        justifyContent="space-between"
                        alignItems="center">
                        <Box
                            as="span"
                            color="grey.300">
                            Already have an account? &nbsp;
                            <Box
                                as="a"
                                color="blue.100">
                                <Link to="/login">Login</Link>
                            </Box>
                        </Box>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            isDisabled={isUserCreateLoading || isLoading}
                            isLoading={isUserCreateLoading || isLoading}>
                            Submit
                        </Button>
                    </Flex>
                </Stack>
            </Box>
        </Container>
    )
}

export default Register
