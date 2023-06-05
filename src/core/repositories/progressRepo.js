const progressRepo = (progressService) => {
    const createProgress = (input) => progressService.createProgress(input)

    const updateProgress = (input) => progressService.updateProgress(input)

    const listProgresses = (variables) => progressService.listProgresses(variables)

    const progressesByCreatedAt = (variables) => progressService.progressesByCreatedAt(variables)

    const getProgress = (id) => progressService.getProgress(id)

    return {
        createProgress,
        updateProgress,
        getProgress,
        listProgresses,
        progressesByCreatedAt,
    }
}

export default progressRepo
