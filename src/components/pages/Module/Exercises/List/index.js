import React, { useEffect, Fragment, useCallback } from 'react'
import { Link as ReactLink, useParams } from 'react-router-dom'
import {
    Box,
    Flex,
    Heading,
    ButtonGroup,
    Button,
    Table,
    Tr,
    Td,
    Thead,
    Th,
    Tbody,
    UnorderedList,
    ListItem,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    useDisclosure,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import { useModule, useUpdateExercise } from '../../../../../core/hooks'
import { EXERCISE_TYPES } from '../../../../../core/constants'

export default function Exercises () {
    const { moduleId, lessonIndex } = useParams()
    const { getModule, module, exercise, loadExercise } = useModule()
    const { updateExercise, isLoading } = useUpdateExercise()

    const onDelete = useCallback(
        (index) => {
            const newExercise = {...exercise}
            newExercise.lessons[lessonIndex].exercises = newExercise.lessons[lessonIndex].exercises.filter((e, i) => i !== index)
            delete newExercise.createdAt
            delete newExercise.updatedAt
            updateExercise(
                newExercise,
                {
                    onSuccess: () => loadExercise(moduleId)
                }
            )
        },
        [exercise, moduleId]
    )

    useEffect(() => {
        if (moduleId || !module) getModule(moduleId)
        loadExercise(moduleId)
    }, [])

    return (
        <Box as="section" py="12">
            <Box
                maxW={{ base: 'xl', md: '7xl' }}
                mx="auto"
                px={{ base: '6', md: '8' }}>
                <Box overflowX="auto">
                    <Flex
                        justifyContent="space-between"
                        alignItems="center">
                        <Heading size="lg" mb="6">
                            Lesson {lessonIndex * 1 + 1} Exercises
                        </Heading>
                        <Button
                            as={ReactLink}
                            size="sm"
                            to={`/collection/modules/list/${moduleId}/lesson/${lessonIndex}/create-exercise`}>
                            Create new exercise
                        </Button>
                    </Flex>
                    {module && (
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    as={ReactLink}
                                    to="/collection/modules/list">
                                    Modules
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink>
                                    {module.name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    as={ReactLink}
                                    to={`/collection/modules/list/${module.id}/lessons`}>
                                    Lesson {parseInt(lessonIndex) + 1}
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink>Exercises</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    )}
                    <Table
                        my="8"
                        borderWidth="1px"
                        fontSize="sm">
                        <Thead bg={mode('gray.50', 'gray.800')}>
                            <Tr>
                                <Th>#</Th>
                                <Th>Type</Th>
                                <Th>Questions</Th>
                                <Th>Correct Answers</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {exercise?.lessons[lessonIndex].exercises.map(
                                (exercise, index) => (
                                    <ExerciseRow
                                        key={`lesson-${index}`}
                                        index={index}
                                        exercise={exercise}
                                        isLoading={isLoading}
                                        moduleId={moduleId}
                                        lessonIndex={lessonIndex}
                                        onDelete={onDelete} />
                                )
                            )}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </Box>
    )
}


const ExerciseRow = ({
    index,
    exercise,
    isLoading,
    moduleId,
    lessonIndex,
    onDelete,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <AlertDialog isOpen={isOpen} onClose={onClose}>
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete Lesson
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={() => onDelete(index)} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Tr>
                <Td>
                    {index + 1}
                </Td>
                <Td>
                    {EXERCISE_TYPES[exercise.type]}
                </Td>
                <Td>
                    <UnorderedList>
                        {exercise.quiz.filter(quiz => quiz.question.id).map(
                            (quiz) => (
                                <ListItem key={`question-${quiz.question.id}`}>
                                    {quiz.question.id}
                                </ListItem>
                            )
                        )}
                    </UnorderedList>
                </Td>
                <Td>
                    <UnorderedList>
                        {exercise.quiz.map(
                            (quiz) => (
                                <Fragment key={`answer-${quiz.question.id}`}>
                                    <ListItem>
                                        {quiz.answers.filter(answer => answer.right).map(answer => `${answer.value.id} `)}
                                    </ListItem>
                                </Fragment>
                            )
                        )}
                    </UnorderedList>
                </Td>
                <Td>
                    <ButtonGroup>
                        <Button
                            as={ReactLink}
                            colorScheme="blue"
                            size="sm"
                            variant="link"
                            isLoading={isLoading}
                            to={`/collection/modules/list/${moduleId}/lesson/${lessonIndex}/edit-exercise/${index}`}>
                            Edit
                        </Button>
                        <Button
                            colorScheme="red"
                            size="sm"
                            variant="link"
                            isLoading={isLoading}
                            onClick={onOpen}>
                            Delete
                        </Button>
                    </ButtonGroup>
                </Td>
            </Tr>
        </>
    )
}