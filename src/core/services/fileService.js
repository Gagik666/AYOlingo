import { Storage } from 'aws-amplify'

const fileService = () => {
    const uploadSingle = async ({name, file, type, info, existing}) => {
        if (existing) {
            try {
                await Storage.remove(existing)
            } catch (e) {
                console.log('>>> REMOVED EXISTING AUDIO ERROR', e);
            }
        }
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

    return {
        uploadSingle,
        uploadMultiple
    }
}

export default fileService