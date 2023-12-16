import { z } from 'zod';

/**
 * Zod schema for validating submit requests on the `/api/get-form-item` api endpoint.
 */
export const getFormItemApiSchema = z.object({
	apiKey: z.string().uuid(),
});
