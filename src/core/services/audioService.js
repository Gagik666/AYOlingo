import { API, graphqlOperation } from 'aws-amplify'
import {
    createAudio as createAudioMutation,
    updateAudio as updateAudioMutation,
    deleteAudio as deleteAudioMutation,
} from '../../graphql/mutations'
import {
    getAudio as getAudioQuery,
    listAudio as listAudiosQuery,
    searchAudio as searchAudiosQuery,
} from '../../graphql/queries'

const audioService = () => {
    const createAudio = (input) => API.graphql(
        graphqlOperation(createAudioMutation, { input }),
    )

    const updateAudio = (input) => API.graphql(
        graphqlOperation(updateAudioMutation, { input }),
    )

    const deleteAudio = (input) => API.graphql(
        graphqlOperation(deleteAudioMutation, { input }),
    )

    const getAudio = (id) => API.graphql(
        graphqlOperation(getAudioQuery, { id }),
    )

    const listAudios = (variables) => API.graphql(
        graphqlOperation(listAudiosQuery, variables),
    )
    
    const searchAudios = (variables) => API.graphql(
        graphqlOperation(searchAudiosQuery, variables),
    )

    return {
        createAudio,
        updateAudio,
        deleteAudio,
        getAudio,
        searchAudios,
        listAudios,
    }
}

export default audioService
