const alphabetRepo = (alphabetService) => {
    const createAlphabet = (input) => alphabetService.createAlphabet(input)

    const updateAlphabet = (input) => alphabetService.updateAlphabet(input)

    const deleteAlphabet = (input) => alphabetService.deleteAlphabet(input)

    const listAlphabets = (variables) => alphabetService.listAlphabets(variables)

    const getAlphabet = (id) => alphabetService.getAlphabet(id)

    return {
        createAlphabet,
        updateAlphabet,
        deleteAlphabet,
        getAlphabet,
        listAlphabets,
    }
}

export default alphabetRepo
