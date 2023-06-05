import { useMutation } from 'react-query'
import { audioUseCase } from '../../factories'

const useUpdateAudio = () => {
    const {
        mutate: updateAudio, isLoading, data, error,
    } = useMutation(audioUseCase.updateAudio)

    return {
        updateAudio,
        isLoading,
        error,
        data,
    }
}

export default useUpdateAudio
