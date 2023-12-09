'use server';

import { getJwtTokenAction } from '@/auth/actions/get-jwt-token-action';
import { getUserApplicationsAction } from './actions/get-user-applications-action';
import ApplicationItem from './application-item';

export type ApplicationItemListProps = {
	className?: string;
};

export default async function ApplicationItemList({
	className,
}: ApplicationItemListProps) {
	// Decoded jwt token payload
	const decodedJwtPayload = await getJwtTokenAction();

	// Array with current user's created applications
	const userApplications = await getUserApplicationsAction(
		decodedJwtPayload.id
	);

	return (
		<ul className={`flex gap-4 flex-wrap ${className}`}>
			{'applications' in userApplications &&
				userApplications.applications.map((apiKey, index, _array) => (
					<ApplicationItem
						key={index}
						href={apiKey.id}
						title={apiKey.name}
					/>
				))}
		</ul>
	);
}
