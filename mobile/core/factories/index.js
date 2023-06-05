import {
    authRepo,
    userRepo,
    fileRepo,
    moduleRepo,
    languageRepo,
    languageGroupRepo,
    exerciseRepo,
    feedbackRepo,
    progressRepo,
    alphabetRepo,
    vocabularyRepo,
} from '../repositories'
import {
    authService,
    userService,
    fileService,
    moduleService,
    languageService,
    languageGroupService,
    exerciseService,
    feedbackService,
    progressService,
    alphabetService,
    vocabularyService,
} from '../services'
import auth from './authUseCase'
import file from './fileUseCase'
import user from './userUseCase'
import asModule from './asModuleUseCase'
import alphabet from './alphabetUseCase'
import vocabulary from './vocabularyUseCase'
import language from './languageUseCase'
import languageGroup from './languageGroupUseCase'
import exercise from './exerciseUseCase'
import feedback from './feedbackUseCase'
import progress from './progressUseCase'

export const userUseCase = user(
    userRepo(
        userService(),
    ),
)

export const authUseCase = auth(
    authRepo(
        authService(),
    ),
)

export const moduleUseCase = asModule(
    moduleRepo(
        moduleService(),
    ),
)

export const languageUseCase = language(
    languageRepo(
        languageService(),
    ),
)

export const alphabetUseCase = alphabet(
    alphabetRepo(
        alphabetService()
    )
)

export const vocabularyUseCase = vocabulary(
    vocabularyRepo(
        vocabularyService()
    )
)

export const languageGroupUseCase = languageGroup(
    languageGroupRepo(
        languageGroupService(),
    ),
)

export const fileUseCase = file(
    fileRepo(
        fileService()
    )
)

export const exerciseUseCase = exercise(
    exerciseRepo(
        exerciseService()
    )
)

export const feedbackUseCase = feedback(
    feedbackRepo(
        feedbackService()
    )
)

export const progressUseCase = progress(
    progressRepo(
        progressService()
    )
)
