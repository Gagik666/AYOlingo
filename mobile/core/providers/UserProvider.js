import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native';
import { Hub } from 'aws-amplify'
import { UserContext } from '../contexts'
import { userUseCase } from '../factories'
import { useContent, useGetProgress, useUsersByEmail, useCreateUser, useCreateProgress, useSignOut } from '../hooks'

const isSocialAuth = (username) => {
    if (username.includes('google')) return true
    if (username.includes('facebook')) return true
    if (username.includes('apple')) return true
    return false
}

function UserProvider({
    children,
    user: existingUser,
}) {
    const [user, setUser] = useState(existingUser)
    const { content: { progress }, setContent } = useContent()
    const { usersByEmail } = useUsersByEmail()
    const { createUser } = useCreateUser()
    const { getProgress } = useGetProgress()
    const { createProgress } = useCreateProgress()
    const { signOut } = useSignOut();

    const getCurrentAuthenticatedUser = () => {
        userUseCase
            .getCurrentAuthenticatedUser()
            .then(
                (user) => {
                    const isSocial = isSocialAuth(user.username)
                    usersByEmail(
                        {
                            email: user.attributes.email
                        },
                        {
                            onSuccess: (response) => {
                                if (response.data.usersByEmail.items.length > 0) {
                                    const user = response.data.usersByEmail.items[0]
                                    if (user.deletedAt) {
                                        Alert.alert('Your account is deleted')
                                        return signOut();
                                    }
                                    return setUser(user)
                                }
                                if (isSocial) {
                                    const input = {
                                        email: user.attributes.email,
                                        type: 'User',
                                        createdAt: new Date().toISOString()
                                    }
                                    createUser(
                                        input,
                                        {
                                            onSuccess: (response) => {
                                                createProgress({id: response.data.createUser.id})
                                                setUser(response.data.createUser)
                                            }
                                        }
                                    )
                                }
                            }
                        }
                    )
                }
            )
            .catch(
                (e) => console.log(ue)
            )
    }

    useEffect(() => {
        getCurrentAuthenticatedUser()
        Hub.listen('auth', (data) => {
            const { payload } = data
            if (payload.event === 'cognitoHostedUI' && payload.data) {
                getCurrentAuthenticatedUser()
            }
        })
    }, [])

    useEffect(() => {
        if (!user?.id) return
        if (progress?.id) return
        getProgress(user.id, {
            onSuccess: (response) => {
                console.log('>>> SETTING USER PROGRESS');
                setContent(
                    (content) => ({
                        ...content,
                        progress: {
                            ...response.data.getProgress,
                            modules: response.data.getProgress?.modules ? JSON.parse(response.data.getProgress.modules) : {}
                        }
                    })
                )
            },
            onError: (e) => console.log(e, ' error getting progress')
        })
    }, [progress, user])

    return (
        <UserContext.Provider value={{ user, setUser, getUser: getCurrentAuthenticatedUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
