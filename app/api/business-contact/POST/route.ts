import prismaClient from '@/prisma/prisma';
import { postBusinessContactApiSchema } from './_schemas/post-business-contact-schema';

/**
 * Type for FormItem requests on the `/api/submit-form` endpoint.
 *
 * @param {string} title - Form item title.
 * @param {string} description - Form item description.
 */
export type POSTBusinessContactRequest = {
	name: string;
	contactInfo: string;
};

export async function POST(request: Request) {
	// Get request body as json
	const requestBody: POSTBusinessContactRequest = await request.json();

	// Gets api key from auth headers
	const apiKey = await request.headers.get('apiKey');
	if (!apiKey)
		return new Response('MISSING_KEY: No auth key present.', { status: 400 });

	// Zod schema validation
	try {
		postBusinessContactApiSchema.parse(requestBody);
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

	// Create business contact on the application related to the specified api key
	try {
		await prismaClient().application.update({
			where: {
				apiKeyId: apiKey,
			},
			data: {
				businessContacts: {
					create: {
						name: requestBody.name,
						contactInfo: requestBody.contactInfo,
					},
				},
			},
		});
	} catch (error: any) {
		return new Response('DB_ERROR: Database error.', { status: 400 });
	}

	return new Response(null, { status: 200 });
}
