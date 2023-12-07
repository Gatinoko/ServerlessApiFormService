'use server';

import { redirect } from 'next/navigation';
import { DecodedJwtPayload, Error } from '@/types/action-types';
import prismaClient from '@/prisma/prisma';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { createApplicationActionSchema } from '../schemas/create-application-action-schema';

/**
 * Server action for creating a new appllication.
 *
 * @param {FormData} data - Client form data.
 * @param {string} username - User account's username for which the action will take effect.
 */
export async function createApplicationAction(data: FormData) {
	console.log(data);
	// Assigns form values to object
	const formValues = {
		name: data.get('name') as string,
		apiKeyId: data.get('apiKey') as string,
	};

	// Zod form schema validation
	createApplicationActionSchema.parse(formValues);

	// Decoded jwt token payload
	const decodedJwtPayload = jwt.decode(
		cookies().get('token')!.value
	) as DecodedJwtPayload;

	// Checks which user-generated keys are available for use
	let duplicateKey;
	try {
		const apiKey = await prismaClient().application.findFirst({
			where: {
				userId: decodedJwtPayload.id,
				apiKeyId: formValues.apiKeyId,
			},
		});
		apiKey ? (duplicateKey = true) : false;
	} catch (error: any) {
		return {
			message: 'Error. Key is already in use somewhere else.',
			cause: 'APP_KEY_IN_USE',
		} as Error;
	}

	// Create api key database operation
	try {
		await prismaClient().user.update({
			where: {
				id: decodedJwtPayload.id,
			},
			data: {
				applications: {
					create: {
						name: formValues.name,
						apiKeyId: formValues.apiKeyId,
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
