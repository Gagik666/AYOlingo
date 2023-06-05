import { useMutation } from 'react-query'
import { languageUseCase } from '../../factories'

const useGetLanguage = () => {
    const {
        mutate: getLanguage, isLoading, data, error,
    } = useMutation(languageUseCase.getLanguage)

    return {
        getLanguage,
        isLoading,
        error,
        data,
    }
}

export default useGetLanguage
