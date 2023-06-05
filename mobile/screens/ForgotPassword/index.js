import React, { useCallback, useState } from 'react'
import { useLayoutEffect } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import Wrapper from '../../components/TitleWrapper'
import { Button } from '../../components/theme'
import { useForgotPassword } from '../../core/hooks'
import { COLORS } from '../../core/constants'
import { useTranslation } from '../../core/contexts/TranslationContext'

const ForgotPassword = ({navigation}) => {
    const { t } = useTranslation()
    const { forgotPassword, isLoading } = useForgotPassword()
    const [email, setEmail] = useState()
    const [error, setError] = useState()

    const onSubmit = useCallback(
        () => {
            forgotPassword(
                {
                    email,
                },
                {
                    onSuccess: () => {
                        navigation.navigate('ResetPassword', {email})
                        setError()
                    },
                    onError: (e) => setError(e.message)
                }
            )
        },
        [email, setError]
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <Wrapper
            navigation={navigation}
            title={t('Reset Password')}>
            <View style={{width: '100%', height: 50, alignItems: 'center', position: 'relative', justifyContent: 'center', borderRadius: 100, backgroundColor: '#ffffff', marginTop: 30}}>
                <TextInput
                    textAlign="center"
                    keyboardType="email-address"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    style={{...styles.input, zIndex: 2}}/>
                {!email && (
                    <Text style={{position: 'absolute', color: COLORS.blue, fontSize: 18, zIndex: 1}}>
                        {t('Email')}
                    </Text>
                )}
            </View>
            {error && <Text style={{color: COLORS.red, fontSize: 18, marginTop: 10}}>{error}</Text>}
            <Button
                style={{marginTop: 50}}
                height={50}
                width="100%"
                isLoading={isLoading}
                onPress={onSubmit}>
                {t('Send')}
            </Button>
        </Wrapper>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: '100%',
        paddingHorizontal: 15,
    }
})
