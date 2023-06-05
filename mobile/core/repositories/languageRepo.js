const languageRepo = (languageService) => {
    const createLanguage = (input) => languageService.createLanguage(input)

    const deleteLanguage = (input) => languageService.deleteLanguage(input)

    const listLanguages = (variables) => languageService.listLanguages(variables)

    const getLanguage = (id) => languageService.getLanguage(id)

    return {
        createLanguage,
        deleteLanguage,
        getLanguage,
        listLanguages,
    }
}

export default languageRepo
