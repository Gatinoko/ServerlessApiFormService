import prismaClient from '@/prisma/prisma';
import { patchFormItemApiSchema } from './_schemas/patch-form-item-schema';

/**
 * Type for FormItem requests on the `/api/submit-form` endpoint.
 *
 * @param {string} formItemId - Form item title.
 * @param {string} title - Form item title.
 * @param {string} description - Form item description.
 */
export type PATCHFormItemRequest =
	| {
			formItemId: string;
			title: string;
	  }
	| {
			formItemId: string;
			description: string;
	  };

export async function PATCH(request: Request) {
	// Get request body as json
	const requestBody: PATCHFormItemRequest = await request.json();

	// Gets api key from auth headers
	const apiKey = await request.headers.get('apiKey');
	if (!apiKey)
		return new Response('MISSING_KEY: No auth key present.', { status: 400 });

	// Zod schema validation
	try {
		patchFormItemApiSchema.parse(requestBody);
	} catch (error: any) {
		return new Response(
			'SCHEMA_ERROR: The data does not comply with the required endpoint schema.',
			{ status: 400 }
		);
	}

	// Api key validation
	try {
		await prismaClient().apiKey.findUniqueOrThrow({
			where: {
				id: apiKey,
			},
		});
	} catch (error: any) {
		return new Response('AUTH_ERROR: Invalid key.', { status: 400 });
	}

	// Updates specified item's field
	try {
		if ('title' in requestBody) {
			await prismaClient().formItem.update({
				where: {
					id: requestBody.formItemId,
				},
				data: {
					title: requestBody.title,
				},
			});
		} else if ('description' in requestBody) {
			await prismaClient().formItem.update({
				where: {
					id: requestBody.formItemId,
				},
				data: {
					description: requestBody.description,
				},
			});
		}
	} catch (error: any) {
		return new Response('DB_ERROR: Database error.', { status: 400 });
	}

	return new Response(null, { status: 200 });
}
