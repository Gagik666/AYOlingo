import { useMutation } from 'react-query'
import { moduleUseCase } from '../../factories'

const useSearchModules = () => {
    const data = useMutation(moduleUseCase.searchModules)

    return data
}

export default useSearchModules
