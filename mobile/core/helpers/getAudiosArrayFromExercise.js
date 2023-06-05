const getAudiosArrayFromExercise = (exercise) => {
    const audios = new Set()

    for (const quiz of exercise?.quiz) {
        if (quiz.question.audio) {
            audios.add(quiz.question.audio);
        } else {
            audios.add(`${quiz.question.id}.mp3`);
        }

        for (const answer of quiz.answers) {
            if (answer.value.audio) {
                audios.add(answer.value.audio);
            } else {
                audios.add(`${quiz.question.id}.mp3`);
            }
        }
    }

    return audios
}

export default getAudiosArrayFromExercise
