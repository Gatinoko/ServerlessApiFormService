import { z } from 'zod';

/**
 * Zod schema for validating submit requests on the `/api/submit-form` api endpoint.
 */
export const postBusinessContactApiSchema = z.object({
	name: z.string(),
	contactInfo: z.string(),
});
