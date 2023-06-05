import { StyleSheet, Alert } from 'react-native'
import { useUpdateUser, useUser, useSignOut, useContent } from '../../core/hooks';
import { Button } from '../../components/theme'
import { COLORS } from '../../core/constants'
import { useTranslation } from '../../core/contexts/TranslationContext';

export default function DeleteAccount({ navigation }) {
    const { user, setUser } = useUser();
    const { setContent } = useContent()
    const { mutate: updateUser, isLoading } = useUpdateUser();
    const { signOut } = useSignOut();
    const { t } = useTranslation()

    const onConfirm = () => {
        updateUser(
            {
                id: user.id,
                deletedAt: new Date().toISOString(),
            },
            {
                onSuccess: () => {
                    signOut({}, {
                        onSuccess: () => {
                            navigation.goBack()
                            setUser({})
                            setContent(content => ({...content, progress: {}}))
                        }
                    })
                },
                onError: (e) => console.log('>> Error', e),
            },
        )
    };

    const onDeleteAccount = () => {
        Alert.alert(
            t('Are you sure?'),
            t('You are going to lose your account'),
            [
                {
                    text: t('Cancel'),
                    style: 'cancel'
                },
                {
                    text: t('Confirm'),
                    onPress: onConfirm
                },
            ]
          );
    };

    return (
        <Button
            style={{marginTop: 40}}
            height={50}
            width="100%"
            buttonStyles={styles.button}
            textStyles={styles.buttonText}
            isLoading={isLoading}
            onPress={onDeleteAccount}>
            {t('Delete Account')}
        </Button>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 5,
        backgroundColor: 'transparent',
        color: COLORS.red,
    },
    buttonText: {
        color: COLORS.red,
    },
})

