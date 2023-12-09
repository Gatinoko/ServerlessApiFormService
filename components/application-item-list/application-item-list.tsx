'use server';

import { getJwtTokenAction } from '@/auth/actions/get-jwt-token-action';
import { getUserApplicationsAction } from './actions/get-user-applications-action';
import ApplicationItem from './application-item';

export type ApplicationItemListProps = {};

export default async function ApplicationItemList(
	props: ApplicationItemListProps
) {
	// Decoded jwt token payload
	const decodedJwtPayload = await getJwtTokenAction();

	// Array with current user's created applications
	const userApplications = await getUserApplicationsAction(
		decodedJwtPayload.id
	);

	return (
		<div className='flex flex-col gap-4 bg-primary-100 p-6 rounded-3xl'>
			{/* Form title */}
			<h2 className='text-3xl flex w-full'>User Applications</h2>

			{/* Horizontal spacer */}
			<hr className='border-solid border-primary opacity-50' />

			<ul className={`flex gap-2 w-full`}>
				{'applications' in userApplications &&
					userApplications.applications.map((apiKey, index, _array) => (
						<ApplicationItem
							key={index}
							href={apiKey.id}
							title={apiKey.name}
						/>
					))}
			</ul>
		</div>
	);
}
