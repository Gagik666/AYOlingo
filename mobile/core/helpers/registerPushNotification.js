// import { useState, useEffect, useRef } from 'react'
// import Constants from 'expo-constants'
// import * as Notifications from 'expo-notifications'
// import { useUpdateUser, useUser } from '../hooks'

// const RegisterPushNotification =  () => {
//     const notificationListener = useRef()
//     const responseListener = useRef()
//     const { user, setUser } = useUser()
//     const { mutate: updateUser } = useUpdateUser()
//     const [, setNotification] = useState(false)
    
//     async function registerForPushNotificationsAsync() {
//         let token
//         if (Constants.isDevice) {
//             const { status: existingStatus } = await Notifications.getPermissionsAsync()
//             let finalStatus = existingStatus
//             if (existingStatus !== "granted") {
//                 const { status } = await Notifications.requestPermissionsAsync()
//                 finalStatus = status
//             }

//             if (finalStatus !== "granted") {
//                 return alert("Failed to get push token for push notification!")
//             }

//             await Notifications.getExpoPushTokenAsync()
//             token = (await Notifications.getExpoPushTokenAsync()).data
//         } else {
//             alert("Must use physical device for Push Notifications")
//         }

//         if (Platform.OS === "android") {
//             Notifications.setNotificationChannelAsync("default", {
//                 name: "default",
//                 importance: Notifications.AndroidImportance.MAX,
//                 vibrationPattern: [0, 250, 250, 250],
//                 lightColor: "#FF231F7C",
//             })
//         }
//         return token
//     }

//     useEffect(() => {
//         if (!user || !user.id) return
//         if (user.pushNotificationToken) return
//         registerForPushNotificationsAsync()
//             .then(
//                 (token) => {
//                     updateUser(
//                         {
//                             id: user.id,
//                             pushNotificationToken: token,
//                         },
//                         {
//                             onSuccess: (response) => setUser(response.data.updateUser)
//                         }
//                     )
//                 }
//             )
//             .catch(
//                 (e) => {
//                     console.log(e,  ' error')
//                 }
//             )
        
//         // This listener is fired whenever a notification is received while the app is foregrounded
//         notificationListener.current = Notifications.addNotificationReceivedListener((notification) => setNotification(notification))
  
//         return () => {
//             Notifications.removeNotificationSubscription(notificationListener)
//             Notifications.removeNotificationSubscription(responseListener)
//         }
//     }, [])
// }

// export default RegisterPushNotification
