'use server';

import { Error } from '@/types/action-types';
import prismaClient from '@/prisma/prisma';

/**
 * Server action for getting an application's form items.
 *
 * @param {string} id - Application id for which the action will take effect.
 */
export async function getApplicationFormItemsAction(id: string) {
	try {
		return await prismaClient().application.findUnique({
			where: {
				id: id,
			},
			select: {
				formItems: true,
			},
		});
	} catch (error: any) {
		console.log(error);
		return {
			message: 'Database error.',
			cause: 'DB_ERROR',
		} as Error;
	}
}
