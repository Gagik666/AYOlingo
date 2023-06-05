import React, { useCallback } from 'react'
import { CompletedButton } from '../../../components/theme'
import { COLORS } from '../../../core/constants'
import * as icons from '../../../assets/icons'
import { useGetRandomExercises } from '../../../core/hooks'
import { useTranslation } from '../../../core/contexts/TranslationContext'

export default function TestOut ({
    navigation,
    exercise,
    module,
    progress,
}) {
    const { t } = useTranslation()
    const getRandomExercises = useGetRandomExercises()

    const onTestOut = useCallback(
        () => {
            let allExercises = []
            exercise.lessons.map(lesson => allExercises = [...allExercises, ...lesson.exercises])
            if (allExercises.length < 20) {
                return alert('There are no enough exercises')
            }
            const randomExercises = getRandomExercises(20, allExercises)
            navigation.navigate('Exercise', {isTestOut: true, testOutExercises: randomExercises, module})
        },
        [exercise]
    )

    return (
        <CompletedButton
            backgroundColor="white"
            textStyles={{color: COLORS.purple}}
            icon={icons.educationPurple}
            onPress={onTestOut}>
            {progress === 100 ? t('Module Review') : t('Test out')}
        </CompletedButton>
    )
}
