import { useMutation } from 'react-query'
import { pushNotificationUseCase } from '../../factories'

const useGetPushNotification = () => {
    const {
        mutate: getPushNotification, isLoading, data, error,
    } = useMutation(pushNotificationUseCase.getPushNotification)

    return {
        getPushNotification,
        isLoading,
        error,
        data,
    }
}

export default useGetPushNotification
