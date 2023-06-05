import { useMutation } from 'react-query'
import { fileUseCase } from '../factories'

const useUploadFile = () => {
    const { mutate: upload, isLoading, data, error } = useMutation(fileUseCase.uploadFile)

    return {
        upload,
        isLoading,
        error,
        data
    }
}

export default useUploadFile
