import { useMutation } from 'react-query'
import { pushNotificationUseCase } from '../../factories'

const useSearchPushNotifications = () => {
    const {
        mutate: searchPushNotifications, isLoading, data, error,
    } = useMutation(pushNotificationUseCase.searchPushNotifications)

    return {
        searchPushNotifications,
        isLoading,
        error,
        data,
    }
}

export default useSearchPushNotifications
