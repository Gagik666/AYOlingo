import React, { useMemo } from 'react'
import { SvgXml } from 'react-native-svg'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native'
import Wrapper from '../../components/Wrapper'
import * as icons from '../../assets/icons'
import { Button } from '../../components/theme'
import { useTranslation } from '../../core/contexts/TranslationContext'

const windowWidth = Dimensions.get('window').width

const LessonWrapper = ({
    children,
    onPress,
    title,
    buttonText,
    progress: p = 0,
    navigation
}) => {
    const { t } = useTranslation()

    const progress = useMemo(
        () => {
            return (windowWidth - 52) * p / 100
        },
        [p]
    )

    return (
        <Wrapper>
            <TouchableOpacity style={{marginLeft: 20}} onPress={() => navigation.goBack()}>
                <SvgXml height={30} width={30} xml={icons.close}/>
            </TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <View style={{width: '100%', alignItems: 'center'}}>
                    {children}
                </View>
                <Button
                    onPress={onPress}
                    style={{width: 250}}>
                    {buttonText || t('Check')}
                </Button>
            </View>
            <View style={styles.progress}>
                <View style={{...styles.catFace, left: progress}}>
                    <View style={{ position: 'relative', alignItems: 'center' }}>
                        <SvgXml width="50" height="50" xml={icons.catFace}/>
                        <Text style={{ color: '#ffffff', position: 'absolute', bottom: -20 }}>
                            {p}%
                        </Text>
                    </View>
                </View>
                <View style={styles.line}/>
            </View>
        </Wrapper>
    )
}

export default LessonWrapper

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 30,
    },
    line: {
        width: '100%',
        height: 2,
        backgroundColor: '#ffffff'
    },
    progress: {
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 80,
        position: 'relative',
    },
    catFace: {
        position: 'absolute',
    }
})
