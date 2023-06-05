export default function useGenerateExerciseSearch () {
    const generateExercise = (exercise) => {
        let search = ''
        const allExercises = []
        exercise.lessons.map(lesson => allExercises.push(lesson.exercises))
        allExercises.map(
            (singleExercise) => {
                singleExercise.map(
                    (row) => {
                        row.quiz.map(
                            (quiz) => {
                                search += `${quiz.question.id} `
                                quiz.answers.map(
                                    (answer) => {
                                        search += `${answer.value.id} `
                                        search += `${answer.value.transliteration} `
                                    }
                                )
                            }
                        )
                    }
                )
            }
        )
    
        return search
    }

    return generateExercise
}
