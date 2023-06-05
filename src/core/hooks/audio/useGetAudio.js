import { useMutation } from 'react-query'
import { audioUseCase } from '../../factories'

const useGetAudio = () => {
    const { mutate: getAudio, isLoading, data, error } = useMutation(audioUseCase.getAudio)

    return {
        getAudio,
        isLoading,
        error,
        data,
    }
}

export default useGetAudio
