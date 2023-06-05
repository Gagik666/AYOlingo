import React, { useCallback, useState } from 'react'
import { useLayoutEffect } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { Button } from '../../components/theme'
import Wrapper from '../../components/TitleWrapper'
import { useConfirmCode, useResendConfirmCode, useSignIn, useUser } from '../../core/hooks'
import { COLORS, VERIFICATION_CODE_IS_REQUIRED } from '../../core/constants'
import { useTranslation } from '../../core/contexts/TranslationContext'

const EMPTY_STATE = {
    code: '',
    email: '',
}

const Verification = ({navigation, route}) => {
    const { t } = useTranslation()
    const { confirmCode, isLoading: isConfirmLoading } = useConfirmCode()
    const { resendConfirmCode, isLoading: isResendLoading } = useResendConfirmCode()
    const { signIn, isLoading: isSignInLoading } = useSignIn()
    const { setUser } = useUser()
    const [errors, setErrors] = useState({...EMPTY_STATE, email: route.params.email})
    const [data, setData] = useState({...EMPTY_STATE, email: route.params.email})

    const onResend = useCallback(
        () => {
            if (isConfirmLoading || isResendLoading) return
            resendConfirmCode({email: route.params.email})
        },
        [isConfirmLoading, isResendLoading, route]
    )

    const onSubmit = useCallback(
        () => {
            let isValid = true
            const newErrors = {...EMPTY_STATE}
            if (!data.code) {
                newErrors.code = VERIFICATION_CODE_IS_REQUIRED
                isValid = false
            }
            if (!isValid) return setErrors(newErrors)
            confirmCode(
                data,
                {
                    onSuccess: () => {
                        if (route.params.loginOnVerify) {
                            return signIn(
                                {
                                    email: route.params.email,
                                    password: route.params.password,
                                },
                                {
                                    onSuccess: () => {
                                        navigation.popToTop()
                                        setUser(route.params.user)
                                    }
                                }
                            )
                        }
                        navigation.popToTop()
                    },
                    onError: (e) => {
                        console.log(e.message, ' error verify code')
                        setErrors({message: e.message})
                    }
                }
            )
        },
        [data, setErrors]
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <Wrapper
            navigation={navigation}
            title={t('Verification')}>
            <View style={{width: '100%', height: 50, alignItems: 'center', position: 'relative', justifyContent: 'center', borderRadius: 25, backgroundColor: '#ffffff', marginTop: 30}}>
                <TextInput
                    textAlign="center"
                    keyboardType="number-pad"
                    onChangeText={(text) => setData(data => ({...data, code: text}))}
                    value={data.code}
                    style={{...styles.input, zIndex: 2}}/>
                {!data.code && (
                    <Text style={{position: 'absolute', color: COLORS.blue, fontSize: 18, zIndex: 1}}>
                        {t('Code')}
                    </Text>
                )}
            </View>
            {route.params.sendAgain && (
                <TouchableOpacity onPress={onResend}>
                    <Text style={{textDecorationLine: 'underline', color: '#ffffff', fontWeight: '600', marginTop: 10}}>
                        {t('Resend')}
                    </Text>
                </TouchableOpacity>
            )}
            {errors.message && (
                <Text style={{color: COLORS.red, marginTop: 5}}>{errors.message ? errors.message : ''}</Text>
            )}
            <Button
                height={50}
                style={{marginTop: 30}}
                width="100%"
                isLoading={isConfirmLoading || isResendLoading || isSignInLoading}
                onPress={onSubmit}>
                {t('Submit')}
            </Button>
        </Wrapper>
    )
}

export default Verification

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: '100%',
        // backgroundColor: '#ffffff',
        paddingHorizontal: 15,
    }
})
