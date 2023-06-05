import { useMutation } from 'react-query'
import { exerciseUseCase } from '../../factories'

const useDeleteExercise = () => {
    const {mutate: deleteExercise, isLoading, data, error} = useMutation(exerciseUseCase.deleteExercise)

    return {
        deleteExercise,
        isLoading,
        data,
        error
    }
}

export default useDeleteExercise
