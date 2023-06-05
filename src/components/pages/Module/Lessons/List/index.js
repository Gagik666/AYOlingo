import React, { useEffect, useCallback, useMemo } from 'react'
import { Link as ReactLink, useParams } from 'react-router-dom'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { HiViewList } from 'react-icons/hi'
import { BsTrash } from 'react-icons/bs'
import arrayMove from 'array-move'
import {
    Box,
    Heading,
    Link,
    Flex,
    Button,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    IconButton,
    useToast,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useColorModeValue as mode,
    useDisclosure,
} from '@chakra-ui/react'
import { useUpdateExercise, useModule } from '../../../../../core/hooks'

export default function List () {
    const toast = useToast()
    const { moduleId } = useParams()
    const { exercise, loadExercise, modules, exercisesLoading, loadModules } = useModule()
    const { updateExercise, isLoading: isUpdateLoading } = useUpdateExercise()

    const module = useMemo(
        () => {
            if (!modules?.items) return
            return modules.items.find(module => module.id === moduleId)
        },
        [modules, moduleId]
    )

    const onSortEnd = useCallback(
        ({oldIndex, newIndex}) => {
            const newExercise = {
                id: exercise.id,
                lessons: arrayMove(exercise.lessons, oldIndex, newIndex)
            }
            updateExercise(
                newExercise,
                {
                    onSuccess: () => {
                        toast({
                            isClosable: true,
                            title: 'Order saved',
                            status: 'success'
                        })
                    }
                }
            )
        },
        [exercise]
    )

    const onLessonCreate = useCallback(
        () => {
            const newLesson = {exercises: []}
            const lessons = exercise?.lessons ? [...exercise.lessons, newLesson] : [newLesson]
            const newExercise = {
                id: exercise.id,
                module: exercise.module,
                lessons,
                lessonsCount: lessons.length,
            }
            updateExercise(
                newExercise,
                {
                    onSuccess: () => {
                        toast({
                            isClosable: true,
                            title: 'New Lesson Created successfully',
                            status: 'success'
                        })
                        loadExercise(moduleId)
                    }
                }
            )
        },
        [exercise]
    )

    const onLessonDelete = useCallback(
        (index) => {
            const newLessons = exercise.lessons.filter((l, i) => i !== index)
            const newExercise = {
                id: exercise.id,
                module: exercise.module,
                lessons: newLessons,
                lessonsCount: newLessons.length
            }

            updateExercise(
                newExercise,
                {
                    onSuccess: () => {
                        toast({
                            isClosable: true,
                            title: 'Lesson deleted successfully',
                            status: 'success'
                        })
                        loadExercise(moduleId)
                    }
                }
            )
        },
        [exercise]
    )

    useEffect(() => {
        loadExercise(moduleId)
    }, [moduleId])

    useEffect(() => {
        if (modules) return
        loadModules({
            filter: {id: {eq: moduleId}}
        })
    }, [modules, moduleId])

    if (!module) return <></>

    const SortableList = SortableContainer(({items, onLessonDelete }) => {
        return (
            <Tbody>
                {items.map(
                    (row, index) => (
                        <SortableItem
                            key={`lesson-${index}`}
                            index={index}
                            sIndex={index}
                            row={row}
                            moduleId={moduleId}
                            onLessonDelete={onLessonDelete} />
                    )
                )}
            </Tbody>
        )
    })

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
                            Lessons
                        </Heading>
                        <Button
                            size="sm"
                            onClick={onLessonCreate}
                            isLoading={isUpdateLoading || exercisesLoading}>
                            Create new lesson
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
                                <BreadcrumbLink>Lessons</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    )}
                    <Table
                        my="8"
                        borderWidth="1px"
                        fontSize="sm">
                        <Thead bg={mode('gray.50', 'gray.800')}>
                            <Tr>
                                <Th>Lesson</Th>
                                <Th>Sort</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <SortableList
                            items={exercise?.lessons || []}
                            onLessonDelete={onLessonDelete}
                            pressDelay={200}
                            onSortEnd={onSortEnd} />
                    </Table>
                </Box>
            </Box>
        </Box>
    )
}

const SortableItem = SortableElement(({
    sIndex: index,
    moduleId,
    onLessonDelete,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const onDelete = (e) => {
        e.stopPropagation();

        onOpen();
    }

    return (
        <Tr>
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
                        <Button colorScheme='red' onClick={() => onLessonDelete(index)} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Td>
                <Link
                    as={ReactLink}
                    to={`/collection/modules/list/${moduleId}/lesson/${index}`}>
                    Lesson {index + 1}
                </Link>
            </Td>
            <Td>
                <IconButton
                    icon={<HiViewList />} />
            </Td>
            <Td>
                <IconButton
                    icon={<BsTrash />}
                    onClick={onDelete} />
            </Td>
        </Tr>
    )
})
