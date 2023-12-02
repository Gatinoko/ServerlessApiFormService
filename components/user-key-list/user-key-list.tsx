'use server';

import KeyListItem from './key-list-item';
import { getUserKeysAction } from './actions/get-user-keys-action';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { DecodedJwtPayload } from '@/types/action-types';

export default async function UserKeyList({ username }: { username: string }) {
	// Decoded jwt token payload
	const decodedJwtPayload = jwt.decode(
		cookies().get('token')!.value
	) as DecodedJwtPayload;

	// Current user's generated api keys
	const userApiKeys = await getUserKeysAction(decodedJwtPayload.username);

	return (
		<ul className='flex flex-col gap-2 w-full'>
			{!(userApiKeys instanceof Error) &&
				userApiKeys?.apiKeys.map((apiKey, index, array) => (
					<KeyListItem
						key={index}
						alias={apiKey.alias}
						id={apiKey.id}
					/>
				))}
		</ul>
	);
}
