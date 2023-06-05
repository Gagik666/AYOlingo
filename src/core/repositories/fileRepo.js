const fileRepo = (fileService) => {
    const uploadSingle = ({name, file, type, existing}) => fileService.uploadSingle({name, file, type, existing})

    const uploadMultiple = (files) => fileService.uploadMultiple(files)

    return {
        uploadSingle,
        uploadMultiple
    }
}

export default fileRepo