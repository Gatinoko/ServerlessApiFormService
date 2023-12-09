'use server';

import { getJwtTokenAction } from '@/auth/actions/get-jwt-token-action';
import ApplicationDashboard from '@/components/application-dashboard/application-dashboard';
import { getApplicationInformationAction } from '@/components/application-dashboard/form-item-list/_actions/get-application-information-action';
import FormItemList from '@/components/application-dashboard/form-item-list/form-item-list';

export default async function Page({
	params,
}: {
	params: { applicationId: string };
}) {
	// Current application item's information
	const apllicationInformation = await getApplicationInformationAction(
		params.applicationId
	);

	return (
		<main className='flex h-fit gap-4 flex-col justify-between p-24'>
			{/* Page title */}
			<h1 className='text-6xl flex w-full'>
				{apllicationInformation &&
					'id' in apllicationInformation &&
					`${apllicationInformation.name} Dashboard`}
			</h1>

			{/* Horizontal separator */}
			<hr className='border-solid' />

			{/* App actions bar */}
			<ApplicationDashboard>
				<FormItemList applicationId={params.applicationId} />
			</ApplicationDashboard>
		</main>
	);
}
