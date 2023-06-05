import React, { useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Host } from 'react-native-portalize'
import { SvgXml } from 'react-native-svg'
import { useUser } from '../core/hooks'
import * as icons from '../assets/icons'
import Login from '../screens/Login'
import Modules from '../screens/Modules'
import Profile from '../screens/Profile'
import Vocabulary from '../screens/Vocabulary'

const { Navigator, Screen } = createBottomTabNavigator()

const INITIAL_ROUTE_NAME = 'Modules'

const screens = [
    { name: 'Modules', component: Modules },
    { name: 'Vocabulary', component: Vocabulary },
    { name: 'Profile', component: Profile },
]

const BottomTabNavigator = ({
    navigation
}) => {
    const { user } = useUser()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    },[])

    if (user && !user.id) {
      return <Login navigation={navigation}/>
    }

    return (
        <Host>
            <Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
            
                        if (route.name === 'Modules') {
                            iconName = focused
                            ? icons.activeEducation
                            : icons.education
                        } else if (route.name === 'Profile') {
                            iconName = focused ? icons.activeProfile : icons.profile;
                        } else if (route.name === 'Vocabulary') {
                            iconName = focused ? icons.activeBook : icons.book;
                        }
                        return <SvgXml width="60" height="60" xml={iconName}/>
                    },
                })}
                tabBarOptions={{
                    style: {
                        height: 100,
                        backgroundColor: '#5384ff',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    showLabel: false,
                }}
                initialRouteName={INITIAL_ROUTE_NAME}>
                    {(screens.map(
                        (screen) => (
                            <Screen
                                key={`bottom-nav-screen-${screen.name}`}
                                name={screen.name}
                                component={screen.component}/>
                        ),
                    ))}
            </Navigator>
        </Host>
    )
}

export default BottomTabNavigator
