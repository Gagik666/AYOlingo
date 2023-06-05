import { useMutation } from 'react-query'
import { exerciseUseCase } from '../../factories'

const useListExercises = () => {
    const {
        mutate: listExercises, isLoading, data, error,
    } = useMutation(exerciseUseCase.listExercises)

    return {
        listExercises,
        isLoading,
        error,
        data,
    }
}

export default useListExercises
