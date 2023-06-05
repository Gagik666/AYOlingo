const fs = require('fs')
const aws = require('aws-sdk')
const exercises = require('../output/exercises.json')

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_ID,
  region: process.env.REGION
})

const s3 = new aws.S3()

const sliceIntoChunks = (arr, chunkSize) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
  }
  return res;
}

const getFormattedAudios = () => {
  const getFilename = (filename) => {
    const splitted = filename.split('.')
    return splitted[splitted.length - 1]
  }

  const result = []

  for (const exercise of exercises) {
    for (const [lessonIndex, lesson] of exercise.lessons.entries()) {
      for (const [lessonExerciseIndex, lessonExercise] of lesson.exercises.entries()) {
        for (const [quizIndex, quiz] of lessonExercise.quiz.entries()) {
          if (quiz.question.audio) {
            const filename = `${quiz.question.id}.${getFilename(quiz.question.audio)}`

            result.push({
              audio: quiz.question.audio,
              audioName: quiz.question.id,
              filename,
              exerciseId: exercise.id,
              lessonIndex,
              lessonExerciseIndex,
              quizIndex,
            })
          }

          for (const [answerIndex, answer] of quiz.answers.entries()) {
            if (answer.value.audio) {
              const filename = `${answer.value.id}.${getFilename(answer.value.audio)}`

              result.push({
                audio: answer.value.audio,
                audioName: answer.value.id,
                filename,
                exerciseId: exercise.id,
                lessonIndex,
                lessonExerciseIndex,
                quizIndex,
                answerIndex,
              })
            }
          }
        }
      }
    }
  }

  return result
}

async function generateNewStructureAudioNames() {
  const formattedAudios = getFormattedAudios()

  fs.writeFileSync('output/formatted-detailed-audios.json', JSON.stringify(formattedAudios), 'utf-8')
}

module.exports = generateNewStructureAudioNames
