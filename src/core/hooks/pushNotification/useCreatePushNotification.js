import { useMutation } from 'react-query'
import { pushNotificationUseCase } from '../../factories'

const useCreatePushNotification = () => {
    const {
        mutate: createPushNotification, isLoading, data, error,
    } = useMutation(pushNotificationUseCase.createPushNotification)

    return {
        createPushNotification,
        isLoading,
        error,
        data,
    }
}

export default useCreatePushNotification
