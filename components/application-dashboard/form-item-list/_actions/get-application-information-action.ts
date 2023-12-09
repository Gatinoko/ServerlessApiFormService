'use server';

import prismaClient from '@/prisma/prisma';
import { Error } from '@/types/action-types';

/**
 * Server action for getting an application's information.
 *
 * @param {string} id - Application id for which the action will take effect.
 */
export async function getApplicationInformationAction(id: string) {
	try {
		return await prismaClient().application.findUnique({
			where: {
				id: id,
			},
		});
	} catch (error: any) {
		return {
			message: 'Database error.',
			cause: 'DB_ERROR',
		} as Error;
	}
}
