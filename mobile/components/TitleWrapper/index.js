import React from 'react'
import { SvgXml } from 'react-native-svg'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import * as icons from '../../assets/icons'
import Wrapper from '../Wrapper'

const TitleWrapper = ({navigation, title, children}) => (
    <Wrapper>
        <TouchableOpacity
            style={{marginTop: 5, marginLeft: 20}}
            onPress={() => navigation.goBack()}>
            <SvgXml
                height={30}
                width={30}
                xml={icons.close} />
        </TouchableOpacity>
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>
            {children}
        </View>
    </Wrapper>
)

export default TitleWrapper

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
})
