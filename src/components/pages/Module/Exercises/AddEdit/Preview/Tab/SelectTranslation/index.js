import React, { useMemo } from 'react'
import {
    Box,
    Flex,
    Heading,
} from '@chakra-ui/react'

export default function SelectTranslation ({
    data
}) {
    const quiz = data.quiz[0]
    const answers = useMemo(
        () => {
            const newAnswers = quiz.answers
            return newAnswers.sort(() => Math.random() - 0.5)
        },
        [quiz]
    )

    return (
        <Box w="100%">
            <Heading
                as="span"
                display="block"
                color="white.100"
                textAlign="center"
                size="md">
                {quiz.question.id}
            </Heading>
            <Box
                as="span"
                display="block"
                textAlign="center">
                {quiz.question.transliteration}
            </Box>
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
                            <Box as="span">
                                {answer.value.id}
                            </Box>
                            {answer.value.transliteration?.length > 0 && (
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