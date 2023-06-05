import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react'
import { useParams, useHistory, Link as ReactLink } from 'react-router-dom'
import {
    Box,
    FormControl,
    FormLabel,
    Heading,
    Stack,
    StackDivider,
    VStack,
    Flex,
    Select,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    useToast,
    useDisclosure,
} from '@chakra-ui/react'
import { useModule, useUpdateExercise, useExercisesByModule } from '../../../../../core/hooks'
import { EXERCISE_TYPES } from '../../../../../core/constants'
import { useGenerateExerciseSearch } from '../../../../../core/helpers'
import FieldGroup from './FieldGroup'
import Quiz from './Quiz'
import Preview from './Preview'

export default function AddEdit () {
    const toast = useToast()
    const history = useHistory()
    const generateExercise = useGenerateExerciseSearch()
    const { onOpen, isOpen, onClose } = useDisclosure()
    const { moduleId, lessonIndex, exerciseIndex } = useParams()
    const exercise = useRef({
        type: 'fill_in_the_blank',
        quiz: [{
            id: new Date().getTime() * Math.random(),
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
        }],
    })
    const { getModule, module } = useModule()
    const { exercisesByModule, data: exercisesResponse } = useExercisesByModule()
    const { updateExercise, isLoading: isUpdateLoading } = useUpdateExercise()
    const [type, setType] = useState('fill_in_the_blank')
    const [loading, setLoading] = useState(exerciseIndex ? true : false)

    const existingExercise = useMemo(
        () => {
            if (!exercisesResponse?.data?.exercisesByModule) return
            return exercisesResponse.data.exercisesByModule.items[0]
        },
        [exercisesResponse]
    )

    const onTypeChange = useCallback(
        (e) => {
            setType(e.target.value)
            exercise.current.type = e.target.value
        },
        [setType, exercise]
    )

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault()
            const newExercise = {...existingExercise}
            delete newExercise.createdAt
            delete newExercise.updatedAt
            const newModifiedExercise = exercise.current
            newModifiedExercise.quiz.map(quiz => {
                delete quiz.id
                quiz.answers.map(answer => delete answer.id)
            })
            if (exerciseIndex) {
                newExercise.lessons[lessonIndex].exercises[exerciseIndex] = {...newModifiedExercise}
            } else {
                newExercise.lessons[lessonIndex].exercises = [newModifiedExercise, ...newExercise.lessons[lessonIndex].exercises]
            }
            newExercise.lessonsCount = newExercise.lessons.length
            // newExercise.search = generateExercise(newExercise)
            updateExercise(
                newExercise,
                {
                    onSuccess: () => {
                        toast({
                            status: 'success',
                            isClosable: true,
                            title: 'Exercise created successfully'
                        })
                        history.goBack()
                    }
                }
            )
        },
        [exercise, existingExercise]
    )

    useEffect(() => {
        if (!module) {
            getModule(moduleId)
        }

        exercisesByModule({module: moduleId})
    }, [])

    useEffect(() => {
        if (!existingExercise || !exerciseIndex) return
        const editableExercise = {...existingExercise.lessons[lessonIndex].exercises[exerciseIndex]}
        editableExercise.quiz = editableExercise.quiz.map(
            (quiz) => ({
                ...quiz,
                id: new Date().getTime() * Math.random(),
                answers: quiz.answers.map(answer => ({...answer, id: new Date().getTime() * Math.random()}))
            })
        )
        exercise.current = editableExercise
        setType(editableExercise.type)
        setLoading(false)
    }, [existingExercise, exerciseIndex])

    if (loading) return <></>

    return (
        <>
            <Box px={{ base: '4', md: '10' }} py="16" mx="auto">
                <form
                    id="settings-form"
                    onSubmit={onSubmit}>
                    <Stack spacing="4" divider={<StackDivider />}>
                        <Flex justifyContent="space-between">
                            <Heading size="lg" as="h1" paddingBottom="4">
                                Create Exercise
                            </Heading>
                            <Button
                                colorScheme="cyan"
                                color="white"
                                onClick={onOpen}>
                                Preview
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
                                    <BreadcrumbLink
                                        as={ReactLink}
                                        to={`/collection/modules/list/${module.id}/lesson/${lessonIndex}`}>
                                        Exercises
                                    </BreadcrumbLink>
                                </BreadcrumbItem>

                                <BreadcrumbItem>
                                    <BreadcrumbLink>{exerciseIndex ? 'Edit Exercise' : 'Create Exercise'}</BreadcrumbLink>
                                </BreadcrumbItem>
                            </Breadcrumb>
                        )}
                        <FieldGroup title="Information">
                            <VStack width="full" spacing="6">
                                <FormControl id="type">
                                    <FormLabel>Type</FormLabel>
                                    <Select
                                        value={type}
                                        onChange={onTypeChange}>
                                        {Object.entries(EXERCISE_TYPES).map(
                                            ([key, value]) => (
                                                <option
                                                    key={key}
                                                    value={key}>
                                                    {value}
                                                </option>
                                            )
                                        )}
                                    </Select>
                                </FormControl>
                            </VStack>
                        </FieldGroup>
                        <FieldGroup title="Quiz">
                            <VStack width="full" spacing="6">
                                <Quiz
                                    exercise={exercise}
                                    type={type} />
                            </VStack>
                        </FieldGroup>
                        <Flex justifyContent="flex-end">
                            <Button
                                type="submit"
                                isDisabled={isUpdateLoading}
                                isLoading={isUpdateLoading}>
                                {exerciseIndex ? 'Update' : 'Create'}
                            </Button>
                        </Flex>
                    </Stack>
                </form>
            </Box>
            {isOpen && (
                <Preview
                    type={type}
                    exercise={exercise.current}
                    isOpen={isOpen}
                    onClose={onClose} />
            )}
        </>
    )
}
