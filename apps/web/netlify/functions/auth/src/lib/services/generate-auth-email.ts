import { JWT_ISSUER, ROOT_URL } from '$lib/config/env';
import { TemplatedMessage } from 'postmark';

interface GenerateAuthEmail {
	(email: string, auth_token: string): TemplatedMessage;
}

const TEMPLATE_ALIAS = 'authentication';

/**
 * Generate an authentication email template using a pre-defined template.
 *
 * @param email - user's email address
 * @param auth_token - user's authentication
 * @returns the email template.
 */
const generateAuthEmail: GenerateAuthEmail = (email, auth_token) => {
	const auth_url = new URL(auth_token, new URL('auth/', JWT_ISSUER)).toString();
	const { hostname } = new URL(ROOT_URL);

	const template = new TemplatedMessage(
		`id@${hostname}`,
		TEMPLATE_ALIAS,
		{ auth_url },
		email
	);

	template.MessageStream = 'authentication';

	return template;
};

export default generateAuthEmail;
