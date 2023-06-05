import { Audio } from 'expo-av'
import { useRef } from 'react'
import { Platform } from 'react-native'
import Sound from 'react-native-sound'
import { useAudioPlayer } from '../hooks'
import { AUDIO_MODE } from '../constants'

Sound.setCategory('Playback')

const usePlayAudio = () => {
    const { audioPlayer, localAudioPlayer } = useAudioPlayer()
    const soundPlayer = useRef()

    const release = () => soundPlayer.current?.release()

    const playLocalAudio = async (audio) => {
        if (Platform.OS === 'ios') Audio.setAudioModeAsync(AUDIO_MODE)

        await audioPlayer.current.unloadAsync()
        await localAudioPlayer.current.unloadAsync()
        await localAudioPlayer.current.loadAsync(audio)
        await localAudioPlayer.current.playAsync()
    }

    const playAudio = async (audio) => {
        if (soundPlayer.current) {
            soundPlayer.current.release();
        }
        soundPlayer.current = new Sound(audio, null, (error) => {
            if (error) {
              console.log('failed to load the sound', error);
              return;
            }

            soundPlayer.current.play(() => {
                soundPlayer.current.release();
            })
        })
    }

    return {
        playAudio,
        playLocalAudio,
        release,
    }
}

export default usePlayAudio