import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import LessonWrapper from '../../../components/LessonWrapper'
import { useTransliteration } from '../../../core/contexts/TransliterationContext'
import { COLORS } from '../../../core/constants'
import { usePlayAudio, useCacheAudios, getAudiosArrayFromExercise } from '../../../core/helpers'
import { useTranslation } from '../../../core/contexts/TranslationContext'

const Select = ({
    exercise,
    navigation,
    progress,
    onSubmit,
}) => {
    const { t } = useTranslation()
    const { audios: cachedAudios, cacheAudios } = useCacheAudios(null, false)
    const { playAudio } = usePlayAudio()
    const { showTransliteration } = useTransliteration()
    const [correctAnswer, setCorrectAnswer] = useState('')
    const quiz = exercise.quiz[0]

    const answers = useMemo(
        () => {
            const newAnswers = quiz.answers
            return newAnswers.sort(() => Math.random() - 0.5)
        },
        [quiz]
    )

    const onAnswerPress = async (answer) => {
        if (answer.value.audio && cachedAudios[answer.value.audio]) {
            playAudio(cachedAudios[answer.value.audio])
        }
        setCorrectAnswer(answer.value.id)
    }

    const onQuestionPress = async () => {
        if (!quiz.question.audio || !cachedAudios[quiz.question.audio]) return
        playAudio(cachedAudios[quiz.question.audio])
    }

    const onCheck = useCallback(
        () => {
            const answer = answers.find(answer => answer.right).value.id
            let correct = true
            if (answer !== correctAnswer) correct = false
            onSubmit(correct, exercise, [answer])
        },
        [correctAnswer, answers]
    )

    useEffect(() => {
        setCorrectAnswer('')
        onQuestionPress()
    }, [exercise])

    useEffect(() => {
        if (exercise) {
            const exerciseAudiosArray = getAudiosArrayFromExercise(exercise)
            cacheAudios(exerciseAudiosArray)
        }
    }, [exercise])

    return (
        <LessonWrapper
            navigation={navigation}
            title={t('Select the translation')}
            progress={progress}
            onPress={onCheck}>
            <TouchableOpacity
                style={styles.questionWrapper}
                activeOpacity={0.5}
                onPress={onQuestionPress}>
                <Text style={styles.question}>
                    {quiz.question.id}
                </Text>
                {showTransliteration && (
                    <Text style={styles.questionTransliteration}>
                        {quiz.question.transliteration}
                    </Text>
                )}
            </TouchableOpacity>
            <View style={styles.options}>
                {answers.map(
                    (answer, index) => (
                        <TouchableOpacity
                            key={`answer-${answer.value.id}-${index}`}
                            onPress={() => onAnswerPress(answer)}>
                            <View style={{...styles.answer, opacity: correctAnswer === answer.value.id ? .6 : 1}}>
                                <Text style={styles.answerText}>{answer.value.id}</Text>
                                {answer.value.transliteration?.length > 0 && showTransliteration && <Text style={{...styles.answerText, color: COLORS.purple}}>{answer.value.transliteration}</Text>}
                            </View>
                        </TouchableOpacity>
                    )
                )}
            </View>
        </LessonWrapper>
    )
}

export default Select

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    question: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
        marginHorizontal: 15,
    },
    questionTransliteration: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.purple,
        marginHorizontal: 15,
    },
    answer: {
        paddingVertical: 13,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 60,
        borderRadius: 100,
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        marginVertical: 5
    },
    answerText: {
        textAlign: 'center'
    },
    options: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 30,
        marginTop: 30,
    }
})
