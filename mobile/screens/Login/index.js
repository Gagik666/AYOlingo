import React, { useCallback, useState, useLayoutEffect } from 'react'
import { Auth } from 'aws-amplify'
import { Platform, View, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native'
import bcryptjs from 'bcryptjs'
import { ValidateEmail } from '../../core/helpers'
import { useSignIn, useSignUp, useUser, useUsersByEmail, useSignOut } from '../../core/hooks'
import { useTranslation } from '../../core/contexts/TranslationContext'
import { WhiteButton, Button } from '../../components/theme'
import Wrapper from '../../components/Wrapper'
import * as icons from '../../assets/icons'
import { COLORS } from '../../core/constants'

const EMPTY_STATE = {
    email: '',
    password: '',
}

const Login = ({ navigation }) => {
    const { setUser } = useUser()
    const { t } = useTranslation()
    const { usersByEmail, isLoading: usersByEmailLoading } = useUsersByEmail()
    const { signIn, isLoading: signInLoading } = useSignIn()
    const { signUp, isLoading: signUpLoading } = useSignUp()
    const { signOut } = useSignOut();
    const [data, setData] = useState(EMPTY_STATE)
    const [errors, setErrors] = useState(EMPTY_STATE)

    const onConfirm = useCallback(
        () => {
            setData(EMPTY_STATE)
            setErrors(EMPTY_STATE)
            navigation.navigate('Verification', {email: data.email, sendAgain: true})
        },
        [data, setData, setErrors, navigation]
    )

    const onForgot = useCallback(
        () => {
            setData(EMPTY_STATE)
            setErrors(EMPTY_STATE)
            navigation.navigate('ForgotPassword')
        },
        [data, setData, setErrors, navigation]
    )

    const onSubmit = useCallback(
        () => {
            Keyboard.dismiss()
            let isValid = true
            const newErrors = {}

            if (!data.email) {
                newErrors.email = t('Email address is required')
                isValid = false
            }

            if (!data.password) {
                newErrors.password = t('Password is required')
                isValid = false
            }

            if (!ValidateEmail(data.email)) {
                newErrors.email = t('Invalid email address')
                isValid = false
            }
            
            if (!isValid) {
                return setErrors({...newErrors, message: 'Credentials cannot be empty'})
            }
            setErrors({})
            signIn(
                data,
                {
                    onSuccess: () => {
                        usersByEmail(
                            {
                                email: data.email.toLowerCase()
                            },
                            {
                                onSuccess: (response) => {
                                    const user = response.data.usersByEmail.items[0];
                                    if (user.deletedAt) {
                                        Alert.alert(t('Your account is deleted'))
                                        return signOut();
                                    }
                                    setUser(user)
                                },
                                onError: (e) => {
                                    console.log(e, ' error')
                                    setErrors({message: e.message})
                                },
                            }
                        )
                    },
                    onError: (e) => {
                        console.log(e, ' error')
                        if (e.code === 'UserNotFoundException') {
                            return usersByEmail(
                                {
                                    email: data.email
                                },
                                {
                                    onSuccess: (response) => {
                                        console.log('>>> USERS BY EMAIL RESPONSE', response);
                                        const user = response.data.usersByEmail.items[0]
                                        if (!user) {
                                            return setErrors({message: e.message, code: e.code})
                                        }
                                        if (!bcryptjs.compareSync(data.password, user.password)) {
                                            return setErrors({message: t('Invalid password'), code: 'InvalidPassword'})
                                        }

                                        signUp(
                                            {
                                                password: data.password,
                                                email: data.email.toLowerCase(),
                                                validate: false,
                                            },
                                            {
                                                onSuccess: () => {
                                                    navigation.navigate('Verification', {email: data.email, password: data.password, user, loginOnVerify: true})
                                                },
                                                onError: (e) => console.log(e, ' sign up error')
                                            }
                                        )
                                    },
                                    onError: (e) => console.log('>>> USERS BY EMAIL ERROR', e)
                                }
                            )
                        }
                        console.log(e, ' error')
                        setErrors({message: e.message, code: e.code})
                    }
                }
            )
        },
        [data]
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <Wrapper>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {t('Login')}
                </Text>
                <WhiteButton
                    icon={icons.facebook}
                    onPress={() => Auth.federatedSignIn({provider: 'Facebook'})}>
                    {t('Sign in with Facebook')}
                </WhiteButton>
                <WhiteButton
                    icon={icons.google}
                    onPress={() => Auth.federatedSignIn({provider: 'Google'})}>
                    {t('Sign in with Google')}
                </WhiteButton>
                {Platform.OS === 'ios' && (
                    <WhiteButton
                        icon={icons.apple}
                        onPress={() => Auth.federatedSignIn({provider: 'SignInWithApple'})}>
                        {t('Sign in With Apple')}
                    </WhiteButton>
                )}
                <Text style={{marginVertical: 20, color: '#ffffff', fontSize: 18}}>
                    {t('or')}
                </Text>
                <View style={{width: '100%', height: 50, alignItems: 'center', position: 'relative', justifyContent: 'center', backgroundColor: '#ffffff', borderRadius: 100,}}>
                    <TextInput
                        textAlign="center"
                        keyboardType="email-address"
                        onChangeText={(text) => setData(data => ({...data, email: text}))}
                        value={data.email}
                        style={styles.input} />
                    {!data.email && <Text style={{position: 'absolute', color: COLORS.blue, fontSize: 18}}>
                    {t('Email')}
                    </Text>}
                </View>
                {/* {errors.email && <Text style={{color: COLORS.red, marginTop: 5}}>{errors.email ? errors.email : ''}</Text>} */}
                <View style={{width: '100%', height: 50, alignItems: 'center', position: 'relative', justifyContent: 'center', marginTop: 10, marginBottom: 5, backgroundColor: '#ffffff', borderRadius: 100,}}>
                    <TextInput
                        textAlign="center"
                        secureTextEntry={true}
                        onChangeText={(text) => setData(data => ({...data, password: text}))}
                        value={data.password}
                        style={styles.input} />
                    {!data.password && (
                        <Text style={{position: 'absolute', color: COLORS.blue, fontSize: 18, zIndex: 1}}>
                            {t('Password')}
                        </Text>
                    )}
                </View>
                {errors.message && <Text style={{color: COLORS.red, marginBottom: 5}}>{errors.message ? errors.message : ''}</Text>}
                {errors.code === 'UserNotConfirmedException' && (
                    <TouchableOpacity onPress={onConfirm}>
                        <Text style={{textDecorationLine: 'underline', color: '#ffffff', fontWeight: '600', marginBottom: 5}}>
                            {t('Confirm')}
                        </Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={onForgot}>
                    <Text style={{textDecorationLine: 'underline', color: '#ffffff', fontWeight: '600', marginBottom: 30}}>
                        {t('Forgot?')}
                    </Text>
                </TouchableOpacity>
                <Button
                    height={50}
                    width="100%"
                    isLoading={signInLoading || usersByEmailLoading || signUpLoading}
                    onPress={onSubmit}>
                    {t('Login')}
                </Button>
                <Text style={{color: '#ffffff', marginTop: 80}}>
                    {t('Don\'t have an account?')}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{textDecorationLine: 'underline', color: '#ffffff', fontSize: 20, fontWeight: "700"}}>
                        {t('Sign Up')}
                    </Text>
                </TouchableOpacity>
            </View>
        </Wrapper>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 30,
    },
    input: {
        height: 50,
        zIndex: 2,
        width: '100%',
        paddingHorizontal: 15,
    }
})
