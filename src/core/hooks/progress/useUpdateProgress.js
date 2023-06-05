import { useMutation } from 'react-query'
import { progressUseCase } from '../../factories'

const useUpdateProgress = () => {
    const data = useMutation(progressUseCase.updateProgress)
    return data
}

export default useUpdateProgress
