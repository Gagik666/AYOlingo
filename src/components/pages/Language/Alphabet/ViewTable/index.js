import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import { useLanguageGroups } from '../../../../../core/hooks'
import AudioButton from '../../../../theme/Upload/Single/AudioButton'

export default function ViewTable ({
    alphabet
}) {
    const { activeLanguageGroup } = useLanguageGroups()

    return (
        <Table
            my="8"
            borderWidth="1px">
            {(!alphabet || !alphabet.letters) && <TableCaption>Nothing to show</TableCaption>}
            <Thead bg={mode('gray.50', 'gray.800')}>
                <Tr>
                    <Th whiteSpace="nowrap" scope="col">
                        {activeLanguageGroup.from}
                    </Th>
                    <Th whiteSpace="nowrap" scope="col">
                        {activeLanguageGroup.from} info
                    </Th>
                    <Th whiteSpace="nowrap" scope="col">
                        {activeLanguageGroup.to}
                    </Th>
                    <Th whiteSpace="nowrap" scope="col">
                        {activeLanguageGroup.to} info
                    </Th>
                    <Th whiteSpace="nowrap" scope="col">
                        Audio
                    </Th>
                    <Th whiteSpace="nowrap" scope="col">
                        Info Audio
                    </Th>
                    <Th whiteSpace="nowrap" scope="col">
                        Pronunciation Letter
                    </Th>
                    <Th whiteSpace="nowrap" scope="col">
                        Pronunciation Text
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {alphabet?.letters?.map(
                    (letter, index) => (
                        <Tr key={`letter-${index}`}>
                            <Td>
                                {letter.from}
                            </Td>
                            <Td>
                                {letter.fromInfo}
                            </Td>
                            <Td>
                                {letter.to}
                            </Td>
                            <Td>
                                {letter.toInfo}
                            </Td>
                            <Td>
                                {letter.audio && (
                                    <AudioButton file={letter.audio} />
                                )}
                            </Td>
                            <Td>
                                {letter.audioInfo && (
                                    <AudioButton file={letter.audioInfo} />
                                )}
                            </Td>
                            <Td>
                                {letter.pronunciationLetter}
                            </Td>
                            <Td>
                                {letter.pronunciationText}
                            </Td>
                        </Tr>
                    )
                )}
            </Tbody>
        </Table>
    )
}