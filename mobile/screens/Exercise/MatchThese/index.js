import React, { useLayoutEffect, useState, useMemo, useEffect, useCallback, useRef } from 'react'
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

const windowHeight = Dimensions.get('window').height

const MatchThese = ({
    exercise: data,
    navigation,
    progress,
    onSubmit,
}) => {
    const scrollView = useRef(null)
    const { cacheAudios, audios: cachedAudios } = useCacheAudios(false, false)
    const { t } = useTranslation()
    const { showTransliteration } = useTransliteration()
    const { playAudio } = usePlayAudio()
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [selectedAnswersKeys, setSelectedAnswersKeys] = useState([])

    const exercise = useMemo(
        () => {
            return {
                ...data,
                quiz: data.quiz.map(
                    (quiz) => ({
                        ...quiz,
                        answers: [{...quiz.answers[0], key: new Date().getTime() * Math.random()}]
                    })
                )
            }
        },
        [data]
    )

    const answers = useMemo(
        () => {
            const newAnswers = [...exercise.quiz.map(quiz => quiz.answers[0])]
            return newAnswers.sort(() => Math.random() - 0.5)
        },
        [exercise]
    )

    const onSelectedAnswerPress = useCallback(
        (index, key) => {
            setSelectedAnswers(selectedAnswers => ({...selectedAnswers, [index]: null}))
            setSelectedAnswersKeys(selectedAnswersKeys => selectedAnswersKeys.filter(selectedAnswerKey => selectedAnswerKey !== key))
        },
        []
    )

    const onQuestionPress = async (quiz) => {
        if (!quiz.question.audio || !cachedAudios[quiz.question.audio]) return
        playAudio(cachedAudios[quiz.question.audio])
    }

    const onAnswerPress = async (answer) => {
        if (answer.value.audio && cachedAudios[answer.value.audio]) {
            playAudio(cachedAudios[answer.value.audio])
        }
        setSelectedAnswersKeys(selectedAnswersKeys => [...selectedAnswersKeys, answer.key])
        setSelectedAnswers(
            (selectedAnswers) => {
                const selectedAnswersArray = Object.entries(selectedAnswers)
                const newSelectedAnswers = {...selectedAnswers}
                let answerSet = false
                selectedAnswersArray.map(
                    ([key, value]) => {
                        if (!value && !answerSet) {
                            newSelectedAnswers[key] = {...answer.value, key: answer.key}
                            answerSet = true
                        }
                    }
                )
                return newSelectedAnswers
            }
        )
    }

    const onCheck = useCallback(
        () => {
            let correct = true
            const selectedAnswersForPreview = []
            const newExercise = JSON.parse(JSON.stringify(exercise))
            newExercise.quiz.map(
                (quiz, index) => {
                    selectedAnswersForPreview.push(`${quiz.question.id} - ${quiz.answers[0].value.id}`)
                    if (quiz.answers[0].value.id !== selectedAnswers[index]?.id) {
                        correct = false
                    }
                    const newQuiz = {...quiz}
                    const newAnswers = quiz.answers.map(answer => delete answer.key)
                    newQuiz.answers = newAnswers
                    return newQuiz
                }
            )
            onSubmit(correct, newExercise, selectedAnswersForPreview)
        },
        [selectedAnswers, exercise]
    )

    useEffect(() => {
        const newSelectedAnswers = {}
        exercise.quiz
            .map(
                (quiz, index) => newSelectedAnswers[index] = null
            )
        setSelectedAnswers(newSelectedAnswers)
    }, [exercise])

    useEffect(() => {
        scrollView.current?.flashScrollIndicators()
        scrollView.current?.scrollTo({ x: 0, y: 0, animated: true })
    }, [exercise, scrollView])

    useEffect(() => {
        console.log('>>> exercise', JSON.stringify(data))
        const exerciseAudiosArray = getAudiosArrayFromExercise(data)
        cacheAudios(exerciseAudiosArray)
    }, [data])

    useLayoutEffect(() => {
        navigation.setOptions({
           headerShown: false
        })
    }, [])

    return (
        <LessonWrapper
            navigation={navigation}
            title={t('Match these pairs')}
            progress={progress}
            onPress={onCheck}>
            <ScrollView
                ref={scrollView}
                showsVerticalScrollIndicator={true}
                indicatorStyle="white"
                style={styles.scrollView}>
                {exercise.quiz.map(
                    (quiz, index) => (
                        <View
                            key={quiz.question.id}
                            style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
                            <TouchableOpacity
                                style={styles.questionWrapper}
                                activeOpacity={0.5}
                                onPress={() => onQuestionPress(quiz)}>
                                <Text style={styles.question}>{quiz.question.id}</Text>
                                {showTransliteration && (
                                    <Text style={styles.questionTransliteration}>{quiz.question.transliteration}</Text>
                                )}
                            </TouchableOpacity>
                            <View style={{width: '45%'}}>
                                <ScrollView
                                    style={styles.answeredAnswer}
                                    contentContainerStyle={styles.answeredContentContainer}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}>
                                    <TouchableOpacity
                                        style={styles.answeredAnswerTouchable}
                                        onPress={() => onSelectedAnswerPress(index, selectedAnswers[index]?.key)}>
                                        {selectedAnswers[index] && (
                                            <>
                                                <Text>{selectedAnswers[index].id}</Text>
                                                {selectedAnswers[index].transliteration?.length > 0 && showTransliteration && <Text style={{color: COLORS.purple}}>{selectedAnswers[index].transliteration}</Text>}
                                            </>
                                        )}
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </View>
                    )
                )}
                <View style={styles.options}>
                    {answers.map(
                        (answer) => {
                            const isSelected = selectedAnswersKeys.includes(answer.key)
                            return (
                                <View
                                    key={`answer-${answer.key}`}
                                    style={{ ...styles.answer, opacity: isSelected ? .6 : 1 }}>
                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}>
                                        <TouchableOpacity
                                            style={{ alignItems: 'center', justifyContent: 'center' }}
                                            disabled={isSelected}
                                            onPress={() => onAnswerPress(answer)}>
                                            <Text style={{opacity: isSelected ? 0 : 1}}>{answer.value.id}</Text>
                                            {!isSelected && answer.value.transliteration?.length > 0 && showTransliteration && <Text style={{color: COLORS.purple}}>{answer.value.transliteration}</Text>}
                                        </TouchableOpacity>
                                    </ScrollView>
                                </View>
                            )
                        }
                    )}
                </View>
            </ScrollView>
        </LessonWrapper>
    )
}

export default MatchThese

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    scrollView: {
        height: windowHeight - 340,
        marginHorizontal: 5,
    },
    questionWrapper: {
        width: '50%',
        marginRight: 10,
        alignItems: 'center',
    },
    question: {
        width: '100%',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
    },
    questionTransliteration: {
        width: '100%',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.purple,
    },
    answer: {
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 100,
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        marginBottom: 10,
        minWidth: 60
    },
    answeredAnswer: {
        height: 40,
        backgroundColor: '#ffffff',
        borderRadius: 100,
    },
    answeredContentContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '100%',
    },
    answeredAnswerTouchable: {
        alignItems: 'center',
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
