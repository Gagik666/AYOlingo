import { useMutation } from 'react-query'
import { languageUseCase } from '../../factories'

const useListLanguages = () => {
    const {
        mutate: listLanguages, isLoading, data, error,
    } = useMutation(languageUseCase.listLanguages)

    return {
        listLanguages,
        isLoading,
        error,
        data,
    }
}

export default useListLanguages
