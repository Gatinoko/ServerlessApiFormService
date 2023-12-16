import prismaClient from '@/prisma/prisma';
import { postFormItemApiSchema } from './_schemas/post-form-item-schema';

/**
 * Type for FormItem requests on the `/api/submit-form` endpoint.
 *
 * @param {string} title - Form item title.
 * @param {string} description - Form item description.
 */
export type POSTFormItemRequest = {
	title: string;
	description: string;
};

export async function POST(request: Request) {
	// Get request body as json
	const requestBody: POSTFormItemRequest = await request.json();

	// Gets api key from auth headers
	const apiKey = await request.headers.get('apiKey');
	if (!apiKey)
		return new Response('MISSING_KEY: No auth key present.', { status: 400 });

	// Zod schema validation
	try {
		postFormItemApiSchema.parse(requestBody);
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

	// Create form item on the application related to the specified api key
	try {
		await prismaClient().application.update({
			where: {
				apiKeyId: apiKey,
			},
			data: {
				formItems: {
					create: {
						title: requestBody.title,
						description: requestBody.description,
					},
				},
			},
		});
	} catch (error: any) {
		return new Response('DB_ERROR: Database error.', { status: 400 });
	}

	return new Response(null, { status: 200 });
}
