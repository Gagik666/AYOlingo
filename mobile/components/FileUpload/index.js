import React, { useEffect, useState } from 'react'
import { View, Image, Platform, Text } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker'
import { useTranslation } from '../../core/contexts/TranslationContext'
import { useUploadFile } from '../../core/hooks'
import * as icons from '../../assets/icons'
import styles from './styles'

const Avatar = ({
    existingImage,
    setProcessing = () => {},
    onUpload = () => {},
}) => {
    const { t } = useTranslation();
    const { upload, isLoading, error } = useUploadFile()
    const [image, setImage] = useState(existingImage)

    const pickImage = async () => {
        if (isLoading) return
        if (Platform.OS !== "web") {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== "granted") {
                return alert("Sorry, we need camera roll permissions to make this work!")
            }
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.6,
        })

        if (!result.cancelled) {
            setProcessing(true)
            setImage(result.uri)
            upload(
                result.uri,
                {
                    onSuccess: (response) => {
                        onUpload(response.key)
                        setProcessing(false)
                    }
                }
            )
        }
    }

    useEffect(() => {
        if (!error) return
        console.log(error, " uploading image error")
    }, [error])

    return (
        <TouchableWithoutFeedback
            style={styles.upload}
            onPress={pickImage}>
            <View style={styles.button}>
                <View style={{position: 'absolute', left: 0, height: 70, width: 70}}>
                    {image ? (
                        <View style={styles.imageWrapper}>
                            <Image
                                source={{
                                    uri: image,
                                    cache: 'force-cache',
                                }}
                                style={styles.image} />
                        </View>
                    ) : (
                        <SvgXml height={70} width={70} xml={icons.catFace}/>
                    )}
                </View>
                <View style={{marginLeft: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <SvgXml
                        xml={icons.upload}
                        width={30}
                        height={30}
                        style={{marginRight: 10}} />
                    <Text style={styles.text}>
                        {t('Upload profile picture')}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Avatar
