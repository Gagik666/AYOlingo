import { useMutation } from 'react-query'
import { languageUseCase } from '../../factories'

const useDeleteLanguage = () => {
    const {mutate: deleteLanguage, isLoading, data, error} = useMutation(languageUseCase.deleteLanguage)

    return {
        deleteLanguage,
        isLoading,
        data,
        error
    }
}

export default useDeleteLanguage
