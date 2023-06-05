import { useMutation } from 'react-query'
import { languageGroupUseCase } from '../../factories'

const useUpdateLanguageGroup = () => {
    const {
        mutate: updateLanguageGroup, isLoading, data, error,
    } = useMutation(languageGroupUseCase.updateLanguageGroup)

    return {
        updateLanguageGroup,
        isLoading,
        error,
        data,
    }
}

export default useUpdateLanguageGroup
