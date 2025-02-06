import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { DeskproAppProvider, LoadingSpinner } from '@deskpro/app-sdk';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/query';
import StoreProvider from '@/context/Store';
import App from './App';
import '@deskpro/deskpro-ui/dist/deskpro-ui.css';
import '@deskpro/deskpro-ui/dist/deskpro-custom-icons.css';
import './main.css';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render((
    <StrictMode>
        <DeskproAppProvider>
            <HashRouter>
                <QueryClientProvider client={queryClient}>
                    <Suspense fallback={<LoadingSpinner />}>
                        <ErrorBoundary fallback={<>here was an error!</>}>
                            <StoreProvider>
                                <App />
                            </StoreProvider>
                        </ErrorBoundary>
                    </Suspense>
                </QueryClientProvider>
            </HashRouter>
        </DeskproAppProvider>
    </StrictMode>
));