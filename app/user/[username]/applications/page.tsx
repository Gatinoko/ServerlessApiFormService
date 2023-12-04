import ApplicationItem from '@/components/application-item-list/application-item';
import ApplicationItemList from '@/components/application-item-list/application-item-list';

export default function Page({ params }: { params: { username: string } }) {
	return (
		<main className='flex h-fit gap-4 flex-col justify-between p-24'>
			{/* Page title */}
			<h1 className='text-6xl flex w-full'>Applications</h1>

			{/* Horizontal separator */}
			<hr className='border-solid' />

			{/* User-created application list */}
			<ApplicationItemList className='w-full'>
				<ApplicationItem
					href={'app1'}
					title={'app1 sdf asdfsdfsdf'}
				/>
			</ApplicationItemList>
		</main>
	);
}
