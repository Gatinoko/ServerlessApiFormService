import prismaClient from '@/prisma/prisma';
import { submitFormApiSchema } from './_schemas/submit-form-schema';
import { FormItemRequest } from '@/types/api-types';

export async function POST(request: Request) {
	// Get request body as json
	const requestBody: FormItemRequest = await request.json();

	// Zod schema validation
	try {
		submitFormApiSchema.parse(requestBody);
	} catch (error: any) {
		return new Response(
			'SCHEMA_ERROR: The data does not comply with the required endpoint schema.',
			{ status: 400 }
		);
	}

	// Create FormItem on the application related to the specified api key
	try {
		await prismaClient().application.update({
			where: {
				apiKeyId: requestBody.apiKey,
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
		console.log(error);
		return new Response('DB_ERROR: Database error.', { status: 400 });
	}

	return new Response(null, { status: 200 });
}
