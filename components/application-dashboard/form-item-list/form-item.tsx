'use client';

import { Checkbox, Input, Textarea } from '@nextui-org/react';

export type FormItemProps = {
	id: string;
	title: string;
	description: string;
};

export default function FormItem({ id, title, description }: FormItemProps) {
	return (
		<li className='flex gap-2 bg-primary-200 p-6 rounded-3xl w-full'>
			{/* Checkbox for item selection */}
			<Checkbox value={id} />

			<div className='flex flex-col gap-2 w-full'>
				{/* Title */}
				<Input
					key='title'
					type='text'
					label='Title'
					name='title'
					value={title}
					isReadOnly={true}
				/>

				{/* Textarea for description */}
				<Textarea
					label='Description'
					value={description}
					placeholder='Enter your description'
				/>
			</div>
		</li>
	);
}
