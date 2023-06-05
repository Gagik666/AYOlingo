import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Amplify from 'aws-amplify'
import { UserProvider, RouterProvider, ModuleProvider, LanguageGroupsProvider } from '../../../core/providers'
import Routes from '../Routes'
import ChakraTheme from '../../../styles/customTheme'
import awsConfig from '../../../aws-exports'


Amplify.configure({
    Auth: {
        identityPoolId: awsConfig.aws_cognito_identity_pool_id,
        region: awsConfig.aws_project_region,
        userPoolId: awsConfig.aws_user_pools_id,
        userPoolWebClientId: awsConfig.aws_user_pools_web_client_id,
        "oauth": {
            "identityPoolId": awsConfig.aws_cognito_identity_pool_id,
        },
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

const queryClient = new QueryClient()

function App () {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={ChakraTheme}>
                <Router>
                    <LanguageGroupsProvider>
                        <UserProvider>
                            <RouterProvider>
                                <ModuleProvider>
                                    <Routes/>
                                </ModuleProvider>
                            </RouterProvider>
                        </UserProvider>
                    </LanguageGroupsProvider>
                </Router>
            </ChakraProvider>
        </QueryClientProvider>
    )
}

export default App
