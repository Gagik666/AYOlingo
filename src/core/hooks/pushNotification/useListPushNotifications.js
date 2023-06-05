import { useMutation } from 'react-query'
import { pushNotificationUseCase } from '../../factories'

const useListPushNotifications = () => {
    const {
        mutate: listPushNotifications, isLoading, data, error,
    } = useMutation(pushNotificationUseCase.listPushNotifications)

    return {
        listPushNotifications,
        isLoading,
        error,
        data,
    }
}

export default useListPushNotifications
