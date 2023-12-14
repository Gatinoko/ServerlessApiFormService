export default function Home() {
	return (
		<main className='w-full h-fit flex flex-col'>
			{/* Page banner */}
			<div className='bg-primary-100 w-full p-12 flex flex-col gap-6'>
				{/* Banner title */}
				<h1 className='text-8xl font-bold'>Serverless Form API Service</h1>
				<hr className='border-solid border-primary opacity-50' />
				<h2 className='text-2xl'>
					Easy and fast solution for <b>storing</b> and <b>consuming</b>{' '}
					organizational information.
				</h2>
			</div>

			{/* Horizontal spacer */}
			<hr className='border-solid border-primary opacity-50' />

			{/* Information section */}
			<div className='flex h-fit flex-col p-6 gap-4'>
				{/* What is SFAS */}
				<section className='flex flex-col gap-2 bg-primary-100 p-6 rounded-3xl'>
					<h3 className='text-3xl'>What is SFAS?</h3>
					<hr className='border-solid border-primary opacity-50' />
					<p>
						This is a simple API service project created in order to learn more
						about api design and structure.
					</p>
				</section>
			</div>
		</main>
	);
}
