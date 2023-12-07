'use server';

import prismaClient from '@/prisma/prisma';
import { Error } from '@/types/action-types';

/**
 * Server action for getting a user's applications.
 *
 * @param {string} userId - User id for which the action will take effect.
 */
export async function getUserApplicationsAction(userId: string) {
	try {
		return (await prismaClient().user.findUnique({
			where: {
				id: userId,
			},
			select: {
				applications: true,
			},
		}))!;
	} catch (error) {
		return {
			message: 'Database error.',
			cause: 'DB_ERROR',
		} as Error;
	}
}
