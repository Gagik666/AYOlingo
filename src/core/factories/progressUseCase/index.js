const progressUseCase = (progressRepo) => {
    const createProgress = (input) => progressRepo.createProgress(input) // NO VALIDATIONS NEED
    const updateProgress = (input) => {
        if (!input?.id) {
            throw Error('ID is required')
        }
        return progressRepo.updateProgress(input)
    }

    const getProgress = (id) => {
        if (!id) {
            throw Error('ID is required')
        }

        return progressRepo.getProgress(id)
    }

    const listProgresses = (variables) => progressRepo.listProgresses(variables)

    const progressesByCreatedAt = (variables) => progressRepo.progressesByCreatedAt(variables)

    return {
        createProgress,
        updateProgress,
        getProgress,
        listProgresses,
        progressesByCreatedAt,
    }
}

export default progressUseCase
