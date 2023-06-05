const audioUseCase = (audioRepo) => {
    const createAudio = (input) => {
        let isValid = true
        const errors = {}

        if (!isValid) {
            throw Error(JSON.stringify(errors))
        }
        return audioRepo.createAudio(input)
    }

    const updateAudio = (input) => audioRepo.updateAudio(input)

    const deleteAudio = (input) => audioRepo.deleteAudio(input)

    const getAudio = (id) => {
        if (!id) {
            throw Error('ID is required')
        }

        return audioRepo.getAudio(id)
    }

    const searchAudios = (variables) => audioRepo.searchAudios(variables)

    const listAudios = (variables) => audioRepo.listAudios(variables)

    return {
        createAudio,
        getAudio,
        searchAudios,
        listAudios,
        deleteAudio,
        updateAudio,
    }
}

export default audioUseCase
