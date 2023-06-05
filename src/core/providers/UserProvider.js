import React, { useState, useEffect } from 'react'
import { UserContext } from '../contexts'
import { userUseCase } from '../factories'

function UserProvider(props) {
    const [user, setUser] = useState()
    const { children } = props

    useEffect(() => {
        userUseCase
            .getSignedInUser()
            .then(setUser)
            .catch(
                (e) => {
                    console.log('getting signed in user error -> ', e)
                    setUser(null)
                }
            )
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
