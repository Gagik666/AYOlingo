import { useQuery } from 'react-query'
import { moduleUseCase } from '../../factories'

const useListModules = (variables) => {
    const data = useQuery(['modules', variables], moduleUseCase.listModules, { enabled: false })

    return data
}

export default useListModules
