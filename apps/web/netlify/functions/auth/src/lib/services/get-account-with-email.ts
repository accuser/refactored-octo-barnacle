import planetscale from '$lib/config/planetscale';

interface GetAccountWithEmail {
	(email: string): Promise<
		Partial<{ id: string; displayName: string; email: string }>
	>;
}

/**
 * Get minimal account props for the account with a matching email address.
 *
 * @param email - the email address to match
 * @returns promise that resolves to minimal account props.
 */
const getAccountWithEmail: GetAccountWithEmail = async (email: string) =>
	planetscale
		.execute(
			'SELECT id, displayName, email FROM accounts WHERE LOWER(email) = LOWER(:email) LIMIT 1;',
			{ email }
		)
		.then(({ rows }) => rows[0] as Record<string, string>)
		.then(({ id, displayName, email }) => ({ id, displayName, email }));

export default getAccountWithEmail;
