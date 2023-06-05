import { useMutation } from 'react-query'
import { exerciseUseCase } from '../../factories'

const useExercisesBySearch = () => {
    const {mutate: exercisesBySearch, isLoading, data, error} = useMutation(exerciseUseCase.exercisesBySearch)

    return {
        exercisesBySearch,
        isLoading,
        data,
        error
    }
}

export default useExercisesBySearch
