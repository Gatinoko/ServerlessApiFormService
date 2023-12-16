import prismaClient from '@/prisma/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	// Gets api key from auth headers
	const apiKey = await request.headers.get('apiKey');
	if (!apiKey)
		return new Response('MISSING_KEY: No auth key present.', { status: 400 });

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

	// Returns all of the key owner's form items
	try {
		const serverResponse = await prismaClient().application.findUniqueOrThrow({
			where: {
				apiKeyId: apiKey,
			},
			select: {
				businessContacts: true,
			},
		});
		return NextResponse.json(serverResponse.businessContacts, { status: 200 });
	} catch (error: any) {
		return new Response('DB_ERROR: Database error.', { status: 400 });
	}
}
