import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
} from 'react-native'
import LessonWrapper from '../../../components/LessonWrapper'
import { useTransliteration } from '../../../core/contexts/TransliterationContext'
import { COLORS } from '../../../core/constants'
import { usePlayAudio, useCacheAudios, getAudiosArrayFromExercise } from '../../../core/helpers'
import { useTranslation } from '../../../core/contexts/TranslationContext'
import Answer from './Answer'
import SelectedAnswer from './SelectedAnswer'

const { height: windowHeight } = Dimensions.get('window')

const FillInTheBlank = ({
    exercise,
    navigation,
    progress,
    onSubmit,
}) => {
    const scrollView = useRef(null)
    const { t } = useTranslation()
    const { showTransliteration } = useTransliteration()
    const { playAudio } = usePlayAudio()
    const { audios: cachedAudios, cacheAudios } = useCacheAudios(null, false)
    const [correctAnswers, setCorrectAnswers] = useState()

    const quiz = useMemo(
        () => {
            return {
                ...exercise.quiz[0],
                answers: exercise.quiz[0].answers.map(
                    (answer) => ({
                        ...answer,
                        key: new Date().getTime() * Math.random()
                    })
                )
            }
        },
        [exercise]
    )

    const selectedAnswers = useMemo(
        () => {
            const correctAnswers = {}
            const answers = quiz.answers
                .filter(answer => answer.right)
                .map(
                    (answer, index) => {
                        const newAnswer = {...answer}
                        if (!answer.selected) {
                            newAnswer.answered = false
                            correctAnswers[index] = ['', answer.key]
                        } else {
                            newAnswer.answered = true
                        }
                        return newAnswer
                    }
                )
            setCorrectAnswers(correctAnswers)
            return answers
        },
        [quiz]
    )
    
    const onSelectedAnswerPress = useCallback(
        (answer, index) => {
            if (answer.answered) return
            setCorrectAnswers(correctAnswers => ({...correctAnswers, [index]: ['', answer.key]}))
        },
        [cachedAudios]
    )

    const answers = useMemo(
        () => {
            const newAnswers = quiz.answers.filter(answer => !answer.selected)
            return newAnswers.sort(() => Math.random() - 0.5)
        },
        [quiz]
    )

    const onAnswerPress = (answer) => {
        setCorrectAnswers(
            (correctAnswers) => {
                const correctAnswersArray = Object.entries(correctAnswers)
                const newCorrectAnswers = {...correctAnswers}
                let answerSet = false
                correctAnswersArray.map(
                    ([key, value]) => {
                        if (!value[0] && !answerSet) {
                            newCorrectAnswers[key] = [answer.value.id, answer.key, answer.value.transliteration]
                            answerSet = true
                        }
                    }
                )

                return newCorrectAnswers
            }
        )
    }

    const onQuestionPress = async () => {
        if (!quiz.question.audio || !cachedAudios[quiz.question.audio]) return
        playAudio(cachedAudios[quiz.question.audio])
    }

    const onCheck = useCallback(
        async () => {
            let correct = true
            selectedAnswers.map(
                (selectedAnswer, index) => {
                    if (selectedAnswer.answered) return
                    if (selectedAnswer.value.id !== correctAnswers[index][0]) correct = false
                }
            )
            const correctAnswer = selectedAnswers.map(answer => answer.value.id).join(' ')
            onSubmit(correct, exercise, [correctAnswer])
        },
        [correctAnswers, answers]
    )

    useEffect(() => {
        scrollView.current?.flashScrollIndicators()
        scrollView.current?.scrollTo({ x: 0, y: 0, animated: true })
    }, [exercise, scrollView])

    useEffect(() => {
        const exerciseAudiosArray = getAudiosArrayFromExercise(exercise)
        cacheAudios(exerciseAudiosArray)
    }, [exercise])
    console.log('fill in the blank')
    if (!correctAnswers) return <></>

    return (
        <LessonWrapper
            navigation={navigation}
            title={t('Fill in the blank')}
            progress={progress}
            onPress={onCheck}>
            <ScrollView
                ref={scrollView}
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={true}
                indicatorStyle="white"
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContentContainer}>
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
                    {selectedAnswers.map(
                        (answer, index) => (
                            <SelectedAnswer
                                key={`answer-${answer.value.id}-${index}`}
                                answer={answer}
                                index={index}
                                correctAnswers={correctAnswers}
                                styles={styles}
                                onSelectedAnswerPress={onSelectedAnswerPress} />
                        )
                    )}
                </View>
                <View style={styles.options}>
                    {answers.map(
                        (answer, index) => (
                            <Answer
                                key={`answer-${answer.value.id}-${index}`}
                                answer={answer}
                                styles={styles}
                                correctAnswers={correctAnswers}
                                onAnswerPress={onAnswerPress} />
                        )
                    )}
                </View>
            </ScrollView>
        </LessonWrapper>
    )
}

export default FillInTheBlank

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    scrollView: {
        maxHeight: windowHeight - 340,
        width: '100%',
        marginHorizontal: 5,
    },
    scrollViewContentContainer: {
        justifyContent: 'flex-start'
    },
    question: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        color: '#ffffff',
        marginRight: 10,
    },
    questionTransliteration: {
        width: '100%',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.purple,
        marginRight: 10
    },
    selectedAnswer: {
        paddingVertical: 5,
        paddingHorizontal: 7,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#ffffff',
        marginHorizontal: 5,
        marginVertical: 5
    },
    answer: {
        paddingVertical: 13,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        minWidth: 70,
        borderRadius: 100,
        backgroundColor: '#ffffff',
        marginHorizontal: 8,
        marginVertical: 10
    },
    answerText: {
        fontSize: 17
    },
    selectedOptions: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        marginTop: 30,
    },
    options: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
        marginTop: 30,
    }
})
