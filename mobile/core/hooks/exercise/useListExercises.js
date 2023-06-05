import { useQuery } from 'react-query'
import { exerciseUseCase } from '../../factories'

const useListExercises = () => {
    const data = useQuery('exercises', exerciseUseCase.listExercises, { enabled: false })

    return data
}

export default useListExercises
