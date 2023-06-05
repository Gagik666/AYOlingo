import React, { useRef, useState } from 'react'
import { GiSpeaker } from 'react-icons/gi'
import { Button, Spinner } from '@chakra-ui/react'
import { S3_BUCKET } from '../../../../core/constants'

export default function AudioButton ({ file }) {
    const audio = useRef()
    const [loading, setLoading] = useState(false)

    const onPlay = () => audio.current.play()

    return (
        <>
            <Button
                p="0"
                size="sm"
                colorScheme="blackAlpha"
                disabled={loading}
                onClick={onPlay}>
                {loading ? <Spinner width="10px" height="10px" /> : <GiSpeaker/>}
            </Button>
            <audio
                ref={audio}
                controls
                src={S3_BUCKET + '_audio/' + file.replace('mpeg', 'mp3')}
                style={{display: 'none'}}
                onPlay={() => setLoading(true)}
                onEnded={() => setLoading(false)} />
        </>
    )
}