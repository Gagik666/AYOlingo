import React from 'react'
import * as Notifications from 'expo-notifications'
import { StatusBar, Linking } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import AppLoading from 'expo-app-loading'
import Amplify from 'aws-amplify'
import Navigation from './navigation'
import { useCashedResources } from './core/hooks'
import { TransliterationProvider } from './core/contexts/TransliterationContext';
import { TranslationProvider } from './core/contexts/TranslationContext';
import { AudioPlayerProvider, UserProvider, ContentProvider } from './core/providers'
import { withReactQueryClient } from './core/hocs'
import awsConfig from './aws-exports'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    })
})

const App = () => {
    const data = useCashedResources()

    async function urlOpener(url, redirectUrl) {
        try {
            const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(url, redirectUrl, {
              showTitle: false,
              enableUrlBarHiding: true,
              enableDefaultShare: false,
              ephemeralWebSession: false,
            });
            if (type === 'success') {
              Linking.openURL(newUrl);
            }
        } catch (e) {
            console.log(e, ' error')
        }
    }

    Amplify.configure({
        Auth: {
            identityPoolId: awsConfig.aws_cognito_identity_pool_id,
            region: awsConfig.aws_project_region,
            userPoolId: awsConfig.aws_user_pools_id,
            userPoolWebClientId: awsConfig.aws_user_pools_web_client_id,
            oauth: {
                "domain": "ayolingo014ba8d6-014ba8d6-dev.auth.us-east-1.amazoncognito.com",
                "scope": [
                    "phone",
                    "email",
                    "openid",
                    "profile",
                    "aws.cognito.signin.user.admin"
                ],
                // "redirectSignIn": "exp://hj-z9m.birthrightarmenia.mobile.exp.direct:80/--/",
                // "redirectSignOut": "exp://hj-z9m.birthrightarmenia.mobile.exp.direct:80/--/",
                "redirectSignIn": "ayolingo://",
                "redirectSignOut": "ayolingo://",
                "responseType": "code",
                urlOpener,
            }
        },
        API: {
            aws_appsync_graphqlEndpoint: awsConfig.aws_appsync_graphqlEndpoint,
            aws_appsync_region: awsConfig.aws_project_region,
            aws_appsync_authenticationType: awsConfig.aws_appsync_authenticationType,
            aws_appsync_apiKey: awsConfig.aws_appsync_apiKey,
        },
        Storage: {
            AWSS3: {
                bucket: awsConfig.aws_user_files_s3_bucket,
                region: awsConfig.aws_user_files_s3_bucket_region,
                identityPoolId: awsConfig.aws_cognito_identity_pool_id
            }
        }
    })

    if (!data) {
        return <AppLoading/>
    }

    return (
        <AudioPlayerProvider>
            <ContentProvider data={data.content}>
                <TranslationProvider>
                    <UserProvider user={data.user}>
                        <TransliterationProvider>
                            <Navigation/>
                        </TransliterationProvider>
                    </UserProvider>
                </TranslationProvider>
            </ContentProvider>
            <StatusBar barStyle={'light-content'}/>
        </AudioPlayerProvider>
    )
}

export default withReactQueryClient(App)