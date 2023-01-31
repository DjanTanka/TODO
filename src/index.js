import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App.tsx';
import StoreProvider from './context/store';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<StoreProvider>
				<App />
			</StoreProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);
