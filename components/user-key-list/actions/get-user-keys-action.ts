'use server';

import prismaClient from '@/prisma/prisma';
import { Error } from '@/types/action-types';

export async function getUserKeysAction(username: string) {
	try {
		return await prismaClient().user.findUnique({
			where: {
				username: username,
			},
			include: {
				apiKeys: true,
			},
		})!;
	} catch (error) {
		return {
			message: 'Specified user does not exist.',
			cause: 'USER_NOT_FOUND',
		} as Error;
	}
}
