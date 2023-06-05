import React, { useRef, useState, useCallback } from 'react'
import {
    Flex,
    Heading,
    IconButton,
} from '@chakra-ui/react'
import {
    AiOutlinePauseCircle,
    AiOutlinePlayCircle
} from 'react-icons/ai'
import { S3_BUCKET } from '../../../../core/constants'

export default function Audio ({
    audio
}) {
    const audioRef = useRef()
    const [loading, setLoading] = useState(false)

    const onPlay = useCallback(
        () => {
            if (loading) {
                setLoading(false)
                audioRef.current.currentTime = 0
                return audioRef.current.pause()
            }
            setLoading(true)
            audioRef.current.play()
        },
        [audioRef, loading, setLoading]
    )

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            minHeight="150px"
            backgroundColor="grey.100"
            borderRadius={4}>
            <Heading
                as="span"
                size="sm"
                display="block"
                mb={2}
                textAlign="center">
                {audio.id}
            </Heading>
            <IconButton
                background="transparent"
                icon={loading ? <AiOutlinePauseCircle size={28} /> : <AiOutlinePlayCircle size={28} />}
                onClick={onPlay} />
            <audio
                ref={audioRef}
                controls
                src={S3_BUCKET + '_audio/' + audio.file.replace('mpeg', 'mp3')}
                style={{display: 'none'}}
                onEnded={() => setLoading(false)} />
        </Flex>
    )
}