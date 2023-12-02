'use server';

import prismaClient from '@/prisma/prisma';
import { Error } from '@/types/action-types';
import { randomUUID } from 'crypto';

/**
 * Server action for regenerating an api key.
 *
 * @param {string} userId - User id for which the action will take effect.
 * @param {string} keyId - Key id for which the action will take effect.
 */
export async function regenerateKeyAction(userId: string, keyId: string) {
	const newKeyId = randomUUID();
	try {
		return await prismaClient().user.update({
			where: {
				id: userId,
			},
			data: {
				apiKeys: {
					updateMany: {
						where: {
							id: keyId,
						},
						data: {
							id: newKeyId,
						},
					},
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
