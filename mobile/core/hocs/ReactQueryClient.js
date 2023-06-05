import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const ReactQueryClient = (Component) => ({
    ...props
}) => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <Component {...props}/>
        </QueryClientProvider>
    )
}

export default ReactQueryClient
