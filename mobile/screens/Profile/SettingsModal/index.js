import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import { useUser, useSignOut, useContent } from '../../../core/hooks'
import { COLORS } from '../../../core/constants'
import { useTranslation } from '../../../core/contexts/TranslationContext'

export default function SettingsModal ({
    modalizeRef,
    navigation,
}) {
    const { signOut } = useSignOut()
    const { setUser } = useUser()
    const { setContent } = useContent()
    const { t } = useTranslation()

    const onEditProfilePress = () => {
        modalizeRef.current.close()
        navigation.navigate('EditProfile')
    }
    const onChangePasswordPress = () => {
        modalizeRef.current.close()
        navigation.navigate('ChangePassword')
    }

    const onLogout = () => {
        modalizeRef.current.close()
        signOut(
            {},
            {
                onSuccess: () => {
                    setUser({})
                    setContent(content => ({...content, progress: {}}))
                },
                onError: (error) => console.log(error, ' signed out error')
            },
        )
    }

    return (
        <Portal>
            <Modalize
                ref={modalizeRef}
                modalHeight={200}
                modalStyle={styles.modal}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={onEditProfilePress}>
                        <Text style={styles.text}>
                            {t('Edit profile')}
                        </Text>
                        <View style={styles.borderWrapper}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={onChangePasswordPress}>
                        <Text style={styles.text}>
                            {t('Change Password')}
                        </Text>
                        <View style={styles.borderWrapper}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={onLogout}>
                        <Text style={styles.text}>
                            {t('Log out')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modalize>
        </Portal>
    )
}

const styles = StyleSheet.create({
    modal: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: COLORS.blue,
        paddingHorizontal: 50,
    },
    modalContent: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    touchable: {
        width: '100%',
        marginBottom: 17
    },
    borderWrapper: {
        borderWidth: 1,
        borderColor: 'white',
        borderStyle: 'dotted',
        width: '100%',
        opacity: .4
    },
    text: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 3,
    },
})
