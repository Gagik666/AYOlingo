import React, { useMemo } from 'react'
import {
    Box,
    Flex,
    Heading
} from '@chakra-ui/react'

export default function FillInTheBlank ({
    data
}) {
    const quiz = data.quiz[0]

    const answers = useMemo(
        () => {
            const newAnswers = quiz.answers.filter(answer => !answer.selected)
            return newAnswers.sort(() => Math.random() - 0.5)
        },
        [quiz]
    )
    const rightAnswers = useMemo(
        () => {
            const answers = quiz.answers
                .filter(answer => answer.right)
                .map(
                    (answer, index) => {
                        const newAnswer = {...answer}
                        if (answer.selected) {
                            newAnswer.answered = true
                        } else {
                            newAnswer.answered = false
                        }
                        return newAnswer
                    }
                )
            return answers
        },
        [quiz]
    )

    return (
        <Box w="100%">
            <Heading
                as="span"
                display="block"
                size="md"
                width="100%"
                textAlign="center"
                color="white.100"
                mr={3}>
                {quiz.question.id}
            </Heading>
            <Heading
                as="span"
                size="sm"
                width="100%"
                display="block"
                textAlign="center"
                fontWeight="500"
                color="white.100"
                mr={3}>
                {quiz.question.transliteration}
            </Heading>
            <Flex justifyContent="center">
                {rightAnswers.map(
                    (answer, index) => (
                        <Flex
                            key={`answer-${answer.value.id}-${index}`}
                            py={2}
                            px={3}
                            alignItems="center"
                            justifyContent="center"
                            flexFlow="wrap"
                            height={50}
                            backgroundColor="white.100"
                            mx={2}
                            my={2}>
                            <Box
                                fontSize="15px"
                                as="span"
                                display="block">
                                {!answer.answered ? '...' : answer.value.id}
                            </Box>
                        </Flex>
                    )
                )}
            </Flex>
            <Flex
                justifyContent="center"
                alignItems="center"
                flexFlow="wrap"
                px={6}
                py="4">
                {answers.map(
                    (answer, index) => (
                        <Flex
                            key={`value-${answer.value.id}-${index}`}
                            py={3}
                            px={5}
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                            my={4}
                            mx={2}
                            background="white.100">
                            <Box
                                as="span"
                                color="black"
                                fontSize="13px">
                                {answer.value.id}
                            </Box>
                            {answer.value.transliteration && (
                                <Box
                                    as="span"
                                    color="purple.100"
                                    fontSize="11px">
                                    {answer.value.transliteration}
                                </Box>
                            )}
                        </Flex>
                    ))
                }
            </Flex>
        </Box>
    )
}