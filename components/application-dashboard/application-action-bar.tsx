'use client';

import { Button } from '@nextui-org/react';

export type ApplicationActionBarProps = {
	selectedItems: string[];
	deleteButtonHandler: () => void;
	refreshButtonHandler: () => void;
};

export default function ApplicationActionBar({
	selectedItems,
	deleteButtonHandler,
	refreshButtonHandler,
}: ApplicationActionBarProps) {
	return (
		<>
			<div className='flex gap-2'>
				{/* Item CRUD operations section */}
				<div className='w-full bg-primary-100 p-6 flex justify-between items-center rounded-3xl'>
					{/* Number of items selected */}
					<p
						className={`h-fit ${
							selectedItems.length <= 0 && 'opacity-disabled'
						}`}>
						{selectedItems.length} items selected
					</p>

					{/* Delete button */}
					<Button
						color='danger'
						isDisabled={selectedItems.length > 0 ? false : true}
						onClick={deleteButtonHandler}>
						Delete
					</Button>
				</div>

				{/* Refresh button section */}
				<div className='bg-primary-100 p-6 justify-between items-center rounded-3xl'>
					{/* Refresh button */}
					<Button
						color='primary'
						onClick={refreshButtonHandler}>
						Refresh
					</Button>
				</div>
			</div>
		</>
	);
}
