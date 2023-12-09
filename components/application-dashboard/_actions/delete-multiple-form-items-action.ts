'use server';

import { Error } from '@/types/action-types';
import prismaClient from '@/prisma/prisma';

/**
 * Server action for deleting multiple form items from an application.
 *
 * @param {string[]} apiKeys - Array of application keys to-be affected by the action.
 */
export async function deleteMultipleFormItemsAction(apiKeys: string[]) {
	try {
		await prismaClient().formItem.deleteMany({
			where: {
				id: {
					in: apiKeys,
				},
			},
		});
	} catch (error: any) {
		return {
			message: 'Database error.',
			cause: 'DB_ERROR',
		} as Error;
	}
}
