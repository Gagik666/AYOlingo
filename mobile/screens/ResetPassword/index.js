import React, { useCallback, useState } from 'react'
import { useLayoutEffect } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { Button } from '../../components/theme'
import Wrapper from '../../components/TitleWrapper'
import { useForgotPasswordSubmit } from '../../core/hooks'
import { COLORS } from '../../core/constants'
import { useTranslation } from '../../core/contexts/TranslationContext'

const EMPTY_STATE = {
    code: '',
    password: ''
}

const ResetPassword = ({navigation, route}) => {
    const { t } = useTranslation()
    const { resetPassword, isLoading } = useForgotPasswordSubmit()
    const [error, setError] = useState()
    const [data, setData] = useState(EMPTY_STATE)

    const onSubmit = useCallback(
        () => {
            resetPassword(
                {
                    ...data,
                    email: route.params.email
                },
                {
                    onSuccess: () => {
                        navigation.popToTop()
                    },
                    onError: (e) => setError(e.message)
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
            title={t('Reset Password')}>
            <View style={{width: '100%', height: 50, alignItems: 'center', position: 'relative', justifyContent: 'center', borderTopRightRadius: 25, borderTopLeftRadius: 25, backgroundColor: '#ffffff', marginTop: 30}}>
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
            <View style={{width: '100%', height: 50, alignItems: 'center', position: 'relative', justifyContent: 'center', backgroundColor: '#ffffff', borderBottomRightRadius: 25, borderBottomLeftRadius: 25}}>
                <TextInput
                    textAlign="center"
                    secureTextEntry={true}
                    onChangeText={(text) => setData(data => ({...data, password: text}))}
                    value={data.password}
                    style={{...styles.input, zIndex: 2}}/>
                {!data.password && (
                    <Text style={{position: 'absolute', color: COLORS.blue, fontSize: 18, zIndex: 1}}>
                        {t('Password')}
                    </Text>
                )}
            </View>
            {error && <Text style={{fontSize: 18, color: COLORS.red, marginTop: 10}}>{error}</Text>}
            <Button
                style={{marginTop: 50}}
                height={50}
                width="100%"
                isLoading={isLoading}
                onPress={onSubmit}>
                {t('Reset')}
            </Button>
        </Wrapper>
    )
}

export default ResetPassword

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: '100%',
        paddingHorizontal: 15,
    }
})
