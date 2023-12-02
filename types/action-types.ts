/**
 * Custom error type for use in server actions.
 *
 * @param message - Error message.
 * @param cause - Cause of error.
 */
export type Error = {
	message: string;
	cause: string;
};

/**
 * Custom success response type for use in server actions.
 *
 * @param message - Success message to be displayed in client-side.
 */
export type SuccessResponse = {
	message: string;
};

/**
 * Custom type for back-end operations utilizing JWT tokens.
 *
 * @param {string} id - User object's unique identifier.
 * @param {string} email - User email.
 * @param {string} username - The account's chosen username.
 */
export type DecodedJwtPayload = {
	id: string;
	email: string;
	username: string;
};
