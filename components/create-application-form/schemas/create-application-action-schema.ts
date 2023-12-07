import { z } from 'zod';

/**
 * Zod schema for validating the `generateKeyAction` server action.
 */
export const createApplicationActionSchema = z.object({
	name: z.string(),
});
