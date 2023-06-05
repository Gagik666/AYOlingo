import {
    authRepo,
    userRepo,
    fileRepo,
    moduleRepo,
    languageRepo,
    languageGroupRepo,
    exerciseRepo,
    alphabetRepo,
    vocabularyRepo,
    feedbackRepo,
    invitationRepo,
    pushNotificationRepo,
    progressRepo,
    audioRepo,
} from '../repositories'
import {
    authService,
    userService,
    fileService,
    moduleService,
    languageService,
    languageGroupService,
    exerciseService,
    alphabetService,
    vocabularyService,
    feedbackService,
    invitationService,
    pushNotificationService,
    progressService,
    audioService,
} from '../services'
import auth from './authUseCase'
import file from './fileUseCase'
import user from './userUseCase'
import asModule from './asModuleUseCase'
import language from './languageUseCase'
import languageGroup from './languageGroupUseCase'
import exercise from './exerciseUseCase'
import alphabet from './alphabetUseCase'
import vocabulary from './vocabularyUseCase'
import feedback from './feedbackUseCase'
import invitation from './invitationUseCase'
import pushNotification from './pushNotificationUseCase'
import progress from './progressUseCase'
import audio from './audioUseCase'

export const authUseCase = auth(
    authRepo(
        authService(),
    ),
)

export const userUseCase = user(
    userRepo(
        userService(),
    ),
    progressRepo(
        progressService()
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

export const feedbackUseCase = feedback(
    feedbackRepo(
        feedbackService()
    )
)

export const invitationUseCase = invitation(
    invitationRepo(
        invitationService()
    )
)

export const pushNotificationUseCase = pushNotification(
    pushNotificationRepo(
        pushNotificationService()
    )
)

export const progressUseCase = progress(
    progressRepo(
        progressService()
    )
)

export const audioUseCase = audio(
    audioRepo(
        audioService()
    )
)
