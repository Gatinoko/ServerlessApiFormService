'use client';

import { PropsWithChildren, useState } from 'react';
import ApplicationActionBar from './application-action-bar/application-action-bar';
import { CheckboxGroup } from '@nextui-org/react';
import { deleteMultipleFormItemsAction } from './_actions/delete-multiple-form-items-action';
import { useRouter } from 'next/navigation';

export type ApplicationDashboardProps = {} & PropsWithChildren;

export default function ApplicationDashboard({
	children,
}: ApplicationDashboardProps) {
	// Router
	const router = useRouter();

	// Checkbox group value state
	const [checkboxGroupValue, setCheckboxGroupValue] = useState<string[]>([]);

	// Delete button handler function
	async function deleteButtonHandler() {
		if (checkboxGroupValue.length >= 1) {
			const serverResponse = await deleteMultipleFormItemsAction(
				checkboxGroupValue
			);
			if (serverResponse) console.log(serverResponse.message);
			else {
				setCheckboxGroupValue([]);
				router.refresh();
			}
		}
	}

	// Refresh button handler function
	function refreshButtonHandler() {
		router.refresh();
	}

	return (
		<>
			{/* App actions bar */}
			<ApplicationActionBar
				selectedItems={checkboxGroupValue}
				deleteButtonHandler={deleteButtonHandler}
				refreshButtonHandler={refreshButtonHandler}
			/>

			{/* Checkbox group */}
			<CheckboxGroup
				value={checkboxGroupValue}
				onValueChange={(value) => setCheckboxGroupValue(value)}>
				{children}
			</CheckboxGroup>
		</>
	);
}
