import { useMutation } from 'react-query'
import { languageGroupUseCase } from '../../factories'

const useGetLanguageGroup = () => {
    const {
        mutate: getLanguageGroup, isLoading, data, error,
    } = useMutation(languageGroupUseCase.getLanguageGroup)

    return {
        getLanguageGroup,
        isLoading,
        error,
        data,
    }
}

export default useGetLanguageGroup
