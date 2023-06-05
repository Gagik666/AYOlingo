const { appSyncRequest } = require('../functions');
const { updateExercises } = require('../graphql/mutations');
let exercises = require('../input/exercises.json')
const formattedAudios = require('../input/formatted-detailed-audios.json')

exercises = exercises

const sliceIntoChunks = (arr, chunkSize) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
  }
  return res;
}

const groupFormattedAudios = () => {
  const result = {}

  for (const formattedAudio of formattedAudios) {
    if (!result[formattedAudio.exerciseId]) {
      result[formattedAudio.exerciseId] = []
    }

    result[formattedAudio.exerciseId] = [
      ...result[formattedAudio.exerciseId],
      formattedAudio,
    ]
  }

  return result
}

const mapExercises = (formattedAudios) =>
  exercises.map(exercise => {
    const exerciseFormattedAudios = formattedAudios[exercise.id]

    if (!exerciseFormattedAudios) {
      return exercise
    }

    for (const formattedAudio of exerciseFormattedAudios) {
      if (formattedAudio.answerIndex !== undefined) {
        exercise.lessons[formattedAudio.lessonIndex].exercises[formattedAudio.lessonExerciseIndex].quiz[formattedAudio.quizIndex].answers[formattedAudio.answerIndex].value.audio = formattedAudio.filename
      } else {
        exercise.lessons[formattedAudio.lessonIndex].exercises[formattedAudio.lessonExerciseIndex].quiz[formattedAudio.quizIndex].question.audio = formattedAudio.filename
      }
    }

    return { id: exercise.id, lessons: exercise.lessons }
  })

async function migrateAudioNames() {
  const exercisesChunks = sliceIntoChunks(mapExercises(groupFormattedAudios()), 2)
  for (const chunk of exercisesChunks) {
    const response = await Promise.all(chunk.map(row => {
      return appSyncRequest(updateExercises, { input: row })
    }))

    console.log(response[0].data)
  }
}

module.exports = migrateAudioNames;
