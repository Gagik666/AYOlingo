import React from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import { useContent } from '../../core/hooks'
import Wrapper from '../../components/Wrapper'
import Loader from '../../components/Loader'
import Card from './Card'
import { useTranslation } from '../../core/contexts/TranslationContext'

const Module = ({navigation}) => {
    const { t } = useTranslation()
    const { content: { modules }, loading } = useContent()

    return (
        <Wrapper>
            {(loading.module || loading.exercise) && (
                <Loader />
            )}
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {t('Modules')}
                    </Text>
                </View>
                <ScrollView
                    style={{paddingTop: 50}}
                    showsVerticalScrollIndicator={false}>
                    {modules?.items.map(
                        (module, index) => (
                            <Card
                                key={`module-${module.id}`}
                                isFirst={index === 0}
                                isLast={index + 1 === modules.items.length}
                                onPress={() => navigation.navigate('Lessons', {module: module})}
                                data={module}
                            />
                        )
                    )}
                </ScrollView>
            </View>
        </Wrapper>
    )
}

export default Module

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
    },
    title: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})
