import React from 'react';
import ReactDOM from 'react-dom/client';
import { ContextProvider } from './Context';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
        <ContextProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </ContextProvider>
    </QueryClientProvider>
);
