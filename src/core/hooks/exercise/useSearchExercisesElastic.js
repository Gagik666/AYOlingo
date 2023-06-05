import { useMutation } from 'react-query'
import { exerciseUseCase } from '../../factories'

const useSearchExercisesElastic = () => {
    const {
        mutate: searchExercises,
        data,
        error,
        isLoading,
    } = useMutation(exerciseUseCase.searchExercisesElastic)

    return {
        searchExercises,
        data,
        error,
        isLoading
    }
}

export default useSearchExercisesElastic
