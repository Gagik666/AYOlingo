import { useMutation } from 'react-query'
import { languageGroupUseCase } from '../../factories'

const useCreateLanguageGroup = () => {
    const {
        mutate: createLanguageGroup, isLoading, data, error,
    } = useMutation(languageGroupUseCase.createLanguageGroup)

    return {
        createLanguageGroup,
        isLoading,
        error,
        data,
    }
}

export default useCreateLanguageGroup
