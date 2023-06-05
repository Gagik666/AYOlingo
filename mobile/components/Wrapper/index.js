import * as React from 'react'
import { StyleSheet, View, useWindowDimensions, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants'

export default function Wrapper({children}) {
    const windowHeight = useWindowDimensions().height
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#96c2ff', '#4d7dff']}
                style={{...styles.background, height: windowHeight}}
            />
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
})
