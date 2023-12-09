'use server';

import { getJwtTokenAction } from '@/auth/actions/get-jwt-token-action';
import ApplicationItemList from '@/components/application-item-list/application-item-list';
import { getUserKeysInUseAction } from '@/components/create-application-form/_actions/get-user-keys-in-use-action';
import CreateApplicationForm from '@/components/create-application-form/create-application-form';
import { getUserKeysAction } from '@/components/user-key-list/_actions/get-user-keys-action';

export default async function Page({
	params,
}: {
	params: { username: string };
}) {
	// Decoded jwt token payload
	const decodedJwtPayload = await getJwtTokenAction();

	// Current user's generated api keys
	const userApiKeys = await getUserKeysAction(decodedJwtPayload.id);

	// Array of keys already in use by a user's application
	const apiKeysInUse = await getUserKeysInUseAction(decodedJwtPayload.id)!;

	return (
		<main className='flex h-fit gap-4 flex-col justify-between p-24'>
			{/* Page title */}
			<h1 className='text-6xl flex w-full'>Applications</h1>

			{/* Horizontal separator */}
			<hr className='border-solid' />

			{/* Form used for creating applications */}
			{'apiKeys' in userApiKeys && (
				<CreateApplicationForm
					apiKeys={userApiKeys.apiKeys}
					apiKeysInUse={apiKeysInUse as any}
				/>
			)}

			{/* User-created application list */}
			<ApplicationItemList />
		</main>
	);
}
