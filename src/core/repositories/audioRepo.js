const audioRepo = (audioService) => {
    const createAudio = (input) => audioService.createAudio(input)

    const updateAudio = (input) => audioService.updateAudio(input)

    const deleteAudio = (input) => audioService.deleteAudio(input)

    const listAudios = (variables) => audioService.listAudios(variables)

    const searchAudios = (variables) => audioService.searchAudios(variables)

    const getAudio = (id) => audioService.getAudio(id)

    return {
        createAudio,
        updateAudio,
        deleteAudio,
        getAudio,
        searchAudios,
        listAudios,
    }
}

export default audioRepo
