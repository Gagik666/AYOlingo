import { useContent, useUpdateProgress } from '../../../core/hooks'

export default function usePassModuleReview () {
    const { content: { progress }, setContent } = useContent()
    const { mutate: updateProgress } = useUpdateProgress()

    const onPassModuleReview = ({module, moduleReviewExercises, allExercisesCount, navigation}) => {
        const newProgress = {...progress}
        const moduleReviewExerciseCount = moduleReviewExercises.length
        const oneCorrectAnswerPoint = 100 / allExercisesCount
        const regressionPoints = Math.round(progress.modules[module.id].regression.points - oneCorrectAnswerPoint * moduleReviewExerciseCount)
        newProgress.modules[module.id].lastLessonCompletedDate = new Date()
        newProgress.modules[module.id].regression.points = regressionPoints < 0 ? 0 : regressionPoints
        newProgress.modules[module.id].regression.isStarted = false
        updateProgress(
            {
                id: newProgress.id,
                modules: JSON.stringify(newProgress.modules)
            },
            {
                onSuccess: (response) => {
                    console.log('>>> SETTING PROGRESS MODULE REVIEW')
                    setContent(
                        (content) => ({
                            ...content,
                            progress: {
                                ...response.data.updateProgress,
                                modules: JSON.parse(response.data.updateProgress.modules)
                            }
                        })
                    )
                    setTimeout(() => navigation.goBack(), 0)
                }
            }
        )
    }

    return onPassModuleReview
}
