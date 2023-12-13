'use client';

import {
	Dispatch,
	PropsWithChildren,
	ReactNode,
	SetStateAction,
	useState,
} from 'react';
import ApplicationActionBar from './application-action-bar';
import { CheckboxGroup, Tab, Tabs } from '@nextui-org/react';
import { deleteMultipleFormItemsAction } from './_actions/delete-multiple-form-items-action';
import { useRouter } from 'next/navigation';
import { Error } from '@/types/action-types';
import { deleteMultipleFormItemsBusinessContactsAction } from './_actions/delete-multiple-business-contacts-action';

export type ApplicationDashboardProps = {
	formItemList: ReactNode;
	businessContactList: ReactNode;
} & PropsWithChildren;

export default function ApplicationDashboard({
	formItemList,
	businessContactList,
	children,
}: ApplicationDashboardProps) {
	// Router
	const router = useRouter();

	// Form item checkbox group value state
	const [formItemsCheckboxGroupValue, setFormItemsCheckboxGroupValue] =
		useState<string[]>([]);

	// Business contact checkbox group value state
	const [
		businessContactsCheckboxGroupValue,
		setBusinessContactsCheckboxGroupValue,
	] = useState<string[]>([]);

	// Delete button handler function
	async function deleteButtonHandler(
		stateValue: string[],
		setStateFunction: Dispatch<SetStateAction<string[]>>,
		serverAction: (stateValue: string[]) => Promise<Error | undefined>
	) {
		if (stateValue.length >= 1) {
			const serverResponse = await serverAction(stateValue);
			if (serverResponse) console.log(serverResponse.message);
			else {
				setStateFunction([]);
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
			<Tabs
				aria-label='Options'
				defaultSelectedKey='formItems'
				color='primary'
				className='p-4 bg-primary-100 rounded-3xl'>
				{/* Form items tab */}
				<Tab
					key='formItems'
					title='Form Items'
					className='flex flex-col gap-4 py-0'>
					{/* App actions bar */}
					<ApplicationActionBar
						selectedItems={formItemsCheckboxGroupValue}
						deleteButtonHandler={() =>
							deleteButtonHandler(
								formItemsCheckboxGroupValue,
								setFormItemsCheckboxGroupValue,
								deleteMultipleFormItemsAction
							)
						}
						refreshButtonHandler={refreshButtonHandler}
					/>

					{/* Checkbox group */}
					<CheckboxGroup
						value={formItemsCheckboxGroupValue}
						onValueChange={(value) => setFormItemsCheckboxGroupValue(value)}>
						{formItemList}
					</CheckboxGroup>
				</Tab>

				{/* Business contacts tab */}
				<Tab
					key='businessContacts'
					title='Business Contacts'
					className='flex flex-col gap-4 py-0'>
					{/* App actions bar */}
					<ApplicationActionBar
						selectedItems={businessContactsCheckboxGroupValue}
						deleteButtonHandler={() =>
							deleteButtonHandler(
								businessContactsCheckboxGroupValue,
								setBusinessContactsCheckboxGroupValue,
								deleteMultipleFormItemsBusinessContactsAction
							)
						}
						refreshButtonHandler={refreshButtonHandler}
					/>

					{/* Checkbox group */}
					<CheckboxGroup
						value={businessContactsCheckboxGroupValue}
						onValueChange={(value) =>
							setBusinessContactsCheckboxGroupValue(value)
						}>
						{businessContactList}
					</CheckboxGroup>
				</Tab>
			</Tabs>
		</>
	);
}
