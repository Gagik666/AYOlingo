const alphabetUseCase = (alphabetRepo) => {
    const createAlphabet = (input) => {
        let isValid = true
        const errors = {}

        if (!isValid) {
            throw Error(JSON.stringify(errors))
        }
        return alphabetRepo.createAlphabet(input)
    }

    const updateAlphabet = (input) => alphabetRepo.updateAlphabet(input)

    const deleteAlphabet = (input) => alphabetRepo.deleteAlphabet(input)

    const getAlphabet = (id) => {
        if (!id) {
            throw Error('Get alphabet: ID is required')
        }

        return alphabetRepo.getAlphabet(id)
    }

    const listAlphabets = (variables) => alphabetRepo.listAlphabets(variables)

    const alphabetsByLanguageGroup = (variables) => alphabetRepo.alphabetsByLanguageGroup(variables)

    return {
        createAlphabet,
        getAlphabet,
        listAlphabets,
        deleteAlphabet,
        updateAlphabet,
        alphabetsByLanguageGroup,
    }
}

export default alphabetUseCase
