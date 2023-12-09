'use server';

import jwt from 'jsonwebtoken';
import { MAX_AGE, TOKEN_SECRET } from '@/auth/auth-config';
import { cookies } from 'next/headers';
import { loginUserActionSchema } from '../_schemas/login-user-schema';
import prismaClient from '@/prisma/prisma';

/**
 * Server action for the user login form.
 *
 * @param {FormData} data - Client form data.
 */
export async function loginUserAction(data: FormData) {
	// Checks if token cookie is already present in the browser
	if (cookies().get('token'))
		return {
			message: 'User already authenticated.',
			cause: 'ALREADY_AUTHENTICATED',
		} as Error;

	// Assigns form values to object
	const formValues = {
		email: data.get('email') as string,
		password: data.get('password') as string,
	};

	// Zod form schema validation
	loginUserActionSchema.parse(formValues);

	// Find user database operation
	let user;
	try {
		user = await prismaClient().user.findUnique({
			where: {
				email: formValues.email,
			},
		});
	} catch (error: any) {
		return {
			message: 'Database error.',
			cause: 'DB_ERROR',
		} as Error;
	}

	// If no user is found return error
	if (user === null)
		return {
			message: 'Error. This email is not registered.',
			cause: 'USER_NOT_FOUND',
		} as Error;

	// If user exists but passwords don't match return error
	if (formValues.password !== user.password)
		return {
			message: 'Error. Passwords do not match.',
			cause: 'INCORRECT_CREDENTIALS',
		} as Error;

	// Authenticates user
	try {
		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
				username: user.username,
			},
			TOKEN_SECRET
		);
		cookies().set('token', token, {
			maxAge: MAX_AGE,
		});
	} catch (error: any) {
		return {
			message: 'Authentication error.',
			cause: 'AUTH_ERROR',
		} as Error;
	}
}
