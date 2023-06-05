import { useMutation } from 'react-query'
import { audioUseCase } from '../../factories'

const useListAudios = () => {
    const {
        mutate: listAudios, isLoading, data, error,
    } = useMutation(audioUseCase.listAudios)

    return {
        listAudios,
        isLoading,
        error,
        data,
    }
}

export default useListAudios
