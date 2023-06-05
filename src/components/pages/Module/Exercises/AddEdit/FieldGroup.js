import React from 'react'
import { Box, Heading, Stack } from '@chakra-ui/react'

export default function FieldGroup ({
    title,
    children,
    ...flexProps
}) {
    return (
        <Stack direction={{ base: 'column', md: 'row' }} spacing="6" py="4" {...flexProps}>
            <Box minW="3xs">
                {title && (
                    <Heading as="h2" fontWeight="semibold" fontSize="lg" flexShrink={0}>
                        {title}
                    </Heading>
                )}
            </Box>
            {children}
        </Stack>
    )
}