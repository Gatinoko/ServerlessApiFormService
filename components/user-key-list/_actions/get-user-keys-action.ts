'use server';

import prismaClient from '@/prisma/prisma';
import { Error } from '@/types/action-types';

/**
 * Server action for getting a user's generated api keys.
 *
 * @param {string} userId - User id for which the action will take effect.
 */
export async function getUserKeysAction(id: string) {
	try {
		return (await prismaClient().user.findUnique({
			where: {
				id: id,
			},
			select: {
				apiKeys: true,
			},
		}))!;
	} catch (error) {
		return {
			message: 'Specified user does not exist.',
			cause: 'USER_NOT_FOUND',
		} as Error;
	}
}
