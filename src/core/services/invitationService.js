import axios from 'axios'
import { SEND_INVITATION_URL } from '../constants'

const invitationService = () => {
    const sendInvitationEmail = (input) => axios({
        method: 'POST',
        url: SEND_INVITATION_URL,
        data: input,
    })

    return {
        sendInvitationEmail,
    }
}

export default invitationService
