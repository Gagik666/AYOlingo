import React from 'react'
import { UnorderedList, ListItem } from '@chakra-ui/react'

export default function RegressionList ({
    row: data
}) {
    const { regression } = data

    if (!regression) return <></>

    return (
        <UnorderedList>
            {regression.start && (
                <ListItem whiteSpace="nowrap">
                    Start week - {regression.start}
                </ListItem>
            )}
            {regression.step && (
                <ListItem whiteSpace="nowrap">
                    Step - {regression.step}
                </ListItem>
            )}
            {regression.lastPoint && (
                <ListItem whiteSpace="nowrap">
                    Last point - {regression.lastPoint}
                </ListItem>
            )}
        </UnorderedList>
    )
}