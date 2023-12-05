'use server';

import { redirect } from 'next/navigation';
import { generateKeyActionSchema } from '../schemas/generate-key-action-schema';
import { DecodedJwtPayload, Error } from '@/types/action-types';
import prismaClient from '@/prisma/prisma';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';

/**
 * Server action for the generate key form.
 *
 * @param {FormData} data - Client form data.
 * @param {string} username - User account's username for which the action will take effect.
 */
export async function generateKeyAction(data: FormData) {
	// Assigns form values to object
	const formValues = {
		alias: data.get('alias') as string,
	};

	// Zod form schema validation
	generateKeyActionSchema.parse(formValues);

	// Decoded jwt token payload
	const decodedJwtPayload = jwt.decode(
		cookies().get('token')!.value
	) as DecodedJwtPayload;

	console.log(decodedJwtPayload);

	// Create api key database operation
	try {
		await prismaClient().user.update({
			where: {
				id: decodedJwtPayload.id,
			},
			data: {
				apiKeys: {
					create: {
						alias: formValues.alias,
					},
				},
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
