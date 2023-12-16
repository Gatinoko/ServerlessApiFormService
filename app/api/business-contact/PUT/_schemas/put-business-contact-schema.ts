import { z } from 'zod';

/**
 * Zod schema for validating submit requests on the `/api/submit-form` api endpoint.
 */
export const putBusinessContactApiSchema = z.object({
	businessContactId: z.string().uuid(),
	name: z.string(),
	contactInfo: z.string(),
});
