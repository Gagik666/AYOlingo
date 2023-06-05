require('dotenv').config()
const cli = require('cac')()
const {
    generateModelDumpInput,
    migrateElasticData,
    migrateExerciseLessonsCount,
    migrateProgressWithUserDetails,
    migrateUsersPassedLessonsCount,
    generateNewStructureAudioNames,
    migrateAudioNames,
} = require('./scripts')

cli.command('generate-model-dump-input [queryName] [outputName]', 'Generate model dump input').action(generateModelDumpInput)
cli.command('migrate-elastic-data [queryName] [outputName]', 'Generate elastic data').action(migrateElasticData)
cli.command('migrate-exercise-lessons-count [inputName]', 'Migrate exercise lessons count').action(migrateExerciseLessonsCount)
cli.command('migrate-progress-with-user-details [inputName]', 'Migrate progress with user details').action(migrateProgressWithUserDetails)
cli.command('migrate-users-passed-lessons-count [inputName]', 'Migrate users passed lessons count').action(migrateUsersPassedLessonsCount)
cli.command('migrate-audio-names', 'Migrate audio names').action(migrateAudioNames)
cli.command('generate-new-structure-audio-names', 'Generate new structure audio names').action(generateNewStructureAudioNames)

cli.help()

cli.parse()
