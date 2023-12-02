import GenerateKeyForm from '@/components/generate-key-form/generate-key-form';
import UserKeyList from '@/components/user-key-list/user-key-list';
import { Button, Input } from '@nextui-org/react';

export default function Page({ params }: { params: { username: string } }) {
	return (
		<main className='flex h-fit gap-4 flex-col justify-between p-24'>
			{/* Page title */}
			<h1 className='text-6xl flex w-full'>API Keys</h1>

			{/* Horizontal separator */}
			<hr className='border-solid' />

			{/* Generate key form */}
			<GenerateKeyForm />

			{/* User-generated keys list */}
			<div className='flex flex-col gap-4 bg-primary-100 p-6 rounded-3xl'>
				{/* Form title */}
				<h2 className='text-3xl flex w-full'>User Keys</h2>

				{/* Horizontal spacer */}
				<hr className='border-solid border-primary opacity-50' />

				{/* Key list */}
				<UserKeyList username={''} />
			</div>
		</main>
	);
}
