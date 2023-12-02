'use client';

import { Button, Input } from '@nextui-org/react';

export type KeyListItemProps = {
	alias: string;
	id: string;
};

export default function KeyListItem({ alias, id }: KeyListItemProps) {
	return (
		<li className='flex w-full items-center gap-2'>
			<Input
				label='Key Alias'
				value={alias}
				isReadOnly={true}
			/>
			<Input
				label='Key id'
				value={id}
				isReadOnly={true}
			/>
			<Button
				color='danger'
				isDisabled={true}>
				Delete
			</Button>
			<Button
				color='primary'
				isDisabled={true}>
				Regenerate
			</Button>
		</li>
	);
}
