'use server';

import FormItem from './form-item';
import { getApplicationFormItemsAction } from './actions/get-user-form-items-action';
import { CheckboxGroup } from '@nextui-org/react';

export type FormItemListProps = {
	applicationId: string;
};

export default async function FormItemList({
	applicationId,
}: FormItemListProps) {
	// Array of FormItem objects from the user's current application
	const userFormItems = await getApplicationFormItemsAction(applicationId);

	return (
		<ul className='flex flex-col gap-2 w-full bg-primary-100 p-4 rounded-3xl'>
			{userFormItems &&
				'formItems' in userFormItems &&
				userFormItems.formItems.map((formItem, index, _array) => (
					<FormItem
						key={index}
						id={formItem.id}
						title={formItem.title}
						description={formItem.description}
					/>
				))}
		</ul>
	);
}
