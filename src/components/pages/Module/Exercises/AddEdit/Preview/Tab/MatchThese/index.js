import React, { useMemo, useState } from 'react'
import {
    Box,
    Flex,
} from '@chakra-ui/react'

export default function MatchThese ({
    data
}) {
    const quiz = data.quiz[0]
    const answers = useMemo(
        () => {
            const newAnswers = [...data.quiz.map(quiz => quiz.answers[0])]
            return newAnswers.sort(() => Math.random() - 0.5)
        },
        [quiz]
    )

    return (
        <Box>
            {data.quiz.map(
                (quiz, index) => (
                    <Flex
                        key={quiz.question.id}
                        alignItems="center"
                        justifyContent="center"
                        mb={4}>
                        <Flex
                            flexDirection="column"
                            alignItems="flex-start"
                            justifyContent="center"
                            width="40%"
                            mr={3}>
                            <Box
                                as="span"
                                width="100%"
                                textAlign="center"
                                fontWeight="500"
                                color="white.100">
                                {quiz.question.id}
                            </Box>
                            {quiz.question.transliteration && (
                                <Box
                                    as="span"
                                    width="100%"
                                    textAlign="center"
                                    fontSize="15px">
                                    {quiz.question.transliteration}
                                </Box>
                            )}
                        </Flex>
                        <Box
                            width="45%"
                            height="40px"
                            backgroundColor="white.100">
                        </Box>
                    </Flex>
                )
            )}
            <Flex
                justifyContent="center"
                alignItems="center"
                flexFlow="wrap"
                px={10}
                mt={5}>
                {answers.map(
                    (answer, index) => (
                        <Flex
                            key={`answer-${answer.value.id}-${index}`}
                            backgroundColor="white.100"
                            mx={3}
                            mb={3}
                            px={6}
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                            borderRadius={100}
                            height="50px">
                            <Box as="span">{answer.value.id}</Box>
                            {answer.value.transliteration && (
                                <Box
                                    as="span"
                                    color="purple.100">
                                    {answer.value.transliteration}
                                </Box>
                            )}
                        </Flex>
                    )
                )}
            </Flex>
        </Box>
    )
}