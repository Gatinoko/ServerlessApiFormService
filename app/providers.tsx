'use client';

import AuthContextProvider from '@/context/auth-context';
import { NextUIProvider } from '@nextui-org/react';
import { PropsWithChildren } from 'react';

export function Providers({ children }: PropsWithChildren) {
	return (
		<AuthContextProvider>
			<NextUIProvider>{children}</NextUIProvider>
		</AuthContextProvider>
	);
}
