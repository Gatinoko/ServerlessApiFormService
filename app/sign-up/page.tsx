'use client';

import SignUpForm from '@/components/sign-up-form/sign-up-form';

export default function Home() {
	return (
		<main className='mt-4 container mx-auto flex flex-col gap-4'>
			<div className='flex flex-col gap-4 bg-primary-100 rounded-3xl p-6'>
				{/* Title */}
				<h1 className='text-3xl'>Sign Up</h1>

				{/* Horizontal spacer */}
				<hr className='border-solid border-primary opacity-50' />

				<SignUpForm />
			</div>
		</main>
	);
}
