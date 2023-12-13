/**
 * Type for FormItem requests on the `/api/submit-form` endpoint.
 *
 * @param {string} apiKey - Api key required for authenticating the client-facing request.
 * @param {string} title - Form item title.
 * @param {string} description - Form item description.
 */
export type FormItemRequest = {
	apiKey: string;
	title: string;
	description: string;
};

/**
 * Type for BusinessItemRequest requests on the `/api/post-business-contact` endpoint.
 *
 * @param {string} apiKey - Api key required for authenticating the client-facing request.
 * @param {string} name - Contact name.
 * @param {string} contactInfo - Business item contact information (email, handle, etc...).
 */
export type BusinessItemPostRequest = {
	apiKey: string;
	name: string;
	contactInfo: string;
};
