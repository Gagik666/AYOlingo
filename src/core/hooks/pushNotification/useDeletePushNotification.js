import { useMutation } from 'react-query'
import { pushNotificationUseCase } from '../../factories'

const useDeletePushNotification = () => {
    const {mutate: deletePushNotification, isLoading, data, error} = useMutation(pushNotificationUseCase.deletePushNotification)

    return {
        deletePushNotification,
        isLoading,
        data,
        error
    }
}

export default useDeletePushNotification
