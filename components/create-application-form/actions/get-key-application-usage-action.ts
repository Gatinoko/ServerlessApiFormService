'use server';

import prismaClient from '@/prisma/prisma';
import { Error } from '@/types/action-types';

/**
 * Action for checking whether a user's apiKey is already in use by an application.
 *
 * @param {string} apiKeyId - Id of the apiKey for which the action will take effect.
 * @param {string} userId - Id of the apiKey to-be checked for usage.
 *
 * @returns {boolean} `true` if the key's value is already in use by an application, otherwise `false`.
 */
export async function getApiKeyApplicationUsageAction(
	apiKeyId: string,
	userId: string
) {
	let apiKey;
	try {
		apiKey = await prismaClient().application.findFirst({
			where: {
				userId: userId,
				apiKeyId: apiKeyId,
			},
		});
	} catch (error: any) {
		return {
			message: 'Database error.',
			cause: 'DB_ERROR',
		} as Error;
	}
	if (apiKey) return true;
	else return false;
}
