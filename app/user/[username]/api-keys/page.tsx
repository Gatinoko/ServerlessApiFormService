export default function Page({ params }: { params: { username: string } }) {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<h1 className='bg-slate-500 flex w-full'>{params.username} page</h1>
		</main>
	);
}
