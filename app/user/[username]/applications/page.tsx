import GenerateKeyForm from '@/components/generate-key-form/generate-key-form';
import UserKeyList from '@/components/user-key-list/user-key-list';

export default function Page({ params }: { params: { username: string } }) {
	return (
		<main className='flex h-fit gap-4 flex-col justify-between p-24'>
			{/* Page title */}
			<h1 className='text-6xl flex w-full'>Applications</h1>

			{/* Horizontal separator */}
			<hr className='border-solid' />

			{/* Generate key form */}

			{/* User-generated keys list */}
			<div className='flex gap-4'>
				<div className='flex flex-col w-48 h-48 bg-primary-100 p-6 rounded-3xl justify-end items-start'>
					{/* Form title */}
					<h2 className='flex h-fit text-clip text-xl font-semibold'>
						{' '}
						Application Name Goes Here
					</h2>
				</div>
			</div>
		</main>
	);
}
