import { useMutation } from 'react-query'
import { pushNotificationUseCase } from '../../factories'

const useListPushNotificationsByCreatedAt = () => {
    const {
        mutate: listPushNotificationsByCreatedAt, isLoading, data, error,
    } = useMutation(pushNotificationUseCase.listPushNotificationsByCreatedAt)

    return {
        listPushNotificationsByCreatedAt,
        isLoading,
        error,
        data,
    }
}

export default useListPushNotificationsByCreatedAt
