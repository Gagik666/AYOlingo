import React, { useCallback, useState } from 'react'
import {
    Td,
    Input,
    IconButton,
} from '@chakra-ui/react'
import { HiViewList } from 'react-icons/hi'
import { SingleFile } from '../../../../theme'
import { useLanguageGroups } from '../../../../../core/hooks'

export default function TableRow ({
    index,
    data: existingData,
    dataRef,
}) {
    const [data, setData] = useState(existingData)
    const { activeLanguageGroup } = useLanguageGroups()

    const onValueChange = useCallback(
        (key, value) => {
            setData(
                (data) => {
                    dataRef.current.letters[index][key] = value
                    return {
                        ...data,
                        [key]: value
                    }
                }
            )
        },
        [index, dataRef, setData]
    )

    return (
        <>
            <Td>
                <IconButton
                    icon={<HiViewList/>} />
            </Td>
            <Td>
                <Input
                    minW="200px"
                    value={data.from}
                    placeholder={`${activeLanguageGroup.from}`}
                    onChange={(e) => onValueChange('from', e.target.value)} />
            </Td>
            <Td>
                <Input
                    minW="200px"
                    value={data.fromInfo}
                    placeholder={`${activeLanguageGroup.fromInfo}`}
                    onChange={(e) => onValueChange('fromInfo', e.target.value)} />
            </Td>
            <Td>
                <Input
                    minW="200px"
                    value={data.to}
                    placeholder={`${activeLanguageGroup.to}`}
                    onChange={(e) => onValueChange('to', e.target.value)} />
            </Td>
            <Td>
                <Input
                    minW="200px"
                    value={data.toInfo}
                    placeholder={`${activeLanguageGroup.toInfo}`}
                    onChange={(e) => onValueChange('toInfo', e.target.value)} />
            </Td>
            <Td>
                <SingleFile
                    id={`alphabet-audio-${index}`}
                    type="audio"
                    oKey="audio"
                    data={data}
                    onChange={data => onValueChange('audio', data['audio'])}
                    processing={false}
                    setProcessing={() => {}} />
            </Td>
            <Td>
                <SingleFile
                    id={`alphabet-audio-info-${index}`}
                    type="audio"
                    oKey="audioInfo"
                    data={data}
                    onChange={data => onValueChange('audioInfo', data['audioInfo'])}
                    processing={false}
                    setProcessing={() => {}} />
            </Td>
            <Td>
                <Input
                    minW="200px"
                    value={data.pronunciationLetter}
                    placeholder="Pronunciation letter"
                    onChange={(e) => onValueChange('pronunciationLetter', e.target.value)} />
            </Td>
            <Td>
                <Input
                    minW="200px"
                    value={data.pronunciationText}
                    placeholder="Pronunciation text"
                    onChange={(e) => onValueChange('pronunciationText', e.target.value)} />
            </Td>
        </>
    )
}
