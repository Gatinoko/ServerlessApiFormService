'use server';

import KeyListItem from './key-list-item';
import { getUserKeysAction } from './actions/get-user-keys-action';
import { getJwtTokenAction } from '@/auth/actions/get-jwt-token-action';

export default async function UserKeyList({ username }: { username: string }) {
	// Decoded jwt token payload
	const decodedJwtPayload = await getJwtTokenAction();

	// Current user's generated api keys
	const userApiKeys = await getUserKeysAction(decodedJwtPayload.id);

	return (
		<ul className='flex flex-col gap-2 w-full'>
			{userApiKeys &&
				'apiKeys' in userApiKeys &&
				userApiKeys.apiKeys.map((apiKey, index, _array) => (
					<KeyListItem
						key={index}
						keyAlias={apiKey.alias}
						keyId={apiKey.id}
						userId={decodedJwtPayload.id}
					/>
				))}
		</ul>
	);
}
