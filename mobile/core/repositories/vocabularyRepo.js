const vocabularyRepo = (vocabularyService) => {
    const createVocabulary = (input) => vocabularyService.createVocabulary(input)

    const updateVocabulary = (input) => vocabularyService.updateVocabulary(input)

    const deleteVocabulary = (input) => vocabularyService.deleteVocabulary(input)

    const listVocabularies = (variables) => vocabularyService.listVocabularies(variables)

    const searchVocabularies = (variables) => vocabularyService.searchVocabularies(variables)

    const getVocabulary = (id) => vocabularyService.getVocabulary(id)

    return {
        createVocabulary,
        updateVocabulary,
        deleteVocabulary,
        getVocabulary,
        listVocabularies,
        searchVocabularies,
    }
}

export default vocabularyRepo
