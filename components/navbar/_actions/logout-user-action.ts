'use server';

import { cookies } from 'next/headers';

/**
 * Server action for the navigation's logout button.
 */
export async function logoutUser() {
	// Deletes the stored auth token
	cookies().delete('token');
}
