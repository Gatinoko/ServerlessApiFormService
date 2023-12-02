'use client';

import AuthContextProvider from '@/context/auth-context';
import { DecodedJwtPayload } from '@/types/action-types';
import { NextUIProvider } from '@nextui-org/react';
import { PropsWithChildren } from 'react';

export type ProvidersProps = {
	decodedJwtPayload: DecodedJwtPayload;
} & PropsWithChildren;

export function Providers({ children, decodedJwtPayload }: ProvidersProps) {
	console.log(decodedJwtPayload);

	return (
		<NextUIProvider>
			<AuthContextProvider
				defaultAuthInformationValue={
					decodedJwtPayload
						? {
								isAuthenticated: true,
								...decodedJwtPayload,
						  }
						: {
								isAuthenticated: false,
						  }
				}>
				{children}
			</AuthContextProvider>
		</NextUIProvider>
	);
}
