import React, { useCallback, useState } from 'react'
import { useLayoutEffect } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { Modal, Button } from '../../components/theme'
import Wrapper from '../../components/TitleWrapper'
import { useChangePassword } from '../../core/hooks'
import { useTranslation } from '../../core/contexts/TranslationContext'
import { COLORS } from '../../core/constants'

const EMPTY_STATE = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
}

const ChangePassword = ({navigation}) => {
    const { mutate: changePassword, isLoading } = useChangePassword()
    const { t } = useTranslation()
    const [data, setData] = useState(EMPTY_STATE)
    const [error, setError] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    const onSubmit = useCallback(
        () => {
            if (!data.confirmPassword || !data.newPassword || !data.oldPassword) {
                return setError('Credentials cannot be empty')
            }
            setError('');
            changePassword(
                data,
                {
                    onSuccess: () => {
                        setError(null)
                        setModalVisible(true)
                        setTimeout(() => {
                            setModalVisible(false)
                            navigation.goBack()
                        }, 1500)
                    },
                    onError: (e) => {
                        if (e.code === 'NotAuthorizedException') {
                            return setError('Invalid old password')
                        }
                        if (e.code === 'InvalidParameterException') {
                            return setError('Input stronger password')
                        }
                        setError(e.message)
                    }
                }
            )
        },
        [data, setError]
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <Wrapper
            navigation={navigation}
            title={t('Change Password')}>
            {modalVisible && (
                <Modal
                    success={true}
                    text={t('Password changed successfully')} />
            )}
            <View style={{width: '100%', height: 50, alignItems: 'center', position: 'relative', justifyContent: 'center', borderTopRightRadius: 25, borderTopLeftRadius: 25, backgroundColor: '#ffffff', marginTop: 30}}>
                <TextInput
                    textAlign="center"
                    secureTextEntry={true}
                    onChangeText={(text) => setData(data => ({...data, oldPassword: text}))}
                    value={data.oldPassword}
                    style={{...styles.input, zIndex: 2}}/>
                {!data.oldPassword && (
                    <Text style={{position: 'absolute', color: COLORS.blue, fontSize: 18, zIndex: 1}}>
                        {t('Current Password')}
                    </Text>
                )}
            </View>
            <View style={{width: '100%', height: 50, alignItems: 'center', position: 'relative', justifyContent: 'center', backgroundColor: '#ffffff'}}>
                <TextInput
                    textAlign="center"
                    secureTextEntry={true}
                    onChangeText={(text) => setData(data => ({...data, newPassword: text}))}
                    value={data.newPassword}
                    style={{...styles.input, zIndex: 2}}/>
                {!data.newPassword && (
                    <Text style={{position: 'absolute', color: COLORS.blue, fontSize: 18, zIndex: 1}}>
                        {t('New Password')}
                    </Text>
                )}
            </View>
            <View style={{width: '100%', height: 50, alignItems: 'center', position: 'relative', justifyContent: 'center', backgroundColor: '#ffffff', borderBottomRightRadius: 25, borderBottomLeftRadius: 25}}>
                <TextInput
                    textAlign="center"
                    secureTextEntry={true}
                    onChangeText={(text) => setData(data => ({...data, confirmPassword: text}))}
                    value={data.confirmPassword}
                    style={{...styles.input, zIndex: 2}}/>
                {!data.confirmPassword && (
                    <Text style={{position: 'absolute', color: COLORS.blue, fontSize: 18, zIndex: 1}}>
                        {t('Confirm Password')}
                    </Text>
                )}
            </View>
            {typeof error === 'string' && (
                <Text style={{color: COLORS.red, fontSize: 16, marginTop: 10}}>
                    {t(error)}
                </Text>
            )}
            <Button
                height={50}
                width="100%"
                style={{marginTop: 50}}
                isLoading={isLoading}
                onPress={onSubmit}>
                {t('Change')}
            </Button>
        </Wrapper>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: '100%',
        paddingHorizontal: 15,
    }
})
