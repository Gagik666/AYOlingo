import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { RouterContext } from '../contexts'
import Login from '../../components/pages/Login'
import Register from '../../components/pages/Register'
import Verify from '../../components/pages/Verify'
import Dashboard from '../../components/pages/Dashboard'
import Feedback from '../../components/pages/Feedback'
import Configurations from '../../components/pages/Configurations'
import PushNotifications from '../../components/pages/PushNotifications'
import UsersList from '../../components/pages/User/List'
import InviteUser from '../../components/pages/User/Invite'
import ModulesList from '../../components/pages/Module/List'
import ModulesMissingAudios from '../../components/pages/Module/MissingAudios'
import LessonsList from '../../components/pages/Module/Lessons/List'
import ExercisesList from '../../components/pages/Module/Exercises/List'
import ExerciseAddEdit from '../../components/pages/Module/Exercises/AddEdit'
import Alphabet from '../../components/pages/Language/Alphabet'
import LanguageList from '../../components/pages/Language/List'
import LanguageGroups from '../../components/pages/Language/Groups'
import Audios from '../../components/pages/Audios'
import TreeView from '../../components/pages/TreeView'
import Vocabulary from '../../components/pages/Vocabulary'
import { useUser } from '../../core/hooks'
import PanelWrapper from '../../components/global/PanelWrapper'

const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/verify-account', component: Verify },
    { path: ['/', '/dashboard'], component: Dashboard },
    { path: '/feedback', component: Feedback },
    { path: '/configurations', component: Configurations },
    { path: '/push-notifications', component: PushNotifications },
    { path: '/users/list', component: UsersList },
    { path: '/users/invite', component: InviteUser },
    { path: '/collection/vocabulary', component: Vocabulary },
    { path: '/collection/audios', component: Audios },
    { path: '/collection/modules/list', component: ModulesList },
    { path: '/collection/modules/list/:moduleId/missing-audios', component: ModulesMissingAudios },
    { path: '/collection/modules/list/:moduleId/lessons', component: LessonsList },
    { path: '/collection/modules/list/:moduleId/lesson/:lessonIndex', component: ExercisesList },
    { path: '/collection/modules/list/:moduleId/lesson/:lessonIndex/create-exercise', component: ExerciseAddEdit },
    { path: '/collection/modules/list/:moduleId/lesson/:lessonIndex/edit-exercise/:exerciseIndex', component: ExerciseAddEdit },
    { path: '/collection/tree-view', component: TreeView },
    { path: '/languages/list', component: LanguageList },
    { path: '/languages/alphabet', component: Alphabet },
    { path: '/languages/groups', component: LanguageGroups },
]

const RouterProvider = ({children}) => {
    const { user } = useUser()
    const location = useLocation()
    const publicRoutes = ['/login', '/login/', '/register', '/register/', '/verify-account', '/verify-account/',]
    const isProtected = publicRoutes.includes(location.pathname)

    if (user === undefined) {
        return <></>
    }

    const isAuth = user ? true : false
    
    if (isProtected && isAuth) {
        return <Redirect to="/dashboard"/>
    }

    if (!isProtected && !isAuth) {
        return <Redirect to={`/login?redirect=${location.pathname + location.search.replace(/&/g, '`')}`}/>
    }

    return (
        <RouterContext.Provider value={routes}>
            {isAuth ? (
                <PanelWrapper>
                    {children}
                </PanelWrapper>
            ) : children}
        </RouterContext.Provider>
    )
}

export default RouterProvider