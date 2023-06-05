import React, { useEffect, useState } from 'react'
import {
    Button,
    useToast
} from '@chakra-ui/react'
import { useCreateModule, useCreateExercise, useExercisesByModule } from '../../../../../core/hooks'

export default function CloneButton ({
    row: module,
    onChange,
    onEdit,
}) {
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const { createModule, error: createModuleError } = useCreateModule()
    const { createExercise, error: createExerciseError } = useCreateExercise()
    const { exercisesByModule, error: exercisesByModuleError } = useExercisesByModule()

    const onError = (e) => {
        toast({
            status: 'error',
            title: e.message || 'Something went wrong',
            isClosable: true
        })
        setLoading(false)
    }

    const onClone = () => {
        setLoading(true)
        exercisesByModule(
            {module: module.id},
            {
                onSuccess: (exercisesByModule) => {
                    const newModuleInput = {...module}
                    delete newModuleInput.id
                    delete newModuleInput.createdAt
                    delete newModuleInput.updatedAt
                    newModuleInput.name = newModuleInput.name + ' | CLONED'
                    newModuleInput.published = false
                    newModuleInput.createdAt = new Date().toISOString()
                    createModule(
                        newModuleInput,
                        {
                            onSuccess: (moduleResponse) => {
                                const newModule = moduleResponse.data.createModule
                                const exercises = exercisesByModule.data.exercisesByModule.items
                                Promise
                                    .all(
                                        exercises.map(
                                            (exercise) => {
                                                const newExerciseInput = {...exercise}
                                                delete newExerciseInput.id
                                                delete newExerciseInput.createdAt
                                                delete newExerciseInput.updatedAt
                                                newExerciseInput.module = newModule.id
                                                return createExercise(newExerciseInput)
                                            }
                                        )
                                    )
                                    .then(
                                        () => {
                                            onChange()
                                            toast({
                                                status: 'success',
                                                title: 'Cloned successfully',
                                                isClosable: true
                                            })
                                            onEdit(newModule)
                                        }
                                    )
                                    .catch(onError)
                                    .finally(() => setLoading(false))
                            }
                        }
                    )
                }
            }
        )
    }

    useEffect(() => {
        if (!createModuleError && !exercisesByModuleError && !createExerciseError) return
        onError(createModuleError || exercisesByModuleError || createExerciseError)
    }, [createModuleError, exercisesByModuleError, createExerciseError])

    return (
        <Button
            variant="link"
            colorScheme="gray"
            isLoading={loading}
            onClick={onClone}>
            Clone
        </Button>
    )
}