import { useMutation } from 'react-query'
import { invitationUseCase } from '../factories'

const useSendInvitationEmail = () => {
    const { mutate: sendInvitationEmail, isLoading, data, error } = useMutation(invitationUseCase.sendInvitationEmail)

    return {
        sendInvitationEmail,
        isLoading,
        error,
        data,
    }
}

export default useSendInvitationEmail