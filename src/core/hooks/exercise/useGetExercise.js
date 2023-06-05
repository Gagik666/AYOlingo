import { useMutation } from 'react-query'
import { exerciseUseCase } from '../../factories'

const useGetExercise = () => {
    const { mutate: getExercise, isLoading, data, error } = useMutation(exerciseUseCase.getExercise)

    return {
        getExercise,
        isLoading,
        error,
        data,
    }
}

export default useGetExercise
