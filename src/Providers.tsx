import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MatchBreakpointsProvider, ToastsProvider } from 'contexts'
import { HistoryManagerProvider } from 'contexts/HistoryContext'
import { ModalProvider } from 'widgets/Modal'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import theme from 'theme'
import { Store } from '@reduxjs/toolkit'

// Create a client
const queryClient = new QueryClient()

const Providers: React.FC<
  React.PropsWithChildren<{ store: Store; children: React.ReactNode; dehydratedState: any }>
> = ({ children, store, dehydratedState }) => {
  return (
    // <WagmiProvider reconnectOnMount config={config}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <Provider store={store}>
            <NextThemeProvider>
              <ThemeProvider theme={theme}>
                <MatchBreakpointsProvider>
                  <ToastsProvider>
                    <HistoryManagerProvider>
                      <ModalProvider>{children}</ModalProvider>
                    </HistoryManagerProvider>
                  </ToastsProvider>
                </MatchBreakpointsProvider>
              </ThemeProvider>
            </NextThemeProvider>
          </Provider>
        </HydrationBoundary>
      </QueryClientProvider>
    // </WagmiProvider>
  )
}

export default Providers
