'use client';

import { loginUserAction } from './_actions/login-user-action';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function LoginForm() {
	// Router
	const router = useRouter();

	// HTML form element reference
	const formElementRef = useRef<HTMLFormElement>(null);

	// Error message
	const [errorMessage, setErrorMessage] = useState<string>('‎ ');

	// Login form handler function
	async function loginFormHandler(formData: FormData) {
		const serverResponse = await loginUserAction(formData);
		if (serverResponse) setErrorMessage(serverResponse.message);
		else {
			formElementRef.current?.reset();
			setErrorMessage('‎ ');

			// Trigger DOM full reload
			window.location.reload();
		}
	}

	return (
		<form
			ref={formElementRef}
			className='flex flex-col gap-2'
			action={loginFormHandler}>
			{/* Email input field */}
			<Input
				key='email'
				type='text'
				label='Email'
				name='email'
				isRequired={true}
			/>

			{/* Password input field */}
			<Input
				key='password'
				type='password'
				label='Password'
				name='password'
				isRequired={true}
			/>

			{/* Form error message */}
			<p className='text-red-500'>{errorMessage}</p>

			{/* Login button */}
			<Button
				type='submit'
				color='primary'>
				Login
			</Button>
		</form>
	);
}
