import React, { useCallback, useMemo } from 'react'
import { TouchableWithoutFeedback, View, StyleSheet, Text, Image } from 'react-native'
import { COLORS } from '../../core/constants'
import { S3_BUCKET } from '../../core/constants'
import { useTranslation } from '../../core/contexts/TranslationContext'
import { useContent } from '../../core/hooks'
import Percent from './Percent'

const Card = ({
    isLast,
    data,
    isFirst,
    onPress
}) => {
    const { t } = useTranslation()
    const { content: { exercises } } = useContent()

    const lessonsCount = useMemo(
        () => exercises?.items?.find(exercise => exercise.module === data.id)?.lessons?.length || 0,
        [exercises]
    )

    const onCardPress = useCallback(
        () => {
            if (!exercises?.items?.find(exercise => exercise.module === data.id)) return
            onPress()
        },
        [exercises]
    )

    return (
        <TouchableWithoutFeedback
            onPress={onCardPress}>
            <View style={{...styles.wrapper, marginBottom: isLast ? 90 : 20, marginTop: isFirst ? 15 : 0}}>
                <View style={styles.container}>
                    <Image
                        source={{
                            uri: S3_BUCKET + data.image,
                            cache: 'force-cache',
                        }}
                        style={styles.image}/>
                    <Percent module={data} />
                </View>
                <View style={styles.title}>
                    <Text style={styles.name}>
                        {data.name}
                    </Text>
                    <View style={styles.lesson}>
                        <Text style={styles.lessonText}>
                            {lessonsCount}
                        </Text>
                        <Text style={{ fontSize: 10, color: COLORS.purple, marginTop: -7 }}>
                            {t('lessons')}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Card

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        height: 150,
        width: '100%',
        alignItems: 'center',
    },
    container: {
        height: '100%',
        width: '100%',
        position: 'relative',
        backgroundColor: '#4D7DFF',
        overflow: 'hidden',
        borderRadius: 45,
        borderWidth: 2,
        borderColor: '#fff',
    },
    image: {
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    title: {
        position: 'absolute',
        top: -5,
        zIndex: 10,
        paddingVertical: 5,
        backgroundColor: COLORS.purple,
        width: "85%",
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 24,
    },
    lesson: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 100,
        minHeight: 50,
        minWidth: 50,
    },
    lessonText: {
        color: COLORS.purple,
        fontSize: 24,
        marginTop: -8,
        padding: 0,
        fontWeight: "500",
    },
})