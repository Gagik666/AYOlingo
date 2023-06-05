import { useMutation } from 'react-query'
import { fileUseCase } from '../factories'

const useUploadSingleFile = () => {
    const { mutate: upload, isLoading, data, error } = useMutation(fileUseCase.uploadSingle)

    return {
        upload,
        isLoading,
        error,
        data,
    }
}

export default useUploadSingleFile