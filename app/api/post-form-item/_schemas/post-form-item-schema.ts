import { z } from 'zod';

/**
 * Zod schema for validating submit requests on the `/api/submit-form` api endpoint.
 */
export const postFormItemApiSchema = z.object({
	apiKey: z.string().uuid(),
	title: z.string(),
	description: z.string(),
});
