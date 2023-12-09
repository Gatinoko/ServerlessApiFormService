'use client';

import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useRef, useState } from 'react';
import { createApplicationAction } from './_actions/create-application-action';

export type CreateApplicationFormProps = {
	apiKeys: {
		id: string;
		alias: string;
		userId: string;
	}[];
	apiKeysInUse: string[];
};

export default function CreateApplicationForm({
	apiKeys,
	apiKeysInUse,
}: CreateApplicationFormProps) {
	// HTML form element reference
	const formElementRef = useRef<HTMLFormElement>(null);

	// Error message
	const [errorMessage, setErrorMessage] = useState<String>('‎ ');

	// Sign up form handler function
	async function createApplicationFormHandler(formData: FormData) {
		console.log(formData.get('apiKey'));
		const serverResponse = await createApplicationAction(formData);
		if (serverResponse) console.log(serverResponse.message);
		else {
			formElementRef.current?.reset();
			setErrorMessage('‎ ');
		}
	}

	return (
		<form
			ref={formElementRef}
			className='flex flex-col gap-4 bg-primary-100 p-6 rounded-3xl'
			action={createApplicationFormHandler}>
			{/* Form title */}
			<h2 className='text-3xl flex w-full'>Create New Application</h2>

			{/* Horizontal spacer */}
			<hr className='border-solid border-primary opacity-50' />

			{/* Input fields */}
			<div className='flex flex-col gap-2'>
				{/* Application name field */}
				<Input
					key='name'
					type='text'
					label='Name'
					name='name'
					isRequired={true}
				/>

				{/* Select element with the current user's created api keys */}
				<Select
					items={apiKeys}
					label='Api Key'
					placeholder='Select an existing api key'
					name='apiKey'
					isRequired={true}>
					{apiKeys &&
						apiKeys.map((apiKey, _index, _array) => (
							<SelectItem
								key={apiKey.id}
								isDisabled={apiKeysInUse.includes(apiKey.id)}>
								{apiKey.id}
							</SelectItem>
						))}
				</Select>
			</div>

			{/* Sign up button */}
			<Button type='submit'>Add application</Button>
		</form>
	);
}
