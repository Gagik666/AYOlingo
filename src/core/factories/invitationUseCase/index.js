const invitationUseCase = (invitationRepo) => {

    const sendInvitationEmail = (input) => invitationRepo.sendInvitationEmail(input)

    return {
        sendInvitationEmail,
    }
}

export default invitationUseCase
