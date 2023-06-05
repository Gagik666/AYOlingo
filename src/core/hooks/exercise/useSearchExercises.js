import { useMutation } from 'react-query'
import { exerciseUseCase } from '../../factories'

const useSearchExercises = () => {
    const {
        mutate: searchExercises, isLoading, data, error,
    } = useMutation(exerciseUseCase.searchExercises)

    return {
        searchExercises,
        isLoading,
        error,
        data,
    }
}

export default useSearchExercises
