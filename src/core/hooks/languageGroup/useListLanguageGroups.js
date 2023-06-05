import { useMutation } from 'react-query'
import { languageGroupUseCase } from '../../factories'

const useListLanguageGroups = () => {
    const {
        mutate: listLanguageGroups, isLoading, data, error,
    } = useMutation(languageGroupUseCase.listLanguageGroups)

    return {
        listLanguageGroups,
        isLoading,
        error,
        data,
    }
}

export default useListLanguageGroups
