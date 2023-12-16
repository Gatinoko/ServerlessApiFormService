import { z } from 'zod';

/**
 * Zod schema for validating submit requests on the `/api/submit-form` api endpoint.
 */
export const putFormItemApiSchema = z.object({
	formItemId: z.string().uuid(),
	title: z.string(),
	description: z.string(),
});
