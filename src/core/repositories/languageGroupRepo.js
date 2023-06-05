const languageGroupRepo = (languageGroupService) => {
    const createLanguageGroup = (input) => languageGroupService.createLanguageGroup(input)

    const updateLanguageGroup = (input) => languageGroupService.updateLanguageGroup(input)

    const deleteLanguageGroup = (input) => languageGroupService.deleteLanguageGroup(input)

    const listLanguageGroups = (variables) => languageGroupService.listLanguageGroups(variables)

    const getLanguageGroup = (id) => languageGroupService.getLanguageGroup(id)

    return {
        createLanguageGroup,
        deleteLanguageGroup,
        getLanguageGroup,
        listLanguageGroups,
        updateLanguageGroup,
    }
}

export default languageGroupRepo
