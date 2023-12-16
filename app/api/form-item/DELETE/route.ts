import prismaClient from '@/prisma/prisma';
import { deleteFormItemApiSchema } from './_schemas/delete-form-item-schema';

/**
 * Type for FormItem requests on the `/api/submit-form` endpoint.
 *
 * @param {string} formItemId - Form item title.
 * @param {string} title - Form item title.
 * @param {string} description - Form item description.
 */
export type DELETEFormItemRequest = {
	formItemId: string;
};

export async function DELETE(request: Request) {
	// Get request body as json
	const requestBody: DELETEFormItemRequest = await request.json();

	// Gets api key from auth headers
	const apiKey = await request.headers.get('apiKey');
	if (!apiKey)
		return new Response('MISSING_KEY: No auth key present.', { status: 400 });

	// Zod schema validation
	try {
		deleteFormItemApiSchema.parse(requestBody);
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

	// Deletes the specified item
	try {
		await prismaClient().formItem.delete({
			where: {
				id: requestBody.formItemId,
			},
		});
	} catch (error: any) {
		return new Response('DB_ERROR: Database error.', { status: 400 });
	}

	return new Response(null, { status: 200 });
}
