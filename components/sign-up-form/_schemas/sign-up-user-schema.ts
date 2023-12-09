import { z } from 'zod';

/**
 * Zod schema for validating the `createUser` server action.
 */
export const signUpUserActionSchema = z.object({
	email: z.string(),
	username: z.string(),
	password: z.string(),
});
