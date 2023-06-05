import { useMutation } from 'react-query'
import { alphabetUseCase } from '../../factories'

const useAlphabetsByLanguageGroup = () => {
    const data = useMutation(alphabetUseCase.alphabetsByLanguageGroup)

    return data
}

export default useAlphabetsByLanguageGroup
