import prismaClient from '@/prisma/prisma';
import { putBusinessContactApiSchema } from './_schemas/put-business-contact-schema';

/**
 * Type for FormItem requests on the `/api/submit-form` endpoint.
 *
 * @param {string} formItemId - Form item title.
 * @param {string} name - Form item title.
 * @param {string} contactInfo - Form item description.
 */
export type PUTBusinessContactRequest = {
	businessContactId: string;
	name: string;
	contactInfo: string;
};

export async function PUT(request: Request) {
	// Get request body as json
	const requestBody: PUTBusinessContactRequest = await request.json();

	// Gets api key from auth headers
	const apiKey = await request.headers.get('apiKey');
	if (!apiKey)
		return new Response('MISSING_KEY: No auth key present.', { status: 400 });

	// Zod schema validation
	try {
		putBusinessContactApiSchema.parse(requestBody);
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

	// Updates item with the specified key
	try {
		await prismaClient().businessContact.update({
			where: {
				id: requestBody.businessContactId,
			},
			data: {
				name: requestBody.name,
				contactInfo: requestBody.contactInfo,
			},
		});
	} catch (error: any) {
		return new Response('DB_ERROR: Database error.', { status: 400 });
	}

	return new Response(null, { status: 200 });
}
