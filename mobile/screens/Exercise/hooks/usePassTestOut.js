import { useContent, useUpdateProgress } from '../../../core/hooks'

export default function usePassTestOut () {
    const { content: { progress }, setContent } = useContent()
    const { mutate: updateProgress } = useUpdateProgress()

    const onPassTestOut = ({module, navigation, lesson}) => {
        const newProgress = {...progress}
        const newProgressCurrentModule = {}
        newProgressCurrentModule.progress = 100
        newProgressCurrentModule.lessons = {}
        newProgressCurrentModule.lastLessonCompletedDate = new Date()
        Object.entries(newProgress.modules[module.id].lessons).map(
            ([key, value]) => {
                if (!value?.exercises) return
                newProgressCurrentModule.lessons[key] = {
                    ...lesson,
                    progress: 100,
                    exercises: Object.keys(value.exercises).map(key => ({[key]: true}))
                }
            }
        )
        newProgress.modules[module.id] = newProgressCurrentModule
        updateProgress(
            {
                id: newProgress.id,
                modules: JSON.stringify(newProgress.modules)
            },
            {
                onSuccess: (response) => {
                    console.log('>>> SETTING PROGRESS PASS TEST OUT')
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

    return onPassTestOut
}