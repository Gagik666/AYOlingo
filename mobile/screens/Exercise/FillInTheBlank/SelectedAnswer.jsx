import { useEffect } from 'react'
import {
    TouchableOpacity,
    Text,
    View,
} from 'react-native'
import { useTransliteration } from '../../../core/contexts/TransliterationContext'
import { useCacheAudios, usePlayAudio } from '../../../core/helpers'
import { COLORS } from '../../../core/constants'

export default function SelectedAnswer({
    styles,
    answer,
    index,
    correctAnswers,
    onSelectedAnswerPress,
}) {
    const { showTransliteration } = useTransliteration()
    const { playAudio } = usePlayAudio()
    const { audios: cachedAudios, cacheAudios } = useCacheAudios(null, false)
    const selectedAnswerHasTransliteration = (answer.answered && answer.value.transliteration?.length > 0)
    const correctAnswerHasTransliteration = (correctAnswers[index] && correctAnswers[index][0]?.length > 0)

    const onPress = () => {
        onSelectedAnswerPress(answer, index)
        if (answer?.value?.audio) {
            playAudio(cachedAudios[answer.value.audio])   
        }
    }

    useEffect(() => {
        if (answer?.value?.audio)
        cacheAudios([answer.value.audio])
    }, [answer])

    return (
        <TouchableOpacity
            onPress={onPress}>
            <View style={{...styles.selectedAnswer, opacity: !answer.answered ? .6 : 1}}>
                <Text style={styles.answerText}>{!answer.answered ? correctAnswers[index] ? correctAnswers[index][0] || '...' : '...' : answer.value.id}</Text>
                {selectedAnswerHasTransliteration && showTransliteration && (
                    <Text style={{...styles.answerText, color: COLORS.purple}}>{answer.value.transliteration}</Text>
                )}
                {correctAnswerHasTransliteration && showTransliteration && (
                    <Text style={{...styles.answerText, color: COLORS.purple}}>{correctAnswers[index][2] || answer.value.transliteration}</Text>
                )}
            </View>
        </TouchableOpacity>
    )
}