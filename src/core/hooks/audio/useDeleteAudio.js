import { useMutation } from 'react-query'
import { audioUseCase } from '../../factories'

const useDeleteAudio = () => {
    const {mutate: deleteAudio, isLoading, data, error} = useMutation(audioUseCase.deleteAudio)

    return {
        deleteAudio,
        isLoading,
        data,
        error
    }
}

export default useDeleteAudio
