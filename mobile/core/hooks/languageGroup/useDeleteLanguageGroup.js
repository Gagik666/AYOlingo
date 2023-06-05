import { useMutation } from 'react-query'
import { languageGroupUseCase } from '../../factories'

const useDeleteLanguageGroup = () => {
    const {mutate: deleteLanguageGroup, isLoading, data, error} = useMutation(languageGroupUseCase.deleteLanguageGroup)

    return {
        deleteLanguageGroup,
        isLoading,
        data,
        error
    }
}

export default useDeleteLanguageGroup
