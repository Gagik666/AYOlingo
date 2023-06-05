import React, { useCallback, useState } from 'react'
import { Switch } from '@chakra-ui/react'
import { useExercisesByModule, useUpdateExercise, useUpdateModule } from '../../../../../core/hooks'

export default function PublishButton ({
    row: data
}) {
    const [module, setModule] = useState(data)
    const { updateModule, isLoading } = useUpdateModule()
    const { exercisesByModule, isLoading: exercisesByModuleLoading } = useExercisesByModule()
    const { updateExercise, isLoading: updateExerciseLoading } = useUpdateExercise()

    const togglePublish = useCallback(
        () => {
            const input = {
                ...module,
                published: !module.published
            }
            updateModule(
                input,
                {
                    onSuccess: (response) => setModule({...response.data.updateModule})
                }
            )
            exercisesByModule(
                {
                    module: input.id,
                },
                {
                    onSuccess: (response) => {
                        updateExercise({
                            id: response.data.exercisesByModule.items[0].id,
                            published: input.published
                        })
                    }
                }
            )
        },
        [module, setModule]
    )

    return (
        <Switch
            mr="1"
            colorScheme="green"
            value={module.published}
            isChecked={module.published}
            isDisabled={isLoading || updateExerciseLoading || exercisesByModuleLoading}
            onChange={togglePublish} />
    )
}
