import React, { useEffect, useRef } from 'react'
import { Audio } from 'expo-av'
import { AudioPlayerContext } from '../contexts'
import { AUDIO_MODE } from '../constants'

export default function AudioPlayerProvider ({children}) {
    const audioPlayer = useRef(new Audio.Sound())
    const localAudioPlayer = useRef(new Audio.Sound())

    useEffect(() => {
        Audio.setAudioModeAsync(AUDIO_MODE)
    }, [])

    return (
        <AudioPlayerContext.Provider value={{audioPlayer, localAudioPlayer}}>
            {children}
        </AudioPlayerContext.Provider>
    )
}