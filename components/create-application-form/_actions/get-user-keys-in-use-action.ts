'use server';

import prismaClient from '@/prisma/prisma';
import { Error } from '@/types/action-types';

/**
 * Action for getting all the api keys currently in use from a specified user.
 *
 * @param {string} userId - Id of the user for which the action will take effect.
 *
 * @returns {string[]} String array containing all the api keys **currently in use** from the specified user.
 */
export async function getUserKeysInUseAction(userId: string) {
	try {
		let keysInUse: string[] = [];
		const serverResponse = await prismaClient().user.findUnique({
			where: {
				id: userId,
			},
			select: {
				applications: {
					select: {
						apiKey: true,
					},
				},
			},
		})!;
		serverResponse?.applications.map((userApplication, _index, _array) => {
			keysInUse.push(userApplication.apiKey?.id!);
		});
		return keysInUse;
	} catch (error: any) {
		return {
			message: 'Database error.',
			cause: 'DB_ERROR',
		} as Error;
	}
}
