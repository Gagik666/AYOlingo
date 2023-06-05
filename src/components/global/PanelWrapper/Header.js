import React, { useCallback, useEffect, useState, Fragment } from 'react'
import { Link as ReactLink } from 'react-router-dom'
import {
    Box,
    Modal,
    ModalContent,
    ModalBody,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Heading,
    Link,
    Stack,
    UnorderedList,
    ListItem,
    Button,
    useColorModeValue as mode
} from '@chakra-ui/react'
import { useSearchUsers, useSearchModules, useSearchExercisesElastic, useUser } from '../../../core/hooks'
import HeaderSearch from './HeaderSearch'

const DEFAULT_PAGE = {page: {from: 0, limit: 10}}

export default function Header ({ left }) {
    const { user } = useUser()
    const { searchUsers, isLoading: isUsersLoading } = useSearchUsers()
    const { searchModules, isLoading: isModulesLoading } = useSearchModules()
    const { searchExercises, isLoading: isExercisesLoading } = useSearchExercisesElastic()
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [data, setData] = useState({rows: null, filters: {modules: DEFAULT_PAGE, exercises: DEFAULT_PAGE, users: DEFAULT_PAGE}})
    const [search, setSearch] = useState('')

    const modifiedExercise = (exercises, search) => {
        const filteredData = []
        exercises.map(
            (exercise) => {
                const newExercise = {
                    id: exercise._source.id,
                    module: exercise._source.module,
                    quiz: []
                }
                let questionIncludes = false
                let answerIncludes = false
                exercise._source.lessons.map(
                    (lesson, lessonIndex) => lesson.exercises.map(
                        (singleExercise, exerciseIndex) => singleExercise.quiz.map(
                            (quiz) => {
                                const regex = new RegExp(search, 'gi')
                                questionIncludes = quiz.question.id?.match(regex) || quiz.question.transliteration?.match(regex)
                                quiz.answers.map(
                                    (answer) => answerIncludes = answer.value.id?.match(regex) || answer.value.transliteration?.match(regex)
                                )
                                if (questionIncludes || answerIncludes) {
                                    newExercise.quiz.push(quiz)
                                    newExercise.lessonIndex = lessonIndex
                                    newExercise.exerciseIndex = exerciseIndex
                                }
                            }
                        )
                    )
                )
                if (newExercise.quiz.length > 0) filteredData.push(newExercise)
            }
        )

        return filteredData
    }

    const loadMore = useCallback(
        (key) => {
            let filter = data.filters[key].filter
            const search = data.filters[key].search
            switch (key) {
                case 'modules':
                    filter.from = filter.from || 0
                    filter.from += filter.limit
                    delete filter.page
                    searchModules(filter, {
                        onSuccess: (response) => setData(data => ({
                                rows: {
                                    ...data.rows,
                                    modules: {
                                        ...response.data.searchModules,
                                        items: [...data.rows.modules.items, ...response.data.searchModules.items],
                                    },
                                },
                                filters: {
                                    ...data.filters,
                                    modules: {filter, search}
                                }
                            })
                        )
                    })
                    break;
                case 'exercises':
                    filter.from += filter.size
                    searchExercises(filter, {
                        onSuccess: (response) => {
                            setData(data => ({
                                rows: {
                                    ...data.rows,
                                    exercises: {
                                        items: [...data.rows.exercises.items, ...modifiedExercise(response.data.hits.hits, search)],
                                        responseLength: response.data.hits.hits.length,
                                        total: response.data.hits.total
                                    }
                                },
                                filters: {
                                    ...data.filters,
                                    exercises: {filter, search}
                                }
                            }))
                    }
                    })
                    break;
                case 'users':
                    filter.from = filter.from || 0
                    filter.from += filter.limit
                    delete filter.page
                    searchUsers(filter, {
                        onSuccess: (response) => setData(data => ({
                                rows: {
                                    ...data.rows,
                                    users: {
                                        ...response.data.searchUsers,
                                        items: [...data.rows.users.items, ...response.data.searchUsers.items],
                                    },
                                },
                                filters: {
                                    ...data.filters,
                                    users: {filter, search}
                                }
                            })
                        )
                    })
            }
        },
        [data.filters]
    )

    const onSearch = useCallback(
        () => {
            const usersFilter = {
                filter: {
                    or: [
                        {firstName: {matchPhrasePrefix: search}},
                        {lastName: {matchPhrasePrefix: search}},
                        {email: {matchPhrasePrefix: search}},
                    ],
                    id: {ne: user.id}
                },
                limit: 10,
            }
    
            const modulesFilter = {
                filter: {
                    name: { matchPhrasePrefix: search },
                },
                limit: 1,
            }
    
            const exercisesFilter = {
                "query": {
                    "bool": {
                        "must": {
                            "query_string": {
                                "fields": [
                                    "lessons.exercises.quiz.question.id",
                                    "lessons.exercises.quiz.answers.value.id"
                                ],
                                "query": `*${search}*`
                            }
                        }
                    }
                },
                "size": 2,
                "from": 0
            }
    
            searchUsers(usersFilter, {
                onSuccess: (response) => setData(data => ({
                        rows: {
                            ...data.rows,
                            users: response.data.searchUsers
                        },
                        filters: {
                            ...data.filters,
                            users: {filter: usersFilter, search}
                        }
                    })
                )
            })
            searchModules(modulesFilter, {
                onSuccess: (response) => setData(data => ({
                        rows: {
                            ...data.rows,
                            modules: response.data.searchModules,
                        },
                        filters: {
                            ...data.filters,
                            modules: {filter: modulesFilter, search}
                        }
                    })
                )
            })
            searchExercises(exercisesFilter, {
                onSuccess: (response) => setData(data => ({
                        rows: {
                            ...data.rows,
                            exercises: {
                                items: modifiedExercise(response.data.hits.hits, search),
                                responseLength: response.data.hits.hits.length,
                                total: response.data.hits.total
                            }
                        },
                        filters: {
                            ...data.filters,
                            exercises: {filter: exercisesFilter, search}
                        }
                    })
                )
            })
        },
        [search, user, data.filters]
    )

    useEffect(() => {
        if (!data.rows) return
        onOpen()
    }, [data.rows])

    return (
        <Box
            w={`calc(100vw - ${left})`}
            position="absolute"
            height="50px"
            top={0}
            left={left}
            boxShadow="20px -6px 10px black"
            pl="5"
            display="flex"
            alignItems="center"
            backgroundColor="white"
            zIndex={10}>
            <HeaderSearch
                maxW="400px"
                search={search}
                setSearch={setSearch}
                onSearch={onSearch} />
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Results for - {search}</ModalHeader>
                    <ModalBody>
                        <HeaderSearch
                            maxW="100%"
                            search={search}
                            setSearch={setSearch}
                            onSearch={onSearch} />
                        {data.rows && Object.entries(data.rows).map(
                            ([key, value]) => {
                                console.log('#ed loop data:', key, value)
                                return (
                                    <Box
                                        key={key}
                                        my="3">
                                        <Heading
                                            as="span"
                                            size="md"
                                            textTransform="capitalize">
                                                {key}
                                        </Heading>
                                        <Stack
                                            mt="3"
                                            pl="4"
                                            spacing={3}>
                                            {value.length === 0 && (
                                                <Box as="span">Nothing to show</Box>
                                            )}
                                            {key === 'modules' && value && (
                                                <>
                                                    <Box>
                                                        {value.items.map(
                                                            (module) => (
                                                                <Link
                                                                    as={ReactLink}
                                                                    target="_blank"
                                                                    display="block"
                                                                    color={mode('blue.500', 'blue.300')}
                                                                    to={`/collection/modules/list?edit=${module.id}`}>
                                                                    {module.name}
                                                                </Link>
                                                            )
                                                        )}
                                                    </Box>
                                                    {value.total !== value.items.length && (
                                                        <Button
                                                            size="xs"
                                                            mt={3}
                                                            isLoading={isModulesLoading}
                                                            isDisabled={isModulesLoading}
                                                            onClick={() => loadMore(key)}>
                                                            Load More
                                                        </Button>
                                                    )}
                                                </>
                                            )}
                                            {key === 'users' && value?.items && (
                                                <>
                                                    <Box>
                                                        {value.items.map(
                                                            (user) => (
                                                                <Link
                                                                    as={ReactLink}
                                                                    target="_blank"
                                                                    display="block"
                                                                    color={mode('blue.500', 'blue.300')}
                                                                    to={`/users/list?search=${user.email}`}>
                                                                    {user.email}
                                                                </Link>
                                                            )
                                                        )}
                                                    </Box>
                                                    {value.total !== value.items.length && (
                                                        <Button
                                                            size="xs"
                                                            mt={3}
                                                            isLoading={isUsersLoading}
                                                            isDisabled={isUsersLoading}
                                                            onClick={() => loadMore(key)}>
                                                            Load More
                                                        </Button>
                                                    )}
                                                </>
                                            )}
                                            {key === 'exercises' && value?.items && (
                                                <Box>
                                                    {value.items.map(
                                                        (exercise) => (
                                                            <Fragment key={exercise.id}>
                                                                {exercise.quiz.map(
                                                                    (quiz, quizIndex) => (
                                                                        <Box key={`quiz-${quiz.question.id}-${quizIndex}`}>
                                                                            <Heading
                                                                                as={ReactLink}
                                                                                target="_blank"
                                                                                size="xs"
                                                                                to={`/collection/modules/list/${exercise.module}/lesson/${exercise.lessonIndex}/edit-exercise/${exercise.exerciseIndex}`}
                                                                                color={mode('blue.500', 'blue.300')}>
                                                                                {quiz.question.id}
                                                                            </Heading>
                                                                            {quiz.answers.length > 0 && (
                                                                                <UnorderedList>
                                                                                    {quiz.answers.map(
                                                                                        (answer, index) => (
                                                                                            <ListItem key={`answer-${answer.value.id}-${index}`}>
                                                                                                {answer.value.id}
                                                                                            </ListItem>
                                                                                        )
                                                                                    )}
                                                                                </UnorderedList>
                                                                            )}
                                                                        </Box>
                                                                    )
                                                                )}
                                                            </Fragment>
                                                        )
                                                    )}
                                                    {value.responseLength !== 0 && (
                                                        <Button
                                                            size="xs"
                                                            mt={3}
                                                            isLoading={isExercisesLoading}
                                                            isDisabled={isExercisesLoading}
                                                            onClick={() => loadMore(key)}>
                                                            Load More
                                                        </Button>
                                                    )}
                                                </Box>
                                            )}
                                        </Stack>
                                    </Box>
                                )
                            }
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}
