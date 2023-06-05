import React, { useState, useCallback } from 'react'
import { Link as ReactLink } from 'react-router-dom'
import {
    Box,
    Heading,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Badge,
    UnorderedList,
    ListItem,
    Text,
    Flex,
    Link,
    ButtonGroup,
    Button,
    useColorModeValue as mode
} from '@chakra-ui/react'
import { useSearchExercises } from '../../../../core/hooks'
import { EXERCISE_TYPES } from '../../../../core/constants'

export default function ModuleAccordion ({
    module,
}) {
    const { searchExercises, isLoading } = useSearchExercises()
    const [exercise, setExercise] = useState()

    const getExercise = useCallback(
        () => {
            if (exercise || isLoading) return
            searchExercises(
                {
                    filter: {
                        module: { eq: module.id }
                    }
                },
                {
                    onSuccess: (response) => setExercise(response.data.searchExercises.items[0])
                }
            )
        },
        [exercise, module, setExercise, isLoading]
    )

    // useEffect(() => {
    //     if (!exercisesResponse) return
    //     setExercises(
    //         (exercises) => [...exercises.items, ...exercisesResponse.data.searchExercises.items]
    //     )
    // }, [exercisesResponse])

    return (
        <AccordionItem>
            <AccordionButton
                disabled={isLoading}
                onClick={getExercise}>
                <Flex
                    w="100%"
                    justifyContent="space-between">
                    <Text>
                        {module.name}
                    </Text>
                    <Link
                        as={ReactLink}
                        color={mode('blue.500', 'blue.300')}
                        to={`/collection/modules/list?edit=${module.id}`}>
                        Edit
                    </Link>
                </Flex>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel
                pb={4}
                pl={10}>
                <Accordion
                    allowMultiple={true}
                    allowToggle={true}>
                    {isLoading && (
                        <span>Loading ... </span>
                    )}
                    {exercise?.lessons.map(
                        (exercise, lessonIndex) => (
                            <AccordionItem key={`exercise-lesson-${lessonIndex}`}>
                                <h2>
                                    <AccordionButton>
                                        <Flex
                                            w="100%"
                                            justifyContent="space-between">
                                            <Text>
                                                Lesson {lessonIndex + 1}
                                            </Text>
                                            <Link
                                                as={ReactLink}
                                                color={mode('blue.500', 'blue.300')}
                                                to={`/collection/modules/list/${module.id}/lesson/${lessonIndex}`}>
                                                View
                                            </Link>
                                        </Flex>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel
                                    pb={4}
                                    pl={10}>
                                    <Accordion
                                        allowMultiple={true}
                                        allowToggle={true}>
                                        {exercise?.exercises.map(
                                            (row, index) => (
                                                <AccordionItem key={`lesson-${lessonIndex}-exercise-${index}`}>
                                                    <h2>
                                                        <AccordionButton>
                                                            <Box flex="1" textAlign="left">
                                                                <Flex
                                                                    w="100%"
                                                                    justifyContent="space-between">
                                                                    <Text>
                                                                        {EXERCISE_TYPES[row.type]}
                                                                    </Text>
                                                                    <Link
                                                                        as={ReactLink}
                                                                        color={mode('blue.500', 'blue.300')}
                                                                        to={`/collection/modules/list/${module.id}/lesson/${lessonIndex}/edit-exercise/${index}`}>
                                                                        Edit
                                                                    </Link>
                                                                </Flex>
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                    </h2>
                                                    <AccordionPanel
                                                        pb={4}
                                                        pl={10}>
                                                        <Accordion
                                                            allowMultiple={true}
                                                            allowToggle={true}>
                                                            {row?.quiz.map(
                                                                (quiz, quizIndex) => (
                                                                    <AccordionItem key={`lesson-${lessonIndex}-exercise-${index}-quiz${quizIndex}`}>
                                                                        <h2>
                                                                            <AccordionButton>
                                                                                <Box flex="1" textAlign="left">
                                                                                    Quiz {quizIndex + 1}
                                                                                </Box>
                                                                                <AccordionIcon />
                                                                            </AccordionButton>
                                                                        </h2>
                                                                        <AccordionPanel
                                                                            pb={4}
                                                                            pl={10}>
                                                                            <Accordion
                                                                                allowMultiple={true}
                                                                                allowToggle={true}>
                                                                                <AccordionItem key={`lesson-${lessonIndex}-exercise-${index}-quiz${quizIndex}-question-${quiz.question.id}`}>
                                                                                    <h2>
                                                                                        <AccordionButton>
                                                                                            <Box flex="1" textAlign="left">
                                                                                                {quiz.question.id} <Badge colorScheme="blue" color="white">Question</Badge>
                                                                                            </Box>
                                                                                            <AccordionIcon />
                                                                                        </AccordionButton>
                                                                                    </h2>
                                                                                    <AccordionPanel
                                                                                        pb={4}
                                                                                        pl={10}>
                                                                                        <UnorderedList>
                                                                                            {quiz.answers.map(
                                                                                                (answer, index) => (
                                                                                                    <ListItem key={`answer-${answer.id}-${index}`}>
                                                                                                        {answer.value.id} {answer.right ? <Badge colorScheme="green">Correct</Badge> : ''}
                                                                                                    </ListItem>
                                                                                                )
                                                                                            )}
                                                                                        </UnorderedList>
                                                                                    </AccordionPanel>
                                                                                </AccordionItem>
                                                                            </Accordion>
                                                                        </AccordionPanel>
                                                                    </AccordionItem>
                                                                )
                                                            )}
                                                        </Accordion>
                                                    </AccordionPanel>
                                                </AccordionItem>
                                            )
                                        )}
                                    </Accordion>
                                </AccordionPanel>
                            </AccordionItem>
                        )
                    )}
                </Accordion>
            </AccordionPanel>
        </AccordionItem>
    )
}
