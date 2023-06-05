import React, { useRef, useCallback } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SvgXml } from 'react-native-svg'
import Login from '../Login'
import SettingsModal from './SettingsModal'
import Wrapper from '../../components/Wrapper'
import ShareAyoLingo from './ShareAyoLingo'
import { useUser, useContent } from '../../core/hooks'
import { S3_BUCKET, AVATAR } from '../../core/constants'
import * as icons from '../../assets/icons'
import Transliteration from './Transliteration'
import { useTranslation } from '../../core/contexts/TranslationContext'

const Profile = ({navigation}) => {
    const modalizeRef = useRef(null)
    const { content: { languageGroup } } = useContent()
    const { t } = useTranslation()
    const { user } = useUser()
    
    const onLanguageGroupPress = () => navigation.navigate('LanguageGroups')

    const onSettingsPress = useCallback(
        () => {
            console.log('>>> MODALIZE CURRENT', modalizeRef.current);
            modalizeRef.current?.open()
        },
        [modalizeRef]
    )

    if (!user.id) {
        return <Login navigation={navigation} />
    }
  
    return (
        <Wrapper>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{width: 40}}/>
                    <Text style={styles.title}>
                        {t('Profile')}
                    </Text>
                    <TouchableOpacity onPress={onSettingsPress}>
                        <SvgXml width="30" height="30" xml={icons.settings} />
                    </TouchableOpacity>
                </View>
                <Image
                    source={{
                        uri: user.avatar ? S3_BUCKET + user.avatar : AVATAR,
                        cache: 'force-cache',
                    }}
                    style={styles.avatar}/>
                <Text style={styles.name}>
                    {user.firstName} {user.lastName}
                </Text>
            </View>
            <View style={{ backgroundColor: '#84b1ff', paddingHorizontal: 40, width: '100%', alignItems: 'center', paddingVertical: 15 }}>
                <TouchableOpacity
                    style={{width: '100%'}}
                    onPress={onLanguageGroupPress}>
                    <View style={styles.white}>
                        <Text style={{textTransform: 'capitalize'}}>
                            {t(`${languageGroup.from}-${languageGroup.to}`)}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.white}>
                    <Text>
                        {user.email}
                    </Text>
                </View>
                <Transliteration />
                <ShareAyoLingo />
            </View>
            <SettingsModal
                modalizeRef={modalizeRef}
                navigation={navigation} />
        </Wrapper>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#ffffff',
    },
    header: {
        paddingHorizontal: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 100,
        resizeMode: 'cover'
    },
    name: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 20,
        marginTop: 10,
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
    }
})
