import React, { useCallback } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { usePlayAudio } from '../../../core/helpers'

export default function AlphabetCard ({
    data
}) {
    const { playAudio } = usePlayAudio()

    const onPress = useCallback(
        (audio) => {
            playAudio(audio)
        },
        [data]
    )

    return (
        <ScrollView
            style={styles.lettersScrollView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.letterWrapper}>
                <View style={{...styles.letterSpacing, minWidth: 35, flexDirection: 'column'}}>
                    <Text style={styles.letterText}>
                        {data.from}
                    </Text>
                    <Text style={{...styles.letterText, marginTop: 10}}>
                        {data.fromInfo}
                    </Text>
                </View>
                <View style={{...styles.letterSpacing, minWidth: 35, flexDirection: 'column'}}>
                    <TouchableOpacity
                        activeOpacity={.6}
                        onPress={() => onPress(data.audio)}>
                        <Text style={styles.letterText}>
                            {data.to}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={.6}
                        onPress={() => onPress(data.audioInfo)}>
                        <Text style={{...styles.letterText, marginTop: 10}}>
                            {data.toInfo}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.letterSpacing}>
                    <Text style={{...styles.letterText, marginRight: 8, minWidth: 30}}>
                        {data.pronunciationLetter}
                    </Text>
                    <Text style={styles.letterText}>
                        {data.pronunciationText}
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    lettersScrollView: {
        paddingHorizontal: 10,
        width: '100%',
        marginTop: 20,
        marginRight: 30
    },
    letterWrapper: {
        width: '100%',
        flexDirection: 'row'
    },
    letterSpacing: {
        marginHorizontal: 15,
        flexDirection: 'row'
    },
    letterText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
})
