import React, { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native';
import { Audio } from 'expo-av'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTabNavigator from './BottomTabNavigator'
import Lessons from '../screens/Lessons'
import Translate from '../screens/Exercise/Translate'
import Alphabet from '../screens/Alphabet'
import Select from '../screens/Exercise/Select'
import Pronounce from '../screens/Pronounce'
import Login from '../screens/Login'
import Register from '../screens/Register'
import LanguageGroups from '../screens/LanguageGroups'
import EditProfile from '../screens/EditProfile'
import ChangePassword from '../screens/ChangePassword'
import Verification from '../screens/Verification'
import ForgotPassword from '../screens/ForgotPassword'
import ResetPassword from '../screens/ResetPassword'
import Exercise from '../screens/Exercise'
import { useUpdateUser, useUser } from '../core/hooks'

const { Navigator, Screen } = createStackNavigator()

const screens = [
    { name: 'Root', component: BottomTabNavigator },
    { name: 'Lessons', component: Lessons },
    { name: 'Alphabet', component: Alphabet },
    { name: 'Translate', component: Translate },
    { name: 'Select', component: Select },
    { name: 'Pronounce', component: Pronounce },
    { name: 'LanguageGroups', component: LanguageGroups },
    { name: 'EditProfile', component: EditProfile },
    { name: 'Verification', component: Verification },
    { name: 'Login', component: Login },
    { name: 'Register', component: Register },
    { name: 'ChangePassword', component: ChangePassword },
    { name: 'ForgotPassword', component: ForgotPassword },
    { name: 'ResetPassword', component: ResetPassword },
    { name: 'Exercise', component: Exercise },

]

const Navigation = () => {
    const notificationListener = useRef()
    const responseListener = useRef()
    const { user, setUser } = useUser()
    const { mutate: updateUser } = useUpdateUser()
    const [, setNotification] = useState(false)
    
    async function registerForPushNotificationsAsync() {
        let token
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync()
            let finalStatus = existingStatus
            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync()
                finalStatus = status
            }

            if (finalStatus !== "granted") {
                return alert("Failed to get push token for push notification!")
            }

            await Notifications.getExpoPushTokenAsync()
            token = (await Notifications.getExpoPushTokenAsync()).data
        } else {
            alert("Must use physical device for Push Notifications")
        }

        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            })
        }
        return token
    }

    useEffect(() => {
        if (!user || !user.id) return
        if (!user.pushNotificationToken) {
            registerForPushNotificationsAsync()
                .then(
                    (token) => {
                        if (!token) return
                        updateUser(
                            {
                                id: user.id,
                                pushNotificationToken: token,
                            },
                            {
                                onSuccess: (response) => setUser(response.data.updateUser)
                            }
                        )
                    }
                )
                .catch(
                    (e) => {
                        console.log(e,  ' error')
                    }
                )
        }
        Audio.requestPermissionsAsync()
    }, [user])

    useEffect(() => {
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            console.log(notification, ' got notification')
            setNotification(notification)
        })

        return () => {
            Notifications.removeNotificationSubscription(notificationListener)
            Notifications.removeNotificationSubscription(responseListener)
        }
    }, [])

    return (
        <NavigationContainer>
            <Navigator>
                {screens.map((screen) => (
                    <Screen
                        key={`screen-${screen.name}`}
                        name={screen.name}
                        component={screen.component}/>
                ))}
            </Navigator>
        </NavigationContainer>
    )
}

export default Navigation