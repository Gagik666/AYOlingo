import React, { useCallback, useEffect, useState } from 'react'
import { useLayoutEffect } from 'react'
import Wrapper from '../../components/TitleWrapper'
import { useContent } from '../../core/hooks'
import { usePlayAudio } from '../../core/helpers'
import useUpdateProgress from './hooks/useUpdateGlobalProgress'
import usePassTestOut from './hooks/usePassTestOut'
import usePassModuleReview from './hooks/usePassModuleReview'
import ExerciseModal from './ExerciseModal'
import Select from './Select'
import Translate from './Translate'
import FillInTheBlank from './FillInTheBlank'
import MatchThese from './MatchThese'
import CorrectAnswerPreview from './CorrectAnswerPreview'
import SuccessAudio from '../../assets/audios/success.mp3'
import ErrorAudio from '../../assets/audios/error.mp3'

const Exercise = ({navigation, route}) => {
    const { lesson, module, lessonIndex, lessonNumber, exercise, isTestOut, testOutExercises, isModuleReview, moduleReviewExercises, allExercisesCount } = route.params
    const { playLocalAudio } = usePlayAudio()
    const { content: { progress } } = useContent()
    const updateProgress = useUpdateProgress()
    const passTestOut = usePassTestOut()
    const passModuleReview = usePassModuleReview()
    const [testOutProgress, setTestOutProgress] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)
    const [exercises, setExercises] = useState()
    const [modal, setModal] = useState({visible: false, success: '', correctAnswers: ['']})

    const onTestOutPass = useCallback(
        () => passTestOut({module, navigation, lesson}),
        [progress, module]
    )

    const onModuleReviewPass = useCallback(
        () => passModuleReview({module, moduleReviewExercises, allExercisesCount, navigation}),
        [module, moduleReviewExercises, allExercisesCount, progress]
    )

    const onSubmit = useCallback(
        (success, exercise, correctAnswers) => {
            if (!isTestOut && !isModuleReview) updateProgress({exercise, lesson, module, lessonIndex, success})
            if (!success) setExercises(exercises => [...exercises, exercise])
            if (isTestOut && success) {
                setTestOutProgress(progress => progress + parseInt(Number.parseFloat(100 / testOutExercises.length).toFixed(0)))
            }
            if (isModuleReview && success) {
                console.log('>>> moduleReviewExercises.length', moduleReviewExercises.length);
                setTestOutProgress(progress => {
                    console.log('>>> progress + parseInt(Number.parseFloat(100 / moduleReviewExercises.length).toFixed(0))', progress + parseInt(Number.parseFloat(100 / moduleReviewExercises.length).toFixed(0)));
                    return progress + parseInt(Number.parseFloat(100 / moduleReviewExercises.length).toFixed(0))
                })
            }
            playLocalAudio(success ? SuccessAudio : ErrorAudio, true, true)
            setModal({visible: true, success, correctAnswers: success ? [''] : correctAnswers})
        },
        [setModal, isTestOut, isModuleReview, setTestOutProgress]
    )

    const onNext = useCallback(
        () => {
            setModal({visible: false, success: ''})
            if (activeIndex + 1 === exercises.length) {
                if (isModuleReview) {
                    return onModuleReviewPass()
                }
                if (isTestOut) {
                    return onTestOutPass()
                }
                return navigation.goBack()
            }
            setActiveIndex(activeIndex => activeIndex + 1)
        },
        [activeIndex, setActiveIndex, lesson, exercises]
    )

    useEffect(() => {
        if (isModuleReview) {
            return setExercises([...moduleReviewExercises])
        }
        if (isTestOut) {
            return setExercises([...testOutExercises])
        }
        if (progress.modules[module.id].lessons[lessonIndex].progress === 100) {
            return setExercises([...lesson.exercises])
        }
        return setExercises(lesson.exercises.filter(
            (e, index) => !progress.modules[module.id].lessons[lessonIndex].exercises[index]
        ))
    }, [lesson])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    if ((!exercise && !isTestOut && !isModuleReview) || !exercises) return <></>

    const active_tab_props = {
        navigation,
        exercise: exercises[activeIndex],
        onSubmit,
        progress: (isTestOut || isModuleReview) ? testOutProgress : isModuleReview ? 0 : progress?.modules[module.id]?.lessons[lessonIndex]?.progress,
    }

    const exerciseModalProps = {
        modal: modal,
        Header: <CorrectAnswerPreview modal={modal} />,
        lessonIndex: lessonIndex,
        _exercise: exercise?.id,
        exerciseIndex: activeIndex,
        onNext: onNext,
        module,
    }

    if (exercises[activeIndex].type === 'translate_this_phrase') {
        return (
            <>
                <Translate {...active_tab_props} />
                {modal.visible && (
                    <ExerciseModal {...exerciseModalProps} />
                )}
            </>
        )
    }

    if (exercises[activeIndex].type === 'select_translation') {
        return (
            <>
                <Select {...active_tab_props} />
                {modal.visible && (
                    <ExerciseModal {...exerciseModalProps} />
                )}
            </>
        )
    }

    if (exercises[activeIndex].type === 'fill_in_the_blank') {
        return (
            <>
                <FillInTheBlank {...active_tab_props} />
                {modal.visible && (
                    <ExerciseModal {...exerciseModalProps} />
                )}
            </>
        )
    }

    if (exercises[activeIndex].type === 'match_these_translations' || exercises[activeIndex].type === 'match_these_pairs') {
        return (
            <>
                <MatchThese {...active_tab_props} />
                {modal.visible && (
                    <ExerciseModal {...exerciseModalProps} />
                )}
            </>
        )
    }

    return (
        <Wrapper
            navigation={navigation}
            title={`Lesson ${lessonNumber}`}>
            
        </Wrapper>
    )
}

export default Exercise