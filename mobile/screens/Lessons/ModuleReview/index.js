import React, { useCallback } from 'react'
import { CompletedButton } from '../../../components/theme'
import { COLORS } from '../../../core/constants'
import * as icons from '../../../assets/icons'
import { useGetRandomExercises } from '../../../core/hooks'
import { useTranslation } from '../../../core/contexts/TranslationContext'

export default function TestOut ({
    isDisabled,
    navigation,
    exercise,
    module,
}) {
    const { t } = useTranslation()
    const getRandomExercises = useGetRandomExercises()

    const onModuleReview = useCallback(
        () => {
            let allExercises = []
            exercise.lessons.map(lesson => allExercises = [...allExercises, ...lesson.exercises])
            const count = allExercises.length > 50 ? 20 : 3;
            const randomExercises = getRandomExercises(count, allExercises)
            navigation.navigate(
                'Exercise',
                {
                    isModuleReview: true,
                    moduleReviewExercises: randomExercises,
                    module,
                    allExercisesCount: allExercises.length,
                }
            )
        },
        [exercise]
    )

    return (
        <CompletedButton
            backgroundColor="white"
            textStyles={{color: COLORS.purple}}
            icon={icons.educationPurple}
            disabled={isDisabled}
            onPress={onModuleReview}>
            {t('Boost to 100')}
        </CompletedButton>
    )
}
