import { useContext } from 'react'
import { AudioPlayerContext } from '../contexts'

const useAudioPlayer = () => {
    const audioPlayer = useContext(AudioPlayerContext)

    return audioPlayer
}

export default useAudioPlayer
