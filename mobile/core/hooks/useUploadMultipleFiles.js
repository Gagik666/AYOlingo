import { useMutation } from 'react-query'
import { fileUseCase } from '../factories'

const useUploadMultipleFiles = () => {
    const { mutate: upload, isLoading, data, error } = useMutation(fileUseCase.uploadMultiple)

    return {
        upload,
        isLoading,
        error,
        data,
    }

    return 
}

export default useUploadMultipleFiles