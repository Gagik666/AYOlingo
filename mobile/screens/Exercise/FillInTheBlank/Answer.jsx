import { useEffect } from 'react'
import {
    TouchableOpacity,
    Text,
    View,
} from 'react-native'
import { useTransliteration } from '../../../core/contexts/TransliterationContext'
import { useCacheAudios, usePlayAudio } from '../../../core/helpers'
import { COLORS } from '../../../core/constants'

export default function Answer({
    answer,
    onAnswerPress,
    correctAnswers,
    styles,
}) {
    const { showTransliteration } = useTransliteration()
    const { playAudio } = usePlayAudio()
    const { audios: cachedAudios, cacheAudios } = useCacheAudios(null, false)
    const isSelected = Object.values(correctAnswers).find(correctAnswer => correctAnswer[0] && correctAnswer[1] === answer.key)

    const onPress = () => {
        if (answer.value.audio && cachedAudios[answer.value.audio]) {
            playAudio(cachedAudios[answer.value.audio])
        }
        onAnswerPress(answer)   
    }

    useEffect(() => {
        if (answer?.value?.audio)
        cacheAudios([answer.value.audio])
    }, [answer])

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ ...styles.answer, opacity: isSelected ? .6 : 1 }}>
                <Text style={styles.answerText}>{!isSelected && answer.value.id}</Text>
                {!isSelected && showTransliteration && answer.value.transliteration?.length > 0 && <Text style={{...styles.answerText, color: COLORS.purple}}>{answer.value.transliteration}</Text>}
            </View>
        </TouchableOpacity>
    )
}
