import { useMutation } from 'react-query'
import { exerciseUseCase } from '../../factories'

const useCreateExercise = () => {
    const { mutate: createExercise, isLoading, data, error } = useMutation(exerciseUseCase.createExercise)

    return {
        createExercise,
        isLoading,
        error,
        data,
    }
}

export default useCreateExercise
