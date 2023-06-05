const invitationRepo = (invitationService) => {
    const sendInvitationEmail = (input) => invitationService.sendInvitationEmail(input)

    return {
        sendInvitationEmail,
    }
}

export default invitationRepo
