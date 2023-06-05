import { useMutation } from 'react-query'
import { exerciseUseCase } from '../../factories'

const useSearchExercises = () => {
    const data = useMutation(exerciseUseCase.searchExercises)

    return data
}

export default useSearchExercises
