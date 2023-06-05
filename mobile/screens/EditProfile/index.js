import React, { useState, useCallback, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import Wrapper from '../../components/TitleWrapper'
import FileUpload from '../../components/FileUpload'
import DeleteAccount from './DeleteAccount';
import { Button, Modal } from '../../components/theme'
import { useUser, useUpdateUser } from '../../core/hooks'
import { S3_BUCKET } from '../../core/constants'
import { COLORS } from '../../core/constants'
import { useTranslation } from '../../core/contexts/TranslationContext';

const EditProfile = ({navigation}) => {
    const { mutate: updateUser, isLoading } = useUpdateUser()
    const { t } = useTranslation()
    const { user, setUser } = useUser()
    const [processing, setProcessing] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [errors, setErrors] = useState({})
    const [data, setData] = useState({...user})

    const onSubmit = useCallback(
        () => {

            updateUser(
                {
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    avatar: data.avatar,
                },
                {
                    onSuccess: (response) => {
                        setModalVisible(true)
                        setUser(response.data.updateUser)
                        setTimeout(() => {
                            setModalVisible(false)
                            navigation.goBack()
                        }, 1400)
                    },
                    onError: (e) => {
                        setErrors({message: e.message})
                    }
                }
            )
        },
        [data, setErrors]
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])
  
    return (
        <Wrapper
            title={t('Edit profile')}
            navigation={navigation}>
            <ScrollView style={{paddingTop: 20}}>
                {modalVisible && (
                    <Modal
                        success={true}
                        text={t('Updated successfully')} />
                )}
                <FileUpload
                    existingImage={data.avatar ? S3_BUCKET + data.avatar : null}
                    setProcessing={setProcessing}
                    onUpload={key => setData(data => ({...data, avatar: key}))} />
                <View style={{ backgroundColor: '#84b1ff',  width: '100%', alignItems: 'center', marginTop: 30, marginBottom: 15 }}>
                    <View style={styles.white}>
                        <Text style={{fontWeight: '500'}}>
                            {user.email}
                        </Text>
                    </View>
                </View>
                <View style={{...styles.inputWrapper, borderTopRightRadius: 25, borderTopLeftRadius: 25}}>
                    <TextInput
                        onChangeText={(text) => setData(data => ({...data, firstName: text}))}
                        value={data.firstName}
                        style={{...styles.input, zIndex: 2}}/>
                    {!data.firstName && (
                        <Text style={{...styles.text, color: COLORS[errors.firstName ? 'red' : 'blue']}}>
                            {errors.firstName ? errors.firstName : t('First Name')}
                        </Text>
                    )}
                </View>
                <View style={{...styles.inputWrapper, borderBottomRightRadius: 25, borderBottomLeftRadius: 25}}>
                    <TextInput
                        onChangeText={(text) => setData(data => ({...data, lastName: text}))}
                        value={data.lastName}
                        style={{...styles.input, zIndex: 2}}/>
                    {!data.lastName && (
                        <Text style={{...styles.text, color: COLORS[errors.lastName ? 'red' : 'blue']}}>
                            {errors.lastName ? errors.lastName : t('Last Name')}
                        </Text>
                    )}
                </View>

                <View style={{...styles.inputWrapper, marginTop: 15, borderTopRightRadius: 25, borderTopLeftRadius: 25}}>
                    <TextInput
                        onChangeText={(text) => setData(data => ({...data, zipCode: text}))}
                        value={data.zipCode}
                        style={{...styles.input, zIndex: 2}}/>
                    {!data.zipCode && (
                        <Text style={{...styles.text, color: COLORS[errors.zipCode ? 'red' : 'blue']}}>
                            {errors.zipCode ? errors.zipCode : t('Zip Code')}
                        </Text>
                    )}
                </View>
                <View style={{...styles.inputWrapper}}>
                    <TextInput
                        onChangeText={(text) => setData(data => ({...data, country: text}))}
                        value={data.country}
                        style={{...styles.input, zIndex: 2}}/>
                    {!data.country && (
                        <Text style={{...styles.text, color: COLORS[errors.country ? 'red' : 'blue']}}>
                            {errors.country ? errors.country : t('Country')}
                        </Text>
                    )}
                </View>
                <View style={{...styles.inputWrapper, borderBottomRightRadius: 25, borderBottomLeftRadius: 25}}>
                    <TextInput
                        onChangeText={(text) => setData(data => ({...data, state: text}))}
                        value={data.state}
                        style={{...styles.input, zIndex: 2}}/>
                    {!data.state && (
                        <Text style={{...styles.text, color: COLORS[errors.state ? 'red' : 'blue']}}>
                            {errors.state ? errors.state : t('State')}
                        </Text>
                    )}
                </View>
                {errors.message && (
                    <Text style={{fontSize: 16, color: COLORS.red, marginTop: 10}}>{errors.message}</Text>
                )}
                <Button
                    style={{marginTop: 40}}
                    height={50}
                    width="100%"
                    isLoading={isLoading || processing}
                    onPress={onSubmit}>
                    {t('Submit')}
                </Button>
                <DeleteAccount navigation={navigation} />
            </ScrollView>
        </Wrapper>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    text: {
        position: 'absolute',
        color: COLORS.blue,
        fontSize: 18,
        zIndex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
    },
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 40,
    },
    name: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 20.
    },
    infoText: {
        color: '#ffffff',
        fontSize: 16,
    },
    white: {
        position: 'relative',
        backgroundColor: '#ffffff',
        height: 40,
        width: '100%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    placeholder: {
        position: 'absolute',
        color: COLORS.blue,
        fontSize: 18,
        zIndex: 1,
    },
    inputWrapper: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    input: {
        height: 50,
        width: '100%',
        paddingHorizontal: 15,
        textAlign: 'center'
    }
})
