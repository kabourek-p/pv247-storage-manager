'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren } from 'react';

import { LoggedInUserProvider } from '@/context/logged-in-user';

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => (
	<LoggedInUserProvider>
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	</LoggedInUserProvider>
);
