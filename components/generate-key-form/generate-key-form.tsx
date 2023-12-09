'use client';

import { Button, Input } from '@nextui-org/react';
import { generateKeyAction } from './_actions/generate-key-action';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

export default function GenerateKeyForm() {
	// Router
	const router = useRouter();

	// HTML form element reference
	const formElementRef = useRef<HTMLFormElement>(null);

	// Error message
	const [errorMessage, setErrorMessage] = useState<String>('‎ ');

	// Handler for "Generate New Key" button
	async function generateNewKeyButtonHandler(formData: FormData) {
		const serverResponse = await generateKeyAction(formData);
		if (serverResponse) setErrorMessage(serverResponse.message);
		else {
			formElementRef.current?.reset();
			setErrorMessage('‎ ');
			router.refresh();
		}
	}

	return (
		<>
			{/* Generate new key form */}
			<div className='flex flex-col gap-4 bg-primary-100 p-6 rounded-3xl'>
				{/* Form title */}
				<h2 className='text-3xl flex w-full'>Generate New Key</h2>

				{/* Horizontal spacer */}
				<hr className='border-solid border-primary opacity-50' />

				{/* Form */}
				<form
					ref={formElementRef}
					className='flex gap-2 items-center'
					action={generateNewKeyButtonHandler}>
					{/* Key alias text input */}
					<Input
						label='Key Alias'
						name='alias'
						isRequired={true}
					/>

					{/* Form submit button */}
					<Button
						color='primary'
						type='submit'>
						Generate New Key
					</Button>
				</form>

				{/* Form error message */}
				<p className='text-red-500'>{errorMessage}</p>
			</div>
		</>
	);
}
