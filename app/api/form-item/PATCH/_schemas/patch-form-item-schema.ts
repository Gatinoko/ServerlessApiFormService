import { z } from 'zod';

/**
 * Zod schema for validating submit requests on the `/api/submit-form` api endpoint.
 */
export const patchFormItemApiSchema = z.union([
	z.object({
		formItemId: z.string().uuid(),
		title: z.string(),
	}),
	z.object({
		formItemId: z.string().uuid(),
		description: z.string(),
	}),
]);
