import { z } from 'zod';

/**
 * Zod schema for validating the `loginUserAction` server action.
 */
export const loginUserActionSchema = z.object({
	email: z.string(),
	password: z.string(),
});
