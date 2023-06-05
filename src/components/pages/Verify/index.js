/** @jsxImportSource @emotion/react */
import { useState, useCallback, useEffect } from 'react'
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
    useToast
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { useConfirmCode } from '../../../core/hooks'
import {
    VERIFICATION_CODE_IS_REQUIRED,
    CONFIRM_CODE_PAGE_WITHOUT_EMAIL,
    SUCCESS,
} from '../../../core/constants'
import styles from './styles'

const EMPTY_ERRORS = {code: ''}

function Verify () {
    const queryParams = new URLSearchParams(window.location.search)
    const history = useHistory()
    const toast = useToast()
    const [data, setData] = useState({code: ''})
    const [errors, setErrors] = useState(EMPTY_ERRORS)
    const { confirmCode, isLoading } = useConfirmCode()

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault()

            let isValid = true
            const newErrors = {...EMPTY_ERRORS}
            if (!data.code) {
                newErrors.code = VERIFICATION_CODE_IS_REQUIRED
                isValid = false
            }
            if (!isValid) return setErrors(newErrors)

            confirmCode(
                {
                    email: queryParams.get('email'),
                    code: data.code
                },
                {
                    onSuccess: () => {
                        toast({
                            title: SUCCESS,
                            status: 'success',
                            isClosable: true,
                        })
                        history.push(`/login?email=${queryParams.get('email')}`)
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
        if (queryParams.has('email')) return
        toast({
            title: CONFIRM_CODE_PAGE_WITHOUT_EMAIL,
            status: 'error',
            isClosable: true,
        })
        setTimeout(() => {
            history.push('/login')
        }, 100)
    }, [])

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
                        <Heading size="lg">Verify your account</Heading>
                    </Flex>
                    <FormControl id="code">
                        <FormLabel>Code</FormLabel>
                        <Input
                            type="text"
                            onChange={e => setData(data => ({...data, code: e.target.value}))} />
                        {errors.code && (
                            <FormHelperText color="red.100">{errors.code}</FormHelperText>
                        )}
                    </FormControl>
                    <Flex
                        justifyContent="flex-end"
                        alignItems="center">
                        <Button
                            type="submit"
                            colorScheme="blue"
                            isDisabled={isLoading}
                            isLoading={isLoading}>
                            Submit
                        </Button>
                    </Flex>
                </Stack>
            </Box>
        </Container>
    )
}

export default Verify
