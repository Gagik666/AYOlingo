const progressUseCase = (progressRepo) => {
    const createProgress = (input) => progressRepo.createProgress(input) // NO VALIDATIONS NEED
    const updateProgress = (input) => {
        if (!input?.id) {
            throw Error('Update Progress: ID is required')
        }
        return progressRepo.updateProgress(input)
    }

    const getProgress = (id) => {
        if (!id) {
            throw Error('Get Progress: ID is required')
        }

        return progressRepo.getProgress(id)
    }

    const listProgresses = (variables) => progressRepo.listProgresses(variables)

    return {
        createProgress,
        updateProgress,
        getProgress,
        listProgresses,
    }
}

export default progressUseCase
