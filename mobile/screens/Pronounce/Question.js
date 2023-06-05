import { useEffect } from 'react'
import { SvgXml } from 'react-native-svg'
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native'
import { useCacheAudios, usePlayAudio } from '../../core/helpers'
import * as icons from '../../assets/icons'

export default function Question({
    question,
    styles,
}) {
    const { cacheAudios, audios } = useCacheAudios(null, false)
    const { playAudio } = usePlayAudio()

    const onAudioPlay = () => {
        if (question.audio) {
            playAudio(audios[question.audio])
        }
    }

    useEffect(() => {
        if (question?.audio) {
            cacheAudios([question.audio])
        }
    }, [question])

    return (
        <TouchableOpacity
            activeOpacity={.6}
            onPress={onAudioPlay}>
            <View style={styles.questionSection}>
                <SvgXml height="40" width="40" xml={icons.volume}/>
                <View style={styles.questionWrapper}>
                    <Text style={styles.text}>
                        {question?.value}
                    </Text>
                    <Text style={styles.transliteration}>
                        {question?.transliteration}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
