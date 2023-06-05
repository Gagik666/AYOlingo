import React, { useCallback, useState } from 'react'
import {
    Box,
    Heading,
    Flex,
    Textarea,
    Button,
    useToast
} from '@chakra-ui/react'
import { useListUsers, useSendInvitationEmail } from '../../../../core/hooks'

export default function Invite () {
    const [email, setEmail] = useState('')
    const { sendInvitationEmail, isLoading: isSendInvitationsLoading } = useSendInvitationEmail()
    const { listUsers, isLoading: isListUsersLoading } = useListUsers()
    const toast = useToast()

    const onSubmit = useCallback(
        () => {
            const emails = email.split(', ')
            if (!emails?.length === 0) {
                return toast({
                    title: 'Please provide emails',
                    status: 'error',
                    isClosable: true
                })
            }
            const listUsersFilter = {filter: {or: []}}
            emails.map(email => listUsersFilter.filter.or.push({
                email: {eq: email}
            }))

            listUsers(
                listUsersFilter,
                {
                    onSuccess: (response) => {
                        const users = response.data.listUsers.items
                        if (users.length > 0) {
                            const existingEmails = []
                            users.map(user => existingEmails.push(user.email))
                            return toast({
                                title: `Following emails are already registered: ${existingEmails.join(', ')}`,
                                status: 'error',
                                isClosable: true
                            })
                        }
                        sendInvitationEmail(
                            {
                                to: emails,
                                from: 'bokhyan.edmond@gmail.com',
                                link: 'http://localhost:3000/register',
                            },
                            {
                                onSuccess: () => {
                                    toast({
                                        title: 'Invitations sent successfully',
                                        status: 'success',
                                        isClosable: 'true'
                                    })
                                    setEmail('')
                                }
                            }
                        )
                    },
                    onError: (e) => console.log(e, ' error')
                }
            )
        },
        [email]
    )

    return (
        <Box as="section" py="12">
            <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <Box overflowX="auto">
                    <Heading size="lg" mb="6">
                        Invite user
                    </Heading>
                </Box>
                <Flex
                    flexDirection="column"
                    alignItems="flex-end">
                    <Textarea
                        placeholder="test@test.com, test1@test1.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <Button
                        colorScheme="blue"
                        mt="3"
                        isDisabled={isSendInvitationsLoading || isListUsersLoading}
                        isLoading={isSendInvitationsLoading || isListUsersLoading}
                        onClick={onSubmit}>
                        Submit
                    </Button>
                </Flex>
            </Box>
        </Box>
    )
}