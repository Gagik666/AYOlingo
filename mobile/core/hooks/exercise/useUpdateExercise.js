import { useMutation } from 'react-query'
import { exerciseUseCase } from '../../factories'

const useUpdateExercise = () => {
    const {
        mutate: updateExercise, isLoading, data, error,
    } = useMutation(exerciseUseCase.updateExercise)

    return {
        updateExercise,
        isLoading,
        error,
        data,
    }
}

export default useUpdateExercise
