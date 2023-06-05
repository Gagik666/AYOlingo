const useSetKeyOnExercises = () => {
    const setKeyOnExercises = (exercises) => {
        const newExercises = []
        exercises.map(
            (exercise) => {
                const newExercise = {...exercise}
                const newLessons = []
                exercise.lessons.map(
                    (lesson) => {
                        const newLesson = {exercises: []}
                        lesson.exercises.map(
                            (exercise) => {
                                const randomString = new Date().getTime() * Math.random()
                                const newExercise = {...exercise, key: randomString}
                                newLesson.exercises.push(newExercise)
                            }
                        )
                        newLessons.push(newLesson)
                    }
                )
                newExercise.lessons = newLessons
                newExercises.push(newExercise)
            }
        )
        return newExercises
    }

    return setKeyOnExercises
}

export default useSetKeyOnExercises