const validateFiles = (files) => {
    let isValid = true
    files.forEach(file => {
        if (!file.name || !file.file || !file.type) isValid = false
    })
    return isValid
}

const fileUseCase = (fileRepo) => {
    const uploadSingle = ({name, file, type, existing}) => {
        if (!name || !file || !type) {
            throw Error('Name, file and type are required')
        }

        return fileRepo.uploadSingle({name, file, type, existing})
    }

    const uploadMultiple = (files) => {
        if (!files || !validateFiles(files)) {
            throw Error('Name, file and type are required')
        }

        return fileRepo.uploadMultiple(files)
    }

    return {
        uploadSingle,
        uploadMultiple
    }
}

export default fileUseCase
