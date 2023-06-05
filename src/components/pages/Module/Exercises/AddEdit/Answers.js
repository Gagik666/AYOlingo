import React, { useCallback, useState, useMemo } from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import {
    IconButton,
    Flex,
    Heading,
    Box,
} from '@chakra-ui/react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { HiViewList } from 'react-icons/hi'
import Text from './Text'
import { useModule } from '../../../../../core/hooks'

export default function Answers ({ exercise, quizIndex, type }) {
    const { module } = useModule()
    const [answers, setAnswers] = useState(exercise.current.quiz[quizIndex].answers)
    const [singleRightAnswerIndex, setSingleRightAnswerIndex] = useState(type === 'select_translation' ? exercise.current.quiz[quizIndex].answers.findIndex(answer => answer.right) : 0)

    const answersCanBeMultiple = useMemo(
        () => {
            return type !== 'match_these_translations' && type !== 'match_these_pairs'
        },
        [type]
    )

    const onSortEnd = useCallback(
        ({oldIndex, newIndex}) => {
            setAnswers(
                (oldAnswers) => {
                    const newAnswers = arrayMove(oldAnswers, oldIndex, newIndex)
                    exercise.current.quiz[quizIndex].answers = newAnswers
                    return newAnswers
                }
            )
        },
        []
    )

    const onAddAnswer = useCallback(
        () => {
            const EMPTY_TEXT = {
                id: '',
                transliteration: '',
                audio: '',
            }
            const EMPTY_ANSWER = {
                value: EMPTY_TEXT,
                right: false,
                image: '',
                id: new Date().getTime() * Math.random()
            }
            const id = new Date().getTime() * Math.random()
            setAnswers(answers => [...answers, {...EMPTY_ANSWER, id}])
            exercise.current.quiz[quizIndex].answers = [...exercise.current.quiz[quizIndex].answers, {...EMPTY_ANSWER, id}]
        },
        [setAnswers, exercise]
    )

    const onRemoveAnswer = useCallback(
        (id) => {
            setAnswers(
                (answers) => {
                    const newAnswers = [...answers].filter(answer => answer.id !== id)
                    exercise.current.quiz[quizIndex].answers = newAnswers
                    return newAnswers
                }
            )
        },
        [setAnswers, exercise]
    )

    const SortableItem = SortableElement(({
        answer,
        sIndex: index,
    }) => {
        return (
            <Box w="100%">
                <Flex
                    alignItems="center"
                    pt="3">
                    {answersCanBeMultiple && (
                        <IconButton
                            icon={<HiViewList />}
                            mr={3} />
                    )}
                    <Heading
                        size="md"
                        as="span"
                        mr={2}>
                        Answer {index + 1}
                    </Heading>
                    {answersCanBeMultiple && (
                        <>
                            <IconButton
                                isRound={true}
                                icon={<AiOutlinePlus/>}
                                mx="2"
                                onClick={onAddAnswer}
                            />
                            {answers.length > 1 && (
                                <IconButton
                                    isRound={true}
                                    icon={<AiOutlineMinus/>}
                                    onClick={() => onRemoveAnswer(answer.id)}
                                />
                            )}
                        </>
                    )}
                </Flex>
                <Text
                    parentKey="quiz"
                    oKey="answers"
                    innerOKey="value"
                    type={type}
                    quizIndex={quizIndex}
                    singleRightAnswerIndex={singleRightAnswerIndex}
                    setSingleRightAnswerIndex={setSingleRightAnswerIndex}
                    answerIndex={index}
                    data={exercise}
                    languages={module ? [module.languageFrom, module.languageTo] : []}
                    parentProps={{pl: "8"}} />
            </Box>
        )
    })

    const SortableList = SortableContainer(({answers}) => {
        return (
            <Box>
                {answers.map(
                    (answer, index) => (
                        <SortableItem
                            key={`quiz-${quizIndex}-answer-${index}`}
                            disabled={!answersCanBeMultiple}
                            index={index}
                            answer={answer}
                            sIndex={index} />
                    )
                )}
            </Box>
        )
    })

    return (
        <SortableList
            answers={answers || []}
            pressDelay={200}
            onSortEnd={onSortEnd} />
    )
}
