import React, { useEffect, useMemo, useState } from 'react'
import { SvgXml } from 'react-native-svg'
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    View,
} from 'react-native'
import { useContent } from '../../../core/hooks'
import { usePlayAudio, useCacheAudios } from '../../../core/helpers'
import * as icons from '../../../assets/icons'

export default function Card ({
    data,
    languageOrder
}) {
    const { cacheAudios } = useCacheAudios(null, false)
    const [audio, setAudio] = useState(null)
    const { playAudio } = usePlayAudio()
    const { content: { languageGroup } } = useContent()

    const transliterations = useMemo(
        () => {
            const first = data[languageOrder[0] === languageGroup.from ? 'transliterationFrom' : 'transliterationTo']
            const second = data[languageOrder[0] === languageGroup.from ? 'transliterationTo' : 'transliterationFrom']

            return {
                0: first ? `(${first})` : '',
                1: second ? `(${second})` : '',
            }
        },
        [data, languageOrder]
    )

    const onAudioPlay = () => {
        if (audio) {
            playAudio(audio[data.audioFrom || data.audioTo])
        }
    }

    useEffect(() => {
        ;(async () => {
            const cacheAudioResult = await cacheAudios([data.audioFrom || data.audioTo])
            setAudio(cacheAudioResult)
        })()
    }, [])

    return (
        <View
            key={`vocabulary-${data.id}`}
            style={styles.vocabularyItem}>
            <TouchableOpacity
                style={{marginRight: 15}}
                onPress={onAudioPlay}>
                <SvgXml
                    xml={icons.speaker}
                    width={30}
                    height={30} />
            </TouchableOpacity>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <Text style={styles.vocabFirstItem}>
                    {data[languageOrder[0] === languageGroup.from ? 'valueFrom' : 'valueTo']} {transliterations[0]}
                </Text>
                <Text style={styles.vocabSecondItem}>
                    - {data[languageOrder[0] === languageGroup.from ? 'valueTo' : 'valueFrom']} {transliterations[1]}
                </Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    vocabularyItem: {
        marginTop: 12,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    vocabFirstItem: {
        fontSize: 17,
        fontWeight: '500',
        color: 'white',
    },
    vocabSecondItem: {
        fontSize: 17,
        color: 'white'
    }
})