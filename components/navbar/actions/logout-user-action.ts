'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

/**
 * Server action for the navigation's logout button.
 *
 * @param {FormData} data - Client form data.
 */
export async function logoutUser() {
	// Deletes the stored auth token
	cookies().delete('token');

	// Revalidates path
	revalidatePath('/login');
}
