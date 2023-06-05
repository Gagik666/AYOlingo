import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { Avatar, Flex, HStack, Text, Button } from '@chakra-ui/react'
import { useUser, useSignOut } from '../../../core/hooks'
import { S3_BUCKET } from '../../../core/constants'

export default function UserProfile () {
    const { user } = useUser()
    const { signOut } = useSignOut()
    return (
        <HStack spacing="4" px="2">
            {user.avatar ? (
                <Avatar
                    name="avatar"
                    src={user.avatar ? S3_BUCKET + user.avatar : ''} />
            ) : (
                <FaUserAlt />
            )}
            <Flex direction="column">
                <Text fontWeight="medium">{user.firstName} {user.lastName}</Text>
                <Text fontSize="sm" lineHeight="shorter">
                    {user.email}
                </Text>
                <Button
                    size="xs"
                    background="transparent"
                    color="blue.400"
                    p="0"
                    display="block"
                    textAlign="left"
                    onClick={signOut}
                    _hover={{background: 'transparent'}}>
                    Logout
                </Button>
            </Flex>
        </HStack>
    )
}