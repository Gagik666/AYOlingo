const languageGroupRepo = (languageGroupService) => {
    const createLanguageGroup = (input) => languageGroupService.createLanguageGroup(input)

    const deleteLanguageGroup = (input) => languageGroupService.deleteLanguageGroup(input)

    const listLanguageGroups = (variables) => languageGroupService.listLanguageGroups(variables)

    const getLanguageGroup = (id) => languageGroupService.getLanguageGroup(id)

    return {
        createLanguageGroup,
        deleteLanguageGroup,
        getLanguageGroup,
        listLanguageGroups,
    }
}

export default languageGroupRepo
