'use server';

import FormItem from './business-contact-item';
import { getApplicationBusinessContactsAction } from './_actions/get-application-business-contacts-action';
import BusinessContactItem from './business-contact-item';

export type FormItemListProps = {
	applicationId: string;
};

export default async function BusinessContactList({
	applicationId,
}: FormItemListProps) {
	// Array of FormItem objects from the user's current application
	const userBusinessContacts = await getApplicationBusinessContactsAction(
		applicationId
	);

	return (
		<ul className='flex flex-col gap-2 w-full bg-primary-100 p-6 rounded-3xl'>
			{userBusinessContacts &&
				'businessContacts' in userBusinessContacts &&
				userBusinessContacts.businessContacts.map(
					(businessContact, index, _array) => (
						<BusinessContactItem
							key={index}
							id={businessContact.id}
							name={businessContact.name}
							contactInfo={businessContact.contactInfo}
						/>
					)
				)}
		</ul>
	);
}
