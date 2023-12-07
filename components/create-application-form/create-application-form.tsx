'use client';

import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useRef, useState } from 'react';
import { createApplicationAction } from './actions/create-application-action';

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
		if (serverResponse) setErrorMessage(serverResponse.message);
		else {
			formElementRef.current?.reset();
			setErrorMessage('‎ ');
		}
	}

	return (
		<form
			ref={formElementRef}
			className='flex flex-col gap-2'
			action={createApplicationFormHandler}>
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

			{/* Form error message */}
			<p className='text-red-500'>{errorMessage}</p>

			{/* Sign up button */}
			<Button type='submit'>Add application</Button>
		</form>
	);
}
