import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useContent } from '../../core/hooks'
import { getModulePercent } from '../../core/helpers'
import { COLORS } from '../../core/constants'

export default function Percent ({
    module,
}) {
    const { content: { progress } } = useContent()
    const percent = progress && progress.modules ? getModulePercent(progress, module) : null

    if (percent === null) {
        return <></>
    }

    return (
        <View style={styles.percent}>
            <Text style={styles.percentText}>
                {percent}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    percent: {
        position: 'absolute',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        bottom: 10,
        height: 45,
        width: 45,
        borderRadius: 100,
    },
    percentText: {
        color: COLORS.purple,
        fontSize: 14,
        margin: 0,
        padding: 0,
        fontWeight: "500",
    }
})

