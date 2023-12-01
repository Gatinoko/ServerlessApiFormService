import { z } from 'zod';

/**
 * Zod schema for validating the `loginUser` server action.
 */
export const loginUserSchema = z.object({
	email: z.string(),
	password: z.string(),
});
