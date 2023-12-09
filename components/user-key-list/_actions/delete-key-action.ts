'use server';

import prismaClient from '@/prisma/prisma';
import { Error } from '@/types/action-types';

/**
 * Server action for deleting .
 *
 * @param {string} userId - User id for which the action will take effect.
 * @param {string} keyId - Key id for which the action will take effect.
 */
export async function deleteKeyAction(userId: string, keyId: string) {
	try {
		return await prismaClient().user.update({
			where: {
				id: userId,
			},
			data: {
				apiKeys: {
					delete: [
						{
							id: keyId,
						},
					],
				},
			},
		})!;
	} catch (error) {
		return {
			message: 'Database error.',
			cause: 'DB_ERROR',
		} as Error;
	}
}
