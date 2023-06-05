import React, { useCallback, useState } from 'react'
import { useLayoutEffect } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { Button } from '../../components/theme'
import Wrapper from '../../components/TitleWrapper'
import FileUpload from '../../components/FileUpload'
import { IsJsonString } from '../../core/helpers'
import { useSignUp, useCreateUser, useCreateProgress } from '../../core/hooks'
import { COLORS } from '../../core/constants'
import {
    ACCOUNT_WITH_EMAIL_ALREADY_EXISTS,
    PASSWORD_PARAMETERS,
} from '../../core/constants'
import { useTranslation } from '../../core/contexts/TranslationContext'

const EMPTY_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm_password: ''
}

const EMPTY_ERRORS_STATE = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirm_password: null
}

const Register = ({navigation}) => {
    const { signUp, isLoading: signUpLoading } = useSignUp()
    const { createUser, isLoading: createUserLoading } = useCreateUser()
    const { createProgress } = useCreateProgress()
    const [errors, setErrors] = useState(EMPTY_ERRORS_STATE)
    const [data, setData] = useState(EMPTY_STATE)
    const { t } = useTranslation()

    const onSubmit = useCallback(
        () => {
            signUp(
                {
                    ...data,
                    email: data.email.toLowerCase(),
                },
                {
                    onSuccess: (response) => {
                        const createdAt = new Date().toISOString()
                        const input = {
                            id: response.userSub,
                            avatar: data.avatar,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email.toLowerCase(),
                            type: 'User',
                            createdAt,
                            updatedAt: createdAt,
                        }
                        createUser(
                            input,
                            {
                                onSuccess: (response) => {
                                    createProgress({id: response.data.createUser.id})
                                    navigation.navigate('Verification', {
                                        email: data.email,
                                        password: data.password,
                                        loginOnVerify: true,
                                        user: response.data.createUser
                                    })
                                }
                            },
                        )
                    },
                    onError: (e) => {
                        let message = e.message
                        const failedValidations = IsJsonString(e.message) ? JSON.parse(e.message) : null
                        if (failedValidations) {
                            return setErrors(failedValidations)
                        }
                        if (e.message.includes('An account with the given email already exists.')) {
                            message = ACCOUNT_WITH_EMAIL_ALREADY_EXISTS
                        }
                        if (e.message.includes('password') || e.code === 'InvalidParameterException') {
                            message = PASSWORD_PARAMETERS
                        }
                        setErrors(errors => ({...errors, message}))
                    },
                },
            )
        },
        [data, setErrors]
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])
    console.log('errors', errors)
    return (
        <Wrapper
            navigation={navigation}
            title={t('Register')}>
            <FileUpload onUpload={key => setData(data => ({...data, avatar: key}))} />
            <View style={{width: '100%', height: 50, alignItems: 'center', position: 'relative', justifyContent: 'center', borderTopRightRadius: 25, borderTopLeftRadius: 25, backgroundColor: '#ffffff', marginTop: 30}}>
                <TextInput
                    textAlign="center"
                    returnKeyType="done"
                    onChangeText={(text) => setData(data => ({...data, firstName: text}))}
                    value={data.firstName}
                    style={{...styles.input, zIndex: 2}}/>
                {!data.firstName && (
                    <Text style={{...styles.text, color: COLORS[errors.firstName ? 'red' : 'blue']}}>
                        {errors.firstName ? t(errors.firstName) : t('First Name')}
                    </Text>
                )}
            </View>
            <View style={{width: '100%', height: 50, alignItems: 'center', position: 'relative', justifyContent: 'center', backgroundColor: '#ffffff'}}>
                <TextInput
                    textAlign="center"
                    returnKeyType="done"
                    onChangeText={(text) => setData(data => ({...data, lastName: text}))}
                    value={data.lastName}
                    style={{...styles.input, zIndex: 2}}/>
                {!data.lastName && (
                    <Text style={{...styles.text, color: COLORS[errors.lastName ? 'red' : 'blue']}}>
                        {errors.lastName ? t(errors.lastName) : t('Last Name')}
                    </Text>
                )}
            </View>
            <View style={{width: '100%', height: 50, alignItems: 'center', position: 'relative', justifyContent: 'center', backgroundColor: '#ffffff', borderBottomRightRadius: 25, borderBottomLeftRadius: 25}}>
                <TextInput
                    textAlign="center"
                    returnKeyType="done"
                    keyboardType="email-address"
                    onChangeText={(text) => setData(data => ({...data, email: text}))}
                    value={data.email}
                    style={{...styles.input, zIndex: 2}}/>
                {!data.email && !errors.email && (
                    <Text style={{...styles.text, color: COLORS.blue}}>
                        {t('Email address')}
                    </Text>
                )}
            </View>
            {errors.email && (
                <Text style={{fontSize: 16, marginTop: 7, color: COLORS.red}}>
                    {t(errors.email)}
                </Text>
            )}
            <View style={{width: '100%', height: 50, alignItems: 'center', position: 'relative', justifyContent: 'center', borderTopRightRadius: 25, borderTopLeftRadius: 25, backgroundColor: '#ffffff', marginTop: 15}}>
                <TextInput
                    textAlign="center"
                    returnKeyType="done"
                    secureTextEntry={true}
                    onChangeText={(text) => setData(data => ({...data, password: text}))}
                    value={data.password}
                    style={{...styles.input, zIndex: 2}}/>
                {!data.password && (
                    <Text style={{...styles.text, color: COLORS[errors.password ? 'red' : 'blue']}}>
                        {errors.password ? t(errors.password) : t('Password')}
                    </Text>
                )}
            </View>
            <View style={{width: '100%', height: 50, alignItems: 'center', position: 'relative', justifyContent: 'center', backgroundColor: '#ffffff', borderBottomRightRadius: 25, borderBottomLeftRadius: 25}}>
                <TextInput
                    textAlign="center"
                    returnKeyType="done"
                    secureTextEntry={true}
                    onChangeText={(text) => setData(data => ({...data, confirm_password: text}))}
                    value={data.confirm_password}
                    style={{...styles.input, zIndex: 2}}/>
                {!data.confirm_password && (
                    <Text style={{...styles.text, color: COLORS[errors.confirm_password ? 'red' : 'blue']}}>
                        {errors.confirm_password ? t(errors.confirm_password) : t('Confirm Password')}
                    </Text>
                )}
            </View>
            {(errors.passwords_dont_match || errors.message) && (
                <Text style={{...styles.text, color: COLORS.red, position: 'inherit', marginTop: 10}}>
                    {errors.passwords_dont_match ? t(errors.passwords_dont_match) : t(errors.message)}
                </Text>
            )}
            <Button
                style={{marginTop: 40}}
                height={50}
                width="100%"
                isLoading={signUpLoading || createUserLoading}
                onPress={onSubmit}>
                {t('Register')}
            </Button>
        </Wrapper>
    )
}

export default Register

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: '100%',
        paddingHorizontal: 15,
    },
    text: {
        position: 'absolute',
        color: COLORS.blue,
        fontSize: 18,
        zIndex: 1,
    }
})
