import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import '@/assets/styles/globals.scss'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})
import {persistor, store} from '@/store/store'
import AuthProvider from '@/providers/auth-provider/AuthProvider'
import { TypeComponentAuthFields } from '@/providers/auth-provider/auth-page.types'


export default function App ({Component, pageProps}:
    AppProps & TypeComponentAuthFields) {
        return <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AuthProvider Component={{isOnlyUser: Component.isOnlyUser}}>
                        <Component {...pageProps} />
                    </AuthProvider>
                </PersistGate>
            </Provider>
        </QueryClientProvider>
    }
