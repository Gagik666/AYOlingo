import { useMutation } from 'react-query'
import { exerciseUseCase } from '../../factories'

const useExercisesByModule = () => {
    const {
        mutate: exercisesByModule, isLoading, data, error,
    } = useMutation(exerciseUseCase.exercisesByModule)

    return {
        exercisesByModule,
        isLoading,
        error,
        data,
    }
}

export default useExercisesByModule
