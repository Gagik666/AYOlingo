import { useMutation } from 'react-query'
import { languageUseCase } from '../../factories'

const useCreateLanguage = () => {
    const {
        mutate: createLanguage, isLoading, data, error,
    } = useMutation(languageUseCase.createLanguage)

    return {
        createLanguage,
        isLoading,
        error,
        data,
    }
}

export default useCreateLanguage
