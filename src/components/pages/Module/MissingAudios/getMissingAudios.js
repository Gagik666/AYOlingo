import axios from 'axios'
import { ARMENIAN_CHARACTERS, S3_BUCKET } from '../../../../core/constants'

export default async function getMissingAudios(exercise) {
    const missingAudios = {};
    const filteredMissingAudios = [];

    for (const [lessonIndex, lesson] of exercise.lessons.entries()) {
        for (const [exerciseIndex, exercise] of lesson.exercises.entries()) {
            for (const [quizIndex, quiz] of exercise.quiz.entries()) {
                if (!quiz.question.audio && quiz.question.id && ARMENIAN_CHARACTERS.includes(quiz.question.id[0])) {
                    missingAudios[quiz.question.id] = {
                        lessonIndex,
                        exerciseIndex,
                        quizIndex,
                        text: quiz.question.id
                    }
                }

                for (const [answerIndex, answer] of quiz.answers.entries()) {
                    if (!answer.value.audio && answer.value.id && ARMENIAN_CHARACTERS.includes(answer.value.id[0])) {
                        missingAudios[answer.value.id] = {
                            lessonIndex,
                            exerciseIndex,
                            quizIndex,
                            answerIndex,
                            text: answer.value.id
                        }
                    }
                }
            }
        }
    }

    for (const [text, missingAudio] of Object.entries(missingAudios)) {
        try {
            const filename = `${S3_BUCKET}_audio/${text}.mp3`
            await axios.get(encodeURI(filename))
            console.log(`>>> audio exists: ${text}`)
        } catch (e) {
            console.log(`>>> error of ${text}: ${e}`)
            if (e?.response?.status === 403) {
                filteredMissingAudios.push(missingAudio)
            }
        }
    }

    return filteredMissingAudios
}
