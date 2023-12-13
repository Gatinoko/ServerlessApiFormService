import prismaClient from '@/prisma/prisma';
import { BusinessItemPostRequest } from '@/types/api-types';
import { postBusinessContactApiSchema } from './_schemas/post-business-contact-schema';

export async function POST(request: Request) {
	// Get request body as json
	const requestBody: BusinessItemPostRequest = await request.json();

	// Zod schema validation
	try {
		postBusinessContactApiSchema.parse(requestBody);
	} catch (error: any) {
		return new Response(
			'SCHEMA_ERROR: The data does not comply with the required endpoint schema.',
			{ status: 400 }
		);
	}

	// Create business contact object on the application related to the specified api key
	try {
		await prismaClient().application.update({
			where: {
				apiKeyId: requestBody.apiKey,
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
		console.log(error);
		return new Response('DB_ERROR: Database error.', { status: 400 });
	}

	return new Response(null, { status: 200 });
}
