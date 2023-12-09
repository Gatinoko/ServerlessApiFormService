'use client';

import { Button, Input } from '@nextui-org/react';
import { deleteKeyAction } from './_actions/delete-key-action';
import { useRouter } from 'next/navigation';
import { Error } from '@/types/action-types';
import { regenerateKeyAction } from './_actions/regenerate-key-action';

export type KeyListItemProps = {
	keyAlias: string;
	keyId: string;
	userId: string;
};

export default function KeyListItem({
	keyAlias,
	keyId,
	userId,
}: KeyListItemProps) {
	// Router
	const router = useRouter();

	// Delete key button handler function
	async function deleteKeyButtonHandler() {
		const serverResponse = await deleteKeyAction(userId, keyId);
		if (!('id' in serverResponse)) {
			// setErrorMessage(serverResponse.message)
			console.log('error');
		} else {
			// setErrorMessage('‎ ');
			router.refresh();
		}
	}

	// Regenerate key button handler function
	async function regenerateKeyValueButtonHandler() {
		const serverResponse = await regenerateKeyAction(userId, keyId);
		if (!('id' in serverResponse)) {
			// setErrorMessage(serverResponse.message)
			console.log('error');
		} else {
			// setErrorMessage('‎ ');
			router.refresh();
		}
	}

	return (
		<li className='flex w-full items-center gap-2'>
			<Input
				label='Key Alias'
				value={keyAlias}
				isReadOnly={true}
			/>
			<Input
				label='Key id'
				value={keyId}
				isReadOnly={true}
			/>

			{/* Delete key button */}
			<Button
				color='danger'
				onClick={deleteKeyButtonHandler}>
				Delete
			</Button>

			{/* Regenerate key button */}
			<Button
				color='primary'
				onClick={regenerateKeyValueButtonHandler}>
				Regenerate
			</Button>
		</li>
	);
}
