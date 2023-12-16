import { z } from 'zod';

/**
 * Zod schema for validating submit requests on the `/api/submit-form` api endpoint.
 */
export const deleteFormItemApiSchema = z.object({
	formItemId: z.string().uuid(),
});
