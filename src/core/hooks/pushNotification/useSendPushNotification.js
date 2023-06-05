import { useMutation } from 'react-query'
import { pushNotificationUseCase } from '../../factories'

const useSendPushNotification = () => {
    const {
        mutate: sendPushNotification, isLoading, data, error,
    } = useMutation(pushNotificationUseCase.sendPushNotification)

    return {
        sendPushNotification,
        isLoading,
        error,
        data,
    }
}

export default useSendPushNotification
