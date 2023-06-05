import React, { useCallback, useState, useEffect, useMemo } from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    VStack,
    SimpleGrid,
} from '@chakra-ui/react'
import { useGetAudio } from '../../../../../core/hooks'
import { SingleFile } from '../../../../theme'

export default function Text ({
    oKey,
    quizIndex,
    answerIndex,
    parentKey,
    data,
    singleRightAnswerIndex,
    setSingleRightAnswerIndex,
    innerOKey,
    type,
    parentProps = {}
}) {
    const { getAudio } = useGetAudio()
    const [processing, setProcessing] = useState(false)
    const [text, setText] = useState()

    const onBlur = (e) => {
        if (!e.target.value) return
        getAudio(e.target.value, {
            onSuccess: (response) => {
                if (!response.data.getAudio) return
                setText(text => ({...text, value: {...text.value, audio: response.data.getAudio.file}}))
                data.current[parentKey][quizIndex][oKey][answerIndex][innerOKey].audio = response.data.getAudio.file
            }
        })
    }

    const selectedOptionVisible = useMemo(
        () => {
            if (
                type === 'fill_in_the_blank'
            ) return true
            return null
        },
        [type]
    )

    const singleRightAnswer = useMemo(
        () => {
            if (type === 'select_translation') return true
            if (type === 'fill_in_the_blank' || type === 'translate_this_phrase') return false
            return null
        },
        [type]
    )

    const onSingleRightAnswerChange = useCallback(
        (e) => {
            const newAnswers = data.current[parentKey][quizIndex][oKey]
            newAnswers.map(answer => answer.right = false)
            newAnswers[e.target.value].right = true
            data.current[parentKey][quizIndex][oKey] = newAnswers
            setSingleRightAnswerIndex(answerIndex)
        },
        []
    )

    const onValueChange = useCallback(
        (key, value, answerBoolean) => {
            if (answerIndex !== undefined && innerOKey) { // setting answer
                if (type === 'match_these_translations' || type === 'match_these_pairs') {
                    data.current[parentKey][quizIndex][oKey][answerIndex].right = true
                }
                if (answerBoolean) {
                    setText(text => ({...text, [key]: !text[key]}))
                    return data.current[parentKey][quizIndex][oKey][answerIndex][key] = !data.current[parentKey][quizIndex][oKey][answerIndex][key]
                }
                setText(text => ({...text, value: {...text.value, [key]: value}}))
                return data.current[parentKey][quizIndex][oKey][answerIndex][innerOKey][key] = value
            }
            setText(text => ({...text, value: {...text.value, [key]: value}}))
            data.current[parentKey][quizIndex][oKey][key] = value // setting question
        },
        [data, parentKey, quizIndex, answerIndex, oKey, innerOKey]
    )

    useEffect(() => {
        if (answerIndex !== undefined) {
            return setText(data.current[parentKey][quizIndex][oKey][answerIndex])
        }
        setText({value: data.current[parentKey][quizIndex][oKey]})
    }, [])

    if (!text) return <></>

    return (
        <VStack
            w="100%"
            {...parentProps}
            key={`${parentKey}-${quizIndex}-${answerIndex}-${oKey}-${innerOKey}`}>
            <SimpleGrid
                columns={(type === 'select_translation' || type === 'translate_this_phrase') ? 3 : 2}
                spacing={7}
                w="100%">
                <FormControl id={`${parentKey}-${quizIndex}-${oKey}-${innerOKey}-${answerIndex}-value`}>
                    <FormLabel>Value</FormLabel>
                    <Input
                        type="text"
                        value={text.value.id}
                        onBlur={onBlur}
                        onChange={(e) => onValueChange('id', e.target.value)} />
                </FormControl>
                <FormControl id={`${parentKey}-${quizIndex}-${oKey}-${innerOKey}-transliteration`}>
                    <FormLabel>Transliteration</FormLabel>
                    <Input
                        type="text"
                        value={text.value.transliteration}
                        onChange={(e) => onValueChange('transliteration', e.target.value)} />
                </FormControl>
                {singleRightAnswer && (
                    <FormControl id={`${parentKey}-${quizIndex}-${oKey}-${innerOKey}-right-${answerIndex}`}>
                        <FormLabel>Right</FormLabel>
                        <input
                            type="radio"
                            id={`${parentKey}-${quizIndex}-${oKey}-${innerOKey}-right-${answerIndex}`}
                            name={`${parentKey}-${quizIndex}-${oKey}-${innerOKey}-test`}
                            value={answerIndex}
                            checked={singleRightAnswerIndex === answerIndex}
                            onChange={onSingleRightAnswerChange} />
                    </FormControl>
                )}
                {selectedOptionVisible && (
                    <FormControl id={`${parentKey}-${quizIndex}-${oKey}-${innerOKey}-multiple-selected-${answerIndex}`}>
                        <FormLabel>Selected</FormLabel>
                        <Checkbox
                            id={`${parentKey}-${quizIndex}-${oKey}-${innerOKey}-multiple-selected-${answerIndex}`}
                            defaultChecked={text.selected}
                            onChange={e => onValueChange('selected', '', true)}/>
                    </FormControl>
                )}
                {singleRightAnswer === false && (
                    <FormControl id={`${parentKey}-${quizIndex}-${oKey}-${innerOKey}-multiple-right-${answerIndex}`}>
                        <FormLabel>Right</FormLabel>
                        <Checkbox
                            id={`${parentKey}-${quizIndex}-${oKey}-${innerOKey}-multiple-right-${answerIndex}`}
                            defaultChecked={text.right}
                            onChange={e => onValueChange('right', '', true)}/>
                    </FormControl>
                )}
                <FormControl id="audio">
                    <FormLabel>Audio</FormLabel>
                    <SingleFile
                        id="audio"
                        type="audio"
                        oKey="audio"
                        data={text.value}
                        onChange={data => onValueChange('audio', data['audio'])}
                        processing={processing}
                        setProcessing={setProcessing} />
                </FormControl>
            </SimpleGrid>
        </VStack>
    )
}
