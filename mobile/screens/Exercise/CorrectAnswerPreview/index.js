import React, { Fragment, useMemo } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SvgXml } from 'react-native-svg'
import * as icons from '../../../assets/icons'
import { useTranslation } from '../../../core/contexts/TranslationContext'

export default function CorrectAnswerPreview ({ modal }) {
    const { t } = useTranslation()

    const correctAnswers = useMemo(
        () => {
            return modal.correctAnswers.filter(correctAnswer => correctAnswer)
        },
        [modal]
    )

    return (
        <ScrollView>
            {!modal.success && (
                <View style={styles.correctAnswerWrapper}>
                    <Text style={styles.correctAnswerHeading}>{t('Correct answer is')}</Text>
                    <SvgXml width="14" height="14" xml={icons.success}/>
                </View>
            )}
            {correctAnswers.map(
                (correctAnswer) => (
                    <Text
                        key={`correct-answer-${correctAnswer}`}
                        style={styles.correctAnswer}>
                        {correctAnswer}
                    </Text>
                )
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    correctAnswerWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    correctAnswerHeading: {
        fontWeight: '500',
        fontSize: 16,
        marginRight: 7
    },
    correctAnswer: {
        marginVertical: 5,
        fontSize: 15
    }
})