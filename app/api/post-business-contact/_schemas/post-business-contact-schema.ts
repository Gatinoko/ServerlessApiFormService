import { z } from 'zod';

/**
 * Zod schema for validating submit requests on the `/api/submit-form` api endpoint.
 */
export const postBusinessContactApiSchema = z.object({
	apiKey: z.string().uuid(),
	name: z.string(),
	contactInfo: z.string(),
});
