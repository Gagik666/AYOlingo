/** @jsxImportSource @emotion/react */
import { useState, useCallback } from 'react'
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
    Image,
    Button,
    useToast,
} from '@chakra-ui/react'
import { ValidateEmail } from '../../../core/helpers'
import {
    useSignIn,
    useUsersByEmail,
    useUser,
} from '../../../core/hooks'
import {
    EMAIL_ADDRESS_IS_REQUIRED,
    INVALID_EMAIL_ADDRESS,
    PASSWORD_IS_REQUIRED,
} from '../../../core/constants'
import styles from './styles'
import { useEffect } from 'react'

const EMPTY_ERRORS = {email: '', password: ''}

function Login () {
    const queryParams = new URLSearchParams(window.location.search)
    const history = useHistory()
    const toast = useToast()
    const { setUser } = useUser()
    const { usersByEmail, isLoading: usersByEmailLoading } = useUsersByEmail()
    const { signIn, isLoading: signInLoading } = useSignIn()
    const [errors, setErrors] = useState(EMPTY_ERRORS)
    const [data, setData] = useState({
        email: queryParams.has('email') ? queryParams.get('email') : '',
        password: ''
    })

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault()

            let isValid = true
            const newErrors = {...EMPTY_ERRORS}
            if (!data.email) {
                newErrors.email = EMAIL_ADDRESS_IS_REQUIRED
                isValid = false
            }
            if (!data.password) {
                newErrors.password = PASSWORD_IS_REQUIRED
                isValid = false
            }
            if (data.email && !ValidateEmail(data.email)) {
                newErrors.email = INVALID_EMAIL_ADDRESS
                isValid = false
            }
            if (!isValid) return setErrors(newErrors)

            signIn(
                data,
                {
                    onSuccess: (response) => {
                        usersByEmail(
                            {
                                email: response.attributes.email
                            },
                            {
                                onSuccess: (response) => {
                                    setUser(response.data.usersByEmail.items[0])
                                    if (queryParams.has('redirect')) {
                                        return history.push(queryParams.get('redirect').replace(/`/g, '&'))
                                    }
                                    history.push('/')
                                },
                                onError: (e) => console.log(e),
                            }
                        )
                    },
                    onError: (e) => {
                        toast({
                            title: e.message,
                            status: 'error',
                            isClosable: true,
                        })
                    }
                }
            )
        },
        [data, setErrors]
    )

    useEffect(() => {
        if (errors.email || errors.password) setErrors(EMPTY_ERRORS)
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
                        <Heading size="lg">AyoLingo - Login</Heading>
                    </Flex>
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
                    <Flex
                        justifyContent="space-between"
                        alignItems="center">
                        <Box
                            as="span"
                            color="grey.300">
                            Don't have an account? &nbsp;
                            <Box
                                as="a"
                                color="blue.100">
                                <Link to="/register">Register</Link>
                            </Box>
                        </Box>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            isDisabled={signInLoading || usersByEmailLoading}
                            isLoading={signInLoading || usersByEmailLoading}>
                            Login
                        </Button>
                    </Flex>
                </Stack>
            </Box>
        </Container>
    )
}

export default Login
