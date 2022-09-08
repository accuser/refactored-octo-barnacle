import { importJWK, SignJWT } from 'jose';
import { JWT_ISSUER } from '$lib/config/env';
import getPrivateJwk from '$lib/services/get-private-jwk';

type GenerateAuthToken = {
	(email: string): Promise<string>;
};

/**
 * Generate auth token for an authenticating user.
 *
 * @param email - authenticating user's email address
 * @returns promise that resolves to an auth token.
 */
const generateAuthToken: GenerateAuthToken = async (email) => {
	const { alg, kid, ...jwk } = await getPrivateJwk();

	const key = await importJWK(jwk, alg);
	const aud = JWT_ISSUER.toString();
	const exp = '10m';
	const iss = JWT_ISSUER.toString();
	const sub = email;
	const typ = 'JWT';

	return new SignJWT({})
		.setAudience(aud)
		.setExpirationTime(exp)
		.setIssuer(iss)
		.setProtectedHeader({ alg, kid, typ })
		.setSubject(sub)
		.sign(key);
};

export default generateAuthToken;
