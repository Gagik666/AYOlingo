import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react'
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

const { height: windowHeight } = Dimensions.get('window')

const Translate = ({
    exercise,
    progress,
    navigation,
    onSubmit,
}) => {
    const scrollView = useRef(null)
    const { t } = useTranslation()
    const { audios: cachedAudios, cacheAudios } = useCacheAudios(null, false)
    const { showTransliteration } = useTransliteration()
    const { playAudio } = usePlayAudio()
    const quiz = exercise.quiz[0]
    const answers = useMemo(
        () => {
            const newAnswers = [...quiz.answers.map(answer => ({...answer, key: new Date().getTime() * Math.random()}))]
            return newAnswers.sort(() => Math.random() - 0.5)
        },
        [quiz]
    )
    const correctAnswersLength = new Array(answers.filter(answer => answer.right).length).fill(1)
    const EMPTY_SELECTED_ANSWERS = new Array(correctAnswersLength.length).fill([null, null, null])
    const [selectedAnswers, setSelectedAnswers] = useState(EMPTY_SELECTED_ANSWERS)

    const onCheck = useCallback(
        () => {
            if (selectedAnswers.length !== correctAnswersLength.length) return
            const givenAnswer = selectedAnswers.map(selectedAnswer => selectedAnswer[0]).join(' ')
            const correctAnswersPreview = []
            let correct = false
            exercise.quiz.map(
                (quiz) => {
                    const answer = quiz.answers.filter(answer => answer.right).map(answer => answer.value.id).join(' ')
                    correctAnswersPreview.push(answer)
                    if (answer === givenAnswer) correct = true

                    const newQuiz = {...quiz}
                    const newAnswers = quiz.answers.map(answer => delete answer.key)
                    newQuiz.answers = newAnswers
                    return newQuiz
                }
            )
            onSubmit(correct, exercise, correctAnswersPreview)
        },
        [correctAnswersLength, setSelectedAnswers, answers]
    )

    const onQuestionPress = async () => {
        if (!quiz.question.audio || !cachedAudios[quiz.question.audio]) return
        playAudio(cachedAudios[quiz.question.audio])
    }

    const removeSelectedAnswer = (index) => setSelectedAnswers(
        (selectedAnswers) => {
            const newSelectedAnswers = [...selectedAnswers]
            newSelectedAnswers[index] = [null, null, null]
            return newSelectedAnswers
        }
    )

    const onAnswerPress = async (answer) => {
        if (answer.value.audio && cachedAudios[answer.value.audio]) {
            playAudio(cachedAudios[answer.value.audio])
        }
        setSelectedAnswers(selectedAnswers => {
            if (!selectedAnswers.find(selectedAnswer => selectedAnswer[2] === answer.key)) {
                const indexToSet = selectedAnswers.findIndex(answer => answer[0] === null && answer[1] === null && answer[2] === null)
                if (indexToSet === -1) {
                    return selectedAnswers
                }
                const newSelectedAnswers = [...selectedAnswers]
                newSelectedAnswers[indexToSet] = [answer.value.id, answer.value.transliteration, answer.key]
                return newSelectedAnswers
            }

            return selectedAnswers
        })
    }

    useEffect(() => {
        setSelectedAnswers(EMPTY_SELECTED_ANSWERS)
        onQuestionPress()
    }, [exercise])

    useEffect(() => {
        scrollView.current?.flashScrollIndicators()
        scrollView.current?.scrollTo({ x: 0, y: 0, animated: true })
    }, [exercise, scrollView])

    useEffect(() => {
        const exerciseAudiosArray = getAudiosArrayFromExercise(exercise)
        cacheAudios(exerciseAudiosArray)
    }, [exercise])

    return (
        <LessonWrapper
            title={t('Translate this phrase')}
            progress={progress}
            navigation={navigation}
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
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', paddingHorizontal: 20, flexWrap: 'wrap'}}>
                    {correctAnswersLength.map(
                        (item, index) => (
                            <TouchableOpacity
                                key={`answer-${item}-${index}`}
                                onPress={() => removeSelectedAnswer(index)}>
                                <View style={{marginHorizontal: 10, ...styles.answeredQuestion, backgroundColor: '#ffffff',}}>
                                    <Text>
                                        {selectedAnswers[index] && selectedAnswers[index][0]}
                                    </Text>
                                    {selectedAnswers[index] && selectedAnswers[index][1]?.length > 0 && showTransliteration && (
                                        <Text style={{color: COLORS.purple}}>
                                            {selectedAnswers[index][1]}
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        )
                    )}
                </View>
                <View style={styles.options}>
                    {answers.map(
                        (answer, index) => {
                            const isSelected = selectedAnswers.find(selectedAnswer => selectedAnswer[2] === answer.key)
                            return (
                                <TouchableOpacity
                                    key={`value-${answer.value.id}-${index}`}
                                    onPress={() => onAnswerPress(answer)}>
                                    <View style={{...styles.answer, opacity: isSelected ? .6 : 1}}>
                                        <Text style={{opacity: isSelected ? 0 : 1}}>{answer.value.id}</Text>
                                        {!isSelected && answer.value.transliteration?.length > 0 && showTransliteration && <Text style={{color: COLORS.purple}}>{answer.value.transliteration}</Text>}
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    )}
                </View>
            </ScrollView>
        </LessonWrapper>
    )
}

export default Translate

const styles = StyleSheet.create({
    scrollView: {
        maxHeight: windowHeight - 340,
        width: '100%',
        marginHorizontal: 5,
    },
    scrollViewContentContainer: {
        justifyContent: 'flex-start'
    },
    question: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 18,
        marginBottom: 5,
        textAlign: 'center',
        marginHorizontal: 20
    },
    questionTransliteration: {
        color: COLORS.purple,
        fontWeight: '700',
        fontSize: 15,
        marginBottom: 10,
        textAlign: 'center',
        marginHorizontal: 30
    },
    answeredQuestion: {
        minWidth: '20%',
        paddingHorizontal: 15,
        display: 'flex',
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 40,
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
    options: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
        marginTop: 30,
    }
})
