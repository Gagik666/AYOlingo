import React, { useCallback, useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native'
import * as Device from 'expo-device'
import { Modal, Button } from '../../../components/theme'
import { useUser, useCreateFeedback } from '../../../core/hooks'
import { FEEDBACK_TYPES, COLORS } from '../../../core/constants'
import { useTranslation } from '../../../core/contexts/TranslationContext'

const { height: windowHeight } = Dimensions.get('window')

export default function ExerciseModal ({
    Header,
    modal,
    module,
    _exercise,
    exerciseIndex,
    lessonIndex,
    onNext = () => {},
    onCancel = () => {},
}) {
    const scrollView = useRef(null)
    const { t } = useTranslation()
    const [formVisible, toggleFormVisible] = useState(false)
    const [feedbackSent, setFeedbackSent] = useState(false)
    const [type, setType] = useState('the_audio_is_incorrect')
    const { user } = useUser()
    const { createFeedback } = useCreateFeedback()

    const onFlagPress = () => toggleFormVisible(formVisible => !formVisible)

    const onSubmit = useCallback(
        () => {
            const data = {
                type,
                user: {
                    id: user.id,
                    email: user.email,
                },
                device: {
                    brand: Device.brand,
                    osVersion: Device.osVersion,
                    modelName: Device.modelName,
                },
                _module: module.id,
                lesson: lessonIndex,
                exercise: exerciseIndex,
                _exercise,
                createdAt: new Date().toISOString(),
            }

            createFeedback(data)
            setFeedbackSent(true)
            setTimeout(() => {
                toggleFormVisible(false)
            }, 0)
        },
        [type, _exercise]
    )

    useEffect(() => {
        scrollView.current?.flashScrollIndicators()
    }, [scrollView, formVisible])

    return (
        <Modal
            Header={Header}
            success={modal.success}
            showFlag={true}
            text={feedbackSent ? t('Feedback sent, thanks') : modal.success ? t('Correct') : t('Your answer is not correct, but don’t worry, you can try again later') + '😊'}
            footerButton={{visible: true, text: t('Next'), onClick: onNext}}
            isFlagClicked={formVisible}
            onFlagPress={onFlagPress}>
            {formVisible && (
                <View style={{marginTop: 40}}>
                    <Text style={styles.heading}>{t('Feedback')}</Text>
                    <ScrollView
                        ref={scrollView}
                        style={styles.optionsWrapper}
                        showsVerticalScrollIndicator={true}
                        indicatorStyle="white">
                        {Object.entries(FEEDBACK_TYPES).map(
                            ([key, value]) => (
                                <Pressable
                                    key={`feedback-type-${key}`}
                                    style={{...styles.optionCover,  backgroundColor: type === key ? COLORS.purple : 'rgba(255, 255, 255, .5)'}}
                                    onPress={() => setType(key)}>
                                    <Text
                                        style={styles.option}>
                                        {t(value)}
                                    </Text>
                                </Pressable>
                            )
                        )}
                    </ScrollView>
                    <View style={styles.buttonWrapper}>
                        <Button
                            style={{width: 250, marginTop: 30}}
                            onPress={onSubmit}>
                            {t('Submit')}
                        </Button>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <Button
                            style={{width: 250, marginTop: 30}}
                            onPress={onFlagPress}>
                            {t('Cancel')}
                        </Button>
                    </View>
                </View>
            )}
        </Modal>
    )
}

const styles = StyleSheet.create({
    heading: {
        color: 'white',
        fontSize: 25,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 15
    },
    optionsWrapper: {
        maxHeight: windowHeight / 2 - 100,
        paddingHorizontal: 10
    },
    optionCover: {
        marginVertical: 13,
        paddingVertical: 8,
        paddingHorizontal: 6,
        borderRadius: 10
    },
    option: {
        color: 'white',
        fontSize: 19,
        textAlign: 'center',
    },
    buttonWrapper: {
        width: '100%',
        alignItems: 'center'
    },
})