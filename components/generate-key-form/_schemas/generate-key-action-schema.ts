import { z } from 'zod';

/**
 * Zod schema for validating the `generateKeyAction` server action.
 */
export const generateKeyActionSchema = z.object({
	alias: z.string(),
});
