import { z } from 'zod';

/**
 * Zod schema for validating submit requests on the `/api/submit-form` api endpoint.
 */
export const patchBusinessContactApiSchema = z.union([
	z.object({
		businessContactId: z.string().uuid(),
		name: z.string(),
	}),
	z.object({
		businessContactId: z.string().uuid(),
		contactInfo: z.string(),
	}),
]);
