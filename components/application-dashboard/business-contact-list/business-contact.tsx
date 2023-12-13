'use client';

import { Checkbox, Input, Textarea } from '@nextui-org/react';

export type FormItemProps = {
	id: string;
	name: string;
	contactInfo: string;
};

export default function BusinessContactItem({
	id,
	name,
	contactInfo,
}: FormItemProps) {
	return (
		<li className='flex gap-2 bg-primary-200 p-4 rounded-3xl w-full'>
			{/* Checkbox for item selection */}
			<Checkbox value={id} />

			<div className='flex flex-col gap-2 w-full'>
				{/* Name */}
				<Input
					key='name'
					type='text'
					label='Name'
					name='name'
					value={name}
					isReadOnly={true}
				/>

				{/* Textarea for contact information */}
				<Textarea
					label='Contact Information'
					value={contactInfo}
				/>
			</div>
		</li>
	);
}
