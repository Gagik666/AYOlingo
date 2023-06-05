import { Storage } from 'aws-amplify'

const fileService = () => {
    const uploadSingle = ({name, file, type, info}) => {
        return Storage
            .put(name, file, {contentType: type})
            .then(result => {
                if (info) {
                    return {url: result.key, ...info}
                }
                return result.key
            })
    }

    const uploadMultiple = (files) => {
        return Promise.all(
            files.map(file => uploadSingle(file))
        )
    }

    const uploadFile = (file) => {
        const options = { contentType: "image/jpeg" }
        return fetch(file)
          .then((response) => response.blob())
          .then((blob) => Storage.put(`${new Date().getTime() * Math.random()}.jpeg`, blob, options))
    }

    return {
        uploadSingle,
        uploadMultiple,
        uploadFile,
    }
}

export default fileService