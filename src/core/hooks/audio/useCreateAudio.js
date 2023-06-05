import { useMutation } from 'react-query'
import { audioUseCase } from '../../factories'

const useCreateAudio = () => {
    const { mutate: createAudio, isLoading, data, error } = useMutation(audioUseCase.createAudio)

    return {
        createAudio,
        isLoading,
        error,
        data,
    }
}

export default useCreateAudio
