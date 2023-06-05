export default function useGetRandomExercises () {
    const getRandomExercises = (count, exercises) => {
        const newExercises = []

        const getRandomItem = (data) => {
            const item = exercises[Math.floor(Math.random() * exercises.length)]
            if (data.includes(item)) {
                return getRandomItem(data)
            }
            return item
        }

        for (var i = 0; i < count; i++) {
            const randomItem = getRandomItem(newExercises)
            if (!newExercises.includes(randomItem)) newExercises.push(randomItem)
        }
        return newExercises
    }

    return getRandomExercises
}