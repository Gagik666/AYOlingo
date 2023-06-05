import React, { useEffect, useLayoutEffect, useMemo } from 'react'
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { CompletedButton } from '../../components/theme'
import LessonsWrapper from '../../components/TitleWrapper'
import { COLORS } from '../../core/constants'
import { useContent, useUpdateProgress } from '../../core/hooks'
import { getModulePercent } from '../../core/helpers'
import TestOut from './TestOut'
import ModuleReview from './ModuleReview'
import * as icons from '../../assets/icons'
import { useTranslation } from '../../core/contexts/TranslationContext'

const Lessons = ({ navigation, route }) => {
    const module = route.params.module
    const { t } = useTranslation()
    const { mutate: updateProgress } = useUpdateProgress()
    const { content, setContent } = useContent()
    const percent = getModulePercent(content.progress, module)
    const existingExercise = useMemo(
        () => {
            return content.exercises.items.find(exercise => exercise.module === module.id)
        },
        []
    )
    const exercise = useMemo(
        () => ({
            data: existingExercise,
            index: content.exercises.items.indexOf(existingExercise)
        }),
        []
    )

    useEffect(() => {
        if (!exercise?.data?.lessons || !content.progress) return
        if (content.progress.modules[module.id]) return
        const newProgressModules = {...content.progress.modules}
        const newProgressModuleLessons = {}
        exercise.data.lessons.map(
            (lesson, lessonIndex) => {
                const newProgressModuleExercises = {}
                lesson.exercises.map((e, exerciseIndex) => newProgressModuleExercises[exerciseIndex] = false)
                newProgressModuleLessons[lessonIndex] = {
                    progress: 0,
                    exercises: newProgressModuleExercises
                }
            }
        )
        newProgressModules[module.id] = {
            progress: 0,
            regression: {
                isStarted: false,
                points: 0,
            },
            lessons: newProgressModuleLessons,
        }
        const input = {
            ...content.progress,
            modules: JSON.stringify(newProgressModules)
        }
        delete input.createdAt
        delete input.updatedAt
        updateProgress(
            input,
            {
                onSuccess: (response) => {
                    console.log('>>> SETTING PROGRESS | LESSONS')
                    setContent(
                        (content) => ({
                            ...content,
                            progress: {
                                ...response.data.updateProgress,
                                modules: JSON.parse(response.data.updateProgress.modules)
                            }
                        })
                    )
                },
                onError: (e) => console.log(e, ' error updating progress')
            }
        )
    }, [exercise, content.progress])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <LessonsWrapper
            title={module.name}
            navigation={navigation}>
            <TouchableOpacity onPress={() => navigation.navigate('Alphabet')}>
                <View style={{backgroundColor: COLORS.purple, paddingVertical: 5, paddingHorizontal: 15,borderRadius: 100,  marginBottom: 15}}>
                    <Text style={{color: '#ffffff', fontWeight: '500'}}>
                        {t('View alphabet')}
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={{alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', width: '100%', marginBottom: 20}}>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.infoText}>
                        {t('Progress')}
                    </Text>
                    <Text style={styles.text}>
                        {percent}
                    </Text>
                </View>
            </View>
            <ScrollView
                style={{width: '100%'}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                {exercise?.data?.lessons?.map(
                    (lesson, index) => (
                        <CompletedButton
                            key={`lesson-${index}`}
                            disabled={!lesson.exercises || lesson.exercises.length === 0 || !content?.progress?.modules[module.id]?.lessons}
                            backgroundColor={COLORS[content.progress?.modules[module.id]?.lessons && content.progress?.modules[module.id].lessons[index]?.progress === 100 ? 'green' : 'purple']}
                            onPress={() => navigation.navigate('Exercise', {lesson, module, lessonIndex: index, lessonNumber: index + 1, exercise: exercise.data})}>
                            {t('Lesson')} {index + 1}
                        </CompletedButton>
                    )
                )}
                <TestOut
                    progress={content?.progress?.modules[module.id]?.progress}
                    module={module}
                    navigation={navigation}
                    exercise={existingExercise} />
                <ModuleReview
                    isDisabled={!content?.progress?.modules[module.id]?.regression?.points}
                    navigation={navigation}
                    route={route}
                    module={module}
                    exercise={existingExercise} />
                <CompletedButton
                    wrapperStyles={{marginBottom: 30}}
                    backgroundColor="#ffffff"
                    textStyles={{color: COLORS['purple']}}
                    icon={icons.microphone3}
                    onPress={() => navigation.navigate('Pronounce', {exercise: existingExercise})}>
                    {t('Pronunciation practice')}
                </CompletedButton>
            </ScrollView>
        </LessonsWrapper>
    )
}

export default Lessons

const styles = StyleSheet.create({
    infoText: {
        color: '#ffffff',
        fontSize: 16,
        textTransform: 'capitalize'
    },
    text: {
        color: '#ffffff',
        fontWeight: '500',
        fontSize: 18,
    }
})
