import * as React from 'react'
import { Link as ReactLink } from 'react-router-dom'
import { HStack, Icon, Link, Box, useColorModeValue as mode, Text, AccordionIcon, Flex } from '@chakra-ui/react'

export default function NavLink ({
    icon,
    isActive,
    label,
    to,
    isDropdown,
    ...rest
}) {
    const props = {
        display: 'block',
        py: 2,
        px: 3,
        borderRadius: 'md',
        transition: 'all 0.3s',
        fontWeight: 'medium',
        lineHeight: '1.5rem',
        'aria-current': isActive ? 'page' : undefined,
        color: mode('blackAlpha.800', 'whiteAlpha.800'),
        _hover: {
            bg: mode('gray.100', 'gray.700'),
            color: mode('black', 'white'),
        },
        _activeLink: {
            bg: mode('blue.500', 'blue.300'),
            color: mode('white', 'black'),
        },
        _focus: {boxShadow: 'none'},
        stroke: 'white',
        ...rest,
    }

    const Data = () => (
        <Flex
            justifyContent="space-between"
            alignItems="center">
            <HStack spacing={4}>
                {icon && <Icon as={icon} boxSize="20px" />}
                <Text as="span">{label}</Text>
            </HStack>
            {isDropdown && <AccordionIcon />}
        </Flex>
    )
        

    if (isDropdown) {
        return (
            <Box {...props}>
                <Data/>
            </Box>
        )
    }

    return (
        <Link
            {...props}
            as={ReactLink}
            to={to}>
            <Data/>
        </Link>
    )
}