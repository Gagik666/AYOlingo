import React, { useState, useEffect } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Flex,
    Heading,
} from '@chakra-ui/react'
import Tab from './Tab'
import { EXERCISE_TYPES } from '../../../../../../core/constants'

export default function Preview ({
    exercise,
    isOpen,
    onClose,
}) {
    const [data, setData] = useState()
    
    useEffect(() => {
        const newData = JSON.parse(JSON.stringify(exercise))
        setData(newData)

        return () => setData()
    }, [exercise])

    if (!data) return <></>

    return (
        <Drawer
            size="md"
            isOpen={isOpen}
            placement="right"
            onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Preview</DrawerHeader>

                <DrawerBody
                    backgroundColor="purple.100"
                    borderRadius={4}
                    mx={5}>
                    <Heading
                        as="span"
                        size="lg"
                        display="block"
                        textAlign="center"
                        color="white.100">
                        {EXERCISE_TYPES[data.type]}
                    </Heading>
                    <Flex
                        h="calc(100% - 50px)"
                        w="100%"
                        alignItems="center"
                        mb={10}>
                        <Tab data={data} />
                    </Flex>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
