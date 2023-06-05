import { useContent, useUpdateProgress } from '../../../core/hooks'

export default function useUpdateGlobalProgress () {
    const { mutate: updateProgress } = useUpdateProgress()
    const { content: { progress }, setContent } = useContent()

    const onUpdateProgress = ({exercise, lesson, module, lessonIndex, success}) => {
        const newProgress = {...progress}
        const exerciseIndex = lesson.exercises.findIndex(lessonExercise => lessonExercise.key === exercise.key)
        if (!newProgress.modules[module.id].lessons[lessonIndex].exercises[exerciseIndex]) newProgress.modules[module.id].lessons[lessonIndex].exercises[exerciseIndex] = success
        // UPDATE LESSON PROGRESS
        const lessonExercisesArray = Object.values(newProgress.modules[module.id].lessons[lessonIndex].exercises)
        const lessonExercisesCount = lessonExercisesArray.length
        const correctAnswersCount = lessonExercisesArray.filter(isCorrect => isCorrect).length
        const lessonProgress = correctAnswersCount * 100 / lessonExercisesCount
        newProgress.modules[module.id].lessons[lessonIndex].progress = lessonProgress === 100 ? lessonProgress : Number.parseFloat(lessonProgress).toFixed(0)
        if (lessonProgress === 100) newProgress.modules[module.id].lastLessonCompletedDate = new Date()
        // UPDATE MODULE PROGRESS
        const moduleLessonsArray = Object.values(newProgress.modules[module.id].lessons)
        const moduleLessonsCount = moduleLessonsArray.length
        const passedLessons = moduleLessonsArray.filter(lesson => lesson.progress === 100).length
        const moduleProgress = passedLessons * 100 / moduleLessonsCount
        newProgress.modules[module.id].progress = moduleProgress === 100 ? moduleProgress : Number.parseFloat(moduleProgress).toFixed(0)

        updateProgress(
            {
                id: newProgress.id,
                modules: JSON.stringify(newProgress.modules)
            },
            {
                onSuccess: (response) => {
                    console.log('>>> SETTING GLOBAL PROGRESS')
                    setContent(
                        (content) => ({
                            ...content,
                            progress: {
                                ...response.data.updateProgress,
                                modules: JSON.parse(response.data.updateProgress.modules)
                            }
                        })
                    )
                }
            }
        )
    }

    return onUpdateProgress
}
