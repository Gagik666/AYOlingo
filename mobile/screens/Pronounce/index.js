import React, { useCallback, useMemo, useLayoutEffect, useState, useEffect } from 'react'
import {
    Text,
    View,
    Pressable,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native'
import { Audio } from 'expo-av'
import { SvgXml } from 'react-native-svg'
import LessonWrapper from '../../components/LessonWrapper'
import * as icons from '../../assets/icons'
import SuccessAudio from '../../assets/audios/success.mp3'
import { usePlayAudio } from '../../core/helpers'
import { useContent, useGetRandomExercises } from '../../core/hooks'
import { COLORS, ARMENIAN_CHARACTERS } from '../../core/constants'
import { useTranslation } from '../../core/contexts/TranslationContext'
import Question from './Question'

const { width: windowWidth } = Dimensions.get('window')

const COUNT = 20

const filterExercisesWithArmenianQuestion = (exercises) => exercises.filter(
    (exercise) => {
        let valid = true

        for (const quiz of exercise.quiz) {
            if (quiz.question.id && !ARMENIAN_CHARACTERS.includes(quiz.question.id[0])) {
                valid = false;
            }
        }

        return valid;
    }
)

const Pronounce = ({navigation, route}) => {
    const getRandomExercises = useGetRandomExercises()
    const { t } = useTranslation()
    const { content: { languageGroup } } = useContent()
    const { playAudio, playLocalAudio } = usePlayAudio()
    const [activeIndex, setActiveIndex] = useState(0)
    const [recording, setRecording] = useState()
    const [uri, setUri] = useState('')

    const questions = useMemo(
        () => {
            let allExercises = []
            const questions = []
            route.params.exercise.lessons.map(lesson => allExercises = [...allExercises, ...lesson.exercises])
            if (allExercises.length < COUNT) {
                return alert('There are no enough exercises')
            }

            for (const exercise of getRandomExercises(COUNT, filterExercisesWithArmenianQuestion(allExercises))) {
                for (const quiz of exercise.quiz) {
                    if (questions.length > COUNT) break;
                    if (!/[A-Za-z]/.test(quiz.question.id) && quiz.question.id) {
                        questions.push({
                            value: quiz.question.id,
                            transliteration: quiz.question.transliteration,
                            audio: quiz.question.audio
                        })
                    }
                }
            }
            return questions
        },
        [route.params.exercise, languageGroup]
    )

    const oneStepPercent = useMemo(
        () => Number.parseFloat(100 / questions.length).toFixed(0),
        [questions],
    )

    const onNext = useCallback(
        () => {
            playLocalAudio(SuccessAudio, true, true)
            setUri('')
            if (activeIndex + 1 === questions.length) {
                return navigation.goBack()
            }
            setActiveIndex(activeIndex + 1)
        },
        [activeIndex, questions]
    )

    const onPress = useCallback(
        async (remove) => {
            if (remove) {
                return setUri('')
            }
            if (!uri) return
            await playAudio(uri)
        },
        [uri]
    )

    const onPressIn = useCallback(
        async () => {
            console.log('#ed on press in:', uri)
            if (uri) return
            try {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                })
                const recording = new Audio.Recording()
                await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
                await recording.startAsync()
                setRecording(recording)
              } catch (err) {
                console.error('Failed to start recording', err)
              }
        },
        [uri, recording, setRecording]
    )
  
    const onPressOut = useCallback(
        async () => {
            console.log('#ed on press out:', uri)
            if (uri) return
            try {
                setRecording(undefined)
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: false,
                })
                await recording.stopAndUnloadAsync()
                const uri = recording.getURI()
                setUri(uri)
            } catch (e) {
                console.log(e, ' error stopping recording')
            }
        },
        [uri, recording, setRecording]
    )

    useLayoutEffect(() => {
        navigation.setOptions({
           headerShown: false
        })
    }, [])

    return (
        <LessonWrapper
            navigation={navigation}
            progress={oneStepPercent * activeIndex}
            title={t('Pronunciation Practice')}
            buttonText={t('Next')}
            onPress={onNext}>
            <Question
                question={questions[activeIndex]}
                styles={styles} />
            <View style={styles.playWrapper}>
                {uri?.length > 0 && (
                    <TouchableOpacity
                        activeOpacity={.6}
                        onPress={() => onPress(0)}>
                        <Text style={styles.text}>
                            {t('Play recording')}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            <TouchableOpacity
                activeOpacity={uri ? 1 : .4}
                style={{marginBottom: 20}}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onMagicTap={() => console.log('magic tap')}>
                <SvgXml
                    width="80"
                    height="80"
                    opacity={uri ? .5 : 1}
                    xml={icons.microphone}/>
            </TouchableOpacity>
            <Pressable onPress={() => onPress(1)}>
                <Text style={styles.text}>
                    {uri ? t('Try Again') : t('Hold to record')}
                </Text>
            </Pressable>
        </LessonWrapper>
    )
}

export default Pronounce

const styles = StyleSheet.create({
    questionSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        width: windowWidth - 90,
    },
    questionWrapper: {
        paddingLeft: 15,
        alignItems: 'center',
    },
    text: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 18,
        textAlign: 'center'
    },
    transliteration: {
        color: COLORS.purple,
        fontWeight: '700',
        fontSize: 15,
        marginTop: 8,
        textAlign: 'center'
    },
    playWrapper: {
        minHeight: 30,
        marginTop: 55,
        marginBottom: 15,
    }
})