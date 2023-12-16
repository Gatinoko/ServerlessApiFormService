import { z } from 'zod';

/**
 * Zod schema for validating submit requests on the `/api/submit-form` api endpoint.
 */
export const deleteBusinessContactApiSchema = z.object({
	businessContactId: z.string().uuid(),
});
