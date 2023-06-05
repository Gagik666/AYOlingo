import { useMutation } from 'react-query'
import { progressUseCase } from '../../factories'

const useListProgresses = () => {
    const {
        mutate: listProgresses, isLoading, data, error,
    } = useMutation(progressUseCase.listProgresses)

    return {
        listProgresses,
        isLoading,
        error,
        data,
    }
}

export default useListProgresses
