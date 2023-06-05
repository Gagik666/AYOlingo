import React, { useState, useCallback, useMemo } from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import {
    Box,
    VStack,
    Heading,
    Flex,
    IconButton
} from '@chakra-ui/react'
import Text from './Text'
import Answers from './Answers'
import { useModule } from '../../../../../core/hooks'

export default function Quiz ({ exercise, type }) {
    const { module } = useModule()
    const [quiz, setQuiz] = useState(exercise.current.quiz)

    const quizCanBeMultiple = useMemo(
        () => {
            return type !== 'select_translation' && type !== 'fill_in_the_blank'
        },
        [type]
    )

    const onSortEnd = useCallback(
        ({oldIndex, newIndex}) => {
            setQuiz(
                (oldQuiz) => {
                    const newQuiz = arrayMove(oldQuiz, oldIndex, newIndex)
                    exercise.current.quiz = newQuiz
                    return newQuiz
                }
            )
        },
        []
    )

    const onAddQuiz = useCallback(
        () => {
            const id = new Date().getTime() * Math.random()
            const emptyQuiz = {
                id,
                question: {
                    id: '', // value,
                    transliteration: '',
                },
                answers: [{
                    value: {
                        id: '', // value,
                        transliteration: '',
                    },
                    right: false,
                    image: '',
                    id: new Date().getTime() * Math.random()
                }]
            }
            setQuiz(quiz => [emptyQuiz, ...quiz])
            exercise.current.quiz = [...exercise.current.quiz, emptyQuiz]
        },
        [setQuiz, exercise]
    )

    const onRemoveQuiz = useCallback(
        (id) => {
            setQuiz(
                (quiz) => {
                    console.log(quiz, id);
                    const newQuiz = [...quiz].filter(q => q.id !== id)
                    exercise.current.quiz = newQuiz
                    return newQuiz
                }
            )
        },
        [setQuiz, exercise]
    )

    const SortableItem = SortableElement(({
        singleQuiz,
        quiz,
        sIndex: index,
    }) => {
        return (
            <Box key={`quiz-${quiz.id}-${index}`}>
                <Flex alignItems="center">
                    <Heading
                        size="md"
                        as="span">
                        {quiz.length > 1 ? `Quiz ${index + 1}` : ''}
                    </Heading>
                    {quizCanBeMultiple && (
                        <>
                            <IconButton
                                isRound={true}
                                icon={<AiOutlinePlus/>}
                                ml="2"
                                onClick={onAddQuiz}
                            />
                            {quiz.length > 1 && (
                                <IconButton
                                    isRound={true}
                                    icon={<AiOutlineMinus/>}
                                    ml="2"
                                    onClick={() => onRemoveQuiz(singleQuiz.id)}
                                />
                            )}
                        </>
                    )}
                </Flex>
                <Heading
                    size="md"
                    as="span">
                    Question
                </Heading>
                {((type === 'translate_this_phrase' && index === 0) || type !== 'translate_this_phrase') && (
                    <Text
                        key={quiz.id}
                        parentKey="quiz"
                        oKey="question"
                        quizIndex={index}
                        data={exercise}
                        languages={module ? [module.languageFrom, module.languageTo] : []}
                        parentProps={{pl: "8"}} />
                )}
                <Answers
                    setQuiz={setQuiz}
                    exercise={exercise}
                    quizIndex={index}
                    type={type} />
            </Box>
        )
    })

    const SortableList = SortableContainer(({quiz}) => {
        return (
            <VStack
                w="100%"
                spacing="3"
                alignItems="flex-start">
                {quiz.map(
                    (q, index) => (
                        <SortableItem
                            index={index}
                            sIndex={index}
                            quiz={quiz}
                            singleQuiz={q} />
                    )
                )}
            </VStack>
        )
    })

    return (
        <SortableList
            quiz={quiz || []}
            pressDelay={200}
            onSortEnd={onSortEnd} />
    )
}
