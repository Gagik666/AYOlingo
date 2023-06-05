const fileRepo = (fileService) => {
    const uploadSingle = ({name, file, type}) => fileService.uploadSingle({name, file, type})

    const uploadMultiple = (files) => fileService.uploadMultiple(files)

    const uploadFile = (file) => fileService.uploadFile(file)

    return {
        uploadSingle,
        uploadMultiple,
        uploadFile,
    }
}

export default fileRepo